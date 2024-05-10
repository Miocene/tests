import Vue from 'vue';

const getBaseURL = () => {
  const {
    protocol,
    host
  } = window.location;
  return `${protocol}//${host}`;
};
const isExternalURL = (target, hostname) => {
  return target === '_blank' && hostname !== window.location.hostname;
};
const secureRel = rel => {
  const rels = rel ? rel.trim().split(' ') : [];
  if (!rels.includes('noopener')) {
    rels.push('noopener');
  }
  if (!rels.includes('noreferrer')) {
    rels.push('noreferrer');
  }
  return rels.join(' ');
};
const isSafeURL = url => {
  try {
    const parsedURL = new URL(url, getBaseURL());
    return ['http:', 'https:', 'mailto:', 'ftp:'].includes(parsedURL.protocol);
  } catch (e) {
    return false;
  }
};
const transform = function (el) {
  let {
    arg: {
      skipSanitization = false
    } = {}
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (skipSanitization) {
    return;
  }
  const {
    href,
    target,
    rel,
    hostname
  } = el;
  if (!isSafeURL(href)) {
    el.href = 'about:blank';
  }
  if (isExternalURL(target, hostname)) {
    el.rel = secureRel(rel);
  }
};
const SafeLinkDirective = {
  inserted: transform,
  update: function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    Vue.nextTick(() => {
      transform(...args);
    });
  }
};

export { SafeLinkDirective };
