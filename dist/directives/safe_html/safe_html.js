import DOMPurify from 'dompurify';
import { forbiddenDataAttrs, forbiddenTags } from './constants';

const {
  sanitize
} = DOMPurify;

// Mitigate against future dompurify mXSS bypasses by
// avoiding additional serialize/parse round trip.
// See https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/1782
// and https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/2127
// for more details.
const DEFAULT_CONFIG = {
  RETURN_DOM_FRAGMENT: true,
  ALLOW_UNKNOWN_PROTOCOLS: true,
  FORBID_ATTR: forbiddenDataAttrs,
  FORBID_TAGS: forbiddenTags
};
const transform = (el, binding) => {
  if (binding.oldValue !== binding.value) {
    var _binding$arg;
    const config = {
      ...DEFAULT_CONFIG,
      ...((_binding$arg = binding.arg) !== null && _binding$arg !== void 0 ? _binding$arg : {})
    };
    el.textContent = '';
    el.appendChild(sanitize(binding.value, config));
  }
};
const clear = el => {
  el.textContent = '';
};
const SafeHtmlDirective = {
  bind: transform,
  update: transform,
  unbind: clear
};

export { SafeHtmlDirective };
