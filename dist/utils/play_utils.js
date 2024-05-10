import { userEvent } from '@storybook/test';

const triggerBlurEvent = async () => userEvent.pointer([{
  keys: '[MouseLeft]',
  coords: {
    x: 0,
    y: 0
  }
}]);

export { triggerBlurEvent };
