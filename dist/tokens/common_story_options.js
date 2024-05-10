import { WHITE, GRAY_950 } from '../../dist/tokens/js/tokens';
import TokensStory from './tokens_story';

const createDesignTokenStory = function () {
  let {
    tokens = {},
    isBackgroundColorStory = true,
    containerClass = ''
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const Story = (args, _ref) => {
    let {
      argTypes
    } = _ref;
    return {
      props: Object.keys(argTypes),
      components: {
        TokensStory
      },
      provide: {
        containerClass,
        isBackgroundColorStory,
        lightBackground: WHITE,
        darkBackground: GRAY_950
      },
      template: `<tokens-story v-bind="$props" />`
    };
  };
  Story.args = {
    tokens
  };
  return Story;
};

export { createDesignTokenStory };
