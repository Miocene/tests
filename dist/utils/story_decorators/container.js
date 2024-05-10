/**
 * Return a story decorator function, which wraps the given story in a `div`
 * element with the given `style` attributes.
 *
 * @param {object} style The style attribute to apply to the container.
 * @return {function} The story decorator.
 */
const makeContainer = function (style) {
  let tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  return Story => ({
    render(h) {
      return h(tag, {
        style
      }, [h(Story())]);
    }
  });
};

export { makeContainer };
