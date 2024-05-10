/**
 * Builds the parameters object disable one or multiple controls.
 */
const disableControls = function () {
  let controls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return Object.fromEntries(controls.map(control => [control, {
    control: {
      disable: true
    }
  }]));
};

export { disableControls };
