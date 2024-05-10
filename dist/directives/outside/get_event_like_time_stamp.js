/**
 * This file is based on Vue's scheduler code:
 * https://github.com/vuejs/vue/blob/v2.6.12/src/core/observer/scheduler.js#L44-L66
 *
 * See the LICENSE file in this directory.
 */

const {
  performance
} = window;

/**
 * Get a current timestamp that can be meaningfully compared to an event's
 * `timeStamp` property.
 *
 * Event timestamps can be a DOMHighResTimeStamp (if supported), otherwise
 * a DOMTimeStamp (used by jsdom and older browsers).
 *
 * This function will return a current timestamp of the same type used by the
 * underlying environment when it creates DOM events.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp for
 * more details.
 *
 * @returns {number}
 */
const getEventLikeTimeStamp =
// If the event timestamp, although evaluated AFTER the Date.now(), is
// smaller, it means the event is using a hi-res timestamp, and we need to
// use the hi-res version for event listener timestamps as well.
typeof (performance === null || performance === void 0 ? void 0 : performance.now) === 'function' && Date.now() > document.createEvent('Event').timeStamp ? () => performance.now() : () => Date.now();

export { getEventLikeTimeStamp };
