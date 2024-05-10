import isFunction from 'lodash/isFunction';

let observer = null;
const attachObserver = (el, resizeHandler) => {
  if (!isFunction(resizeHandler)) {
    throw TypeError('directive value must be a function');
  }
  if (!observer) {
    // the observer instance is shared for performance reasons
    // more information: https://github.com/WICG/ResizeObserver/issues/59
    observer = new ResizeObserver(entries => {
      entries.forEach(event => {
        event.target.glResizeHandler(event);
      });
    });
  }
  el.glResizeHandler = resizeHandler;
  observer.observe(el);
};
const detachObserver = el => {
  if (el.glResizeHandler) {
    var _observer;
    delete el.glResizeHandler;
    (_observer = observer) === null || _observer === void 0 ? void 0 : _observer.unobserve(el);
  }
};
const GlResizeObserverDirective = {
  bind(el, _ref) {
    let {
      value: resizeHandler,
      arg: enabled = true
    } = _ref;
    if (enabled) {
      attachObserver(el, resizeHandler);
    }
  },
  update(el, _ref2) {
    let {
      value: resizeHandler,
      arg: enabled = true
    } = _ref2;
    if (enabled) {
      attachObserver(el, resizeHandler);
    } else {
      detachObserver(el);
    }
  },
  unbind: detachObserver
};

export { GlResizeObserverDirective };
