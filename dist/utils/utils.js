import { isVisible } from 'bootstrap-vue/esm/utils/dom';
import { COMMA, labelColorOptions, CONTRAST_LEVELS, focusableTags } from './constants';

function debounceByAnimationFrame(fn) {
  let requestId;
  return function debounced() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (requestId) {
      window.cancelAnimationFrame(requestId);
    }
    requestId = window.requestAnimationFrame(() => fn.apply(this, args));
  };
}
function throttle(fn) {
  let frameId = null;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (frameId) {
      return;
    }
    frameId = window.requestAnimationFrame(() => {
      fn(...args);
      frameId = null;
    });
  };
}
function rgbFromHex(hex) {
  const cleanHex = hex.replace('#', '');
  const rgb = cleanHex.length === 3 ? cleanHex.split('').map(val => val + val) : cleanHex.match(/[\da-f]{2}/gi);
  const [r, g, b] = rgb.map(val => parseInt(val, 16));
  return [r, g, b];
}
function rgbFromString(color, sub) {
  const rgb = color.substring(sub, color.length - 1).split(COMMA);
  const [r, g, b] = rgb.map(i => parseInt(i, 10));
  return [r, g, b];
}
function hexToRgba(hex) {
  let opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  const [r, g, b] = rgbFromHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
function toSrgb(value) {
  const normalized = value / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}
function relativeLuminance(rgb) {
  // WCAG 2.1 formula: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
  // -
  // WCAG 3.0 will use APAC
  // Using APAC would be the ultimate goal, but was dismissed by engineering as of now
  // See https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/3418#note_1370107090
  return 0.2126 * toSrgb(rgb[0]) + 0.7152 * toSrgb(rgb[1]) + 0.0722 * toSrgb(rgb[2]);
}
function colorFromBackground(backgroundColor) {
  let contrastRatio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2.4;
  let color;
  const lightColor = rgbFromHex('#FFFFFF');
  const darkColor = rgbFromHex('#1f1e24');
  if (backgroundColor.startsWith('#')) {
    color = rgbFromHex(backgroundColor);
  } else if (backgroundColor.startsWith('rgba(')) {
    color = rgbFromString(backgroundColor, 5);
  } else if (backgroundColor.startsWith('rgb(')) {
    color = rgbFromString(backgroundColor, 4);
  }
  const luminance = relativeLuminance(color);
  const lightLuminance = relativeLuminance(lightColor);
  const darkLuminance = relativeLuminance(darkColor);
  const contrastLight = (lightLuminance + 0.05) / (luminance + 0.05);
  const contrastDark = (luminance + 0.05) / (darkLuminance + 0.05);

  // Using a default threshold contrast of 2.4 instead of 3
  // as this will solve weird color combinations in the mid tones
  return contrastLight >= contrastRatio || contrastLight > contrastDark ? labelColorOptions.light : labelColorOptions.dark;
}
function getColorContrast(foreground, background) {
  // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
  const backgroundLuminance = relativeLuminance(rgbFromHex(background)) + 0.05;
  const foregroundLuminance = relativeLuminance(rgbFromHex(foreground)) + 0.05;
  let score = backgroundLuminance / foregroundLuminance;
  if (foregroundLuminance > backgroundLuminance) {
    score = 1 / score;
  }
  const level = CONTRAST_LEVELS.find(_ref => {
    let {
      min,
      max
    } = _ref;
    return score >= min && score < max;
  });
  return {
    score: (Math.round(score * 10) / 10).toFixed(1),
    level
  };
}
function uid() {
  return Math.random().toString(36).substring(2);
}

/**
 * Receives an element and validates that it can be focused
 * @param { HTMLElement } The element we want to validate
 * @return { boolean } Is the element focusable
 */

function isElementFocusable(elt) {
  if (!elt) return false;
  const {
    tagName
  } = elt;
  const isValidTag = focusableTags.includes(tagName);
  const hasValidType = elt.getAttribute('type') !== 'hidden';
  const isDisabled = elt.getAttribute('disabled') === '' || elt.getAttribute('disabled');
  const hasValidZIndex = elt.getAttribute('z-index') !== '-1';
  const isInvalidAnchorTag = tagName === 'A' && !elt.getAttribute('href');
  return isValidTag && hasValidType && !isDisabled && hasValidZIndex && !isInvalidAnchorTag;
}

/**
 * Receives an element and validates that it is reachable via sequential keyboard navigation
 * @param { HTMLElement } The element to validate
 * @return { boolean } Is the element focusable in a sequential tab order
 */

function isElementTabbable(el) {
  if (!el) return false;
  const tabindex = parseInt(el.getAttribute('tabindex'), 10);
  return tabindex > -1;
}

/**
 * Receives an array of HTML elements and focus the first one possible
 * @param { Array.<HTMLElement> } An array of element to potentially focus
 * @return { undefined }
 */

function focusFirstFocusableElement(elts) {
  const focusableElt = elts.find(el => isElementFocusable(el));
  if (focusableElt) focusableElt.focus();
}

/**
 * Returns true if the current environment is considered a development environment (it's not
 * production or test).
 *
 * @returns {boolean}
 */
function isDev() {
  return !['test', 'production'].includes(process.env.NODE_ENV);
}

/**
 * Prints a warning message to the console in non-test and non-production environments.
 * @param {string} message message to print to the console
 * @param {HTMLElement} element component that triggered the warning
 */
function logWarning() {
  let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (message.length && isDev()) {
    console.warn(message, element); // eslint-disable-line no-console
  }
}

/**
 * Stop default event handling and propagation
 */
function stopEvent(event) {
  let {
    preventDefault = true,
    stopPropagation = true,
    stopImmediatePropagation = false
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (preventDefault) {
    event.preventDefault();
  }
  if (stopPropagation) {
    event.stopPropagation();
  }
  if (stopImmediatePropagation) {
    event.stopImmediatePropagation();
  }
}

/**
 * Return an Array of visible items
 */
function filterVisible(els) {
  return (els || []).filter(el => isVisible(el));
}

/**
 * Given an element, returns a Rect object
 * with top and bottom boundaries removed.
 */
function getHorizontalBoundingClientRect(el) {
  const rect = el === null || el === void 0 ? void 0 : el.getBoundingClientRect();
  if (rect) {
    return {
      x: rect.x,
      width: rect.width,
      y: 0,
      // top of the document
      height: document.documentElement.clientHeight // bottom of the document
    };
  }
  return null;
}

export { colorFromBackground, debounceByAnimationFrame, filterVisible, focusFirstFocusableElement, getColorContrast, getHorizontalBoundingClientRect, hexToRgba, isDev, isElementFocusable, isElementTabbable, logWarning, relativeLuminance, rgbFromHex, rgbFromString, stopEvent, throttle, toSrgb, uid };
