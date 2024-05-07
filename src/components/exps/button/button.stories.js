import GlButton from '../../base/button/button.vue';

const components = { GlButton };

const defaultValue = (prop) => GlButton.props[prop].default;

const generateProps = ({
  category = defaultValue('category'),
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  withLink = false,
  href = '#',
  target = null,
  block = false,
  disabled = defaultValue('disabled'),
  loading = defaultValue('loading'),
  selected = defaultValue('selected'),
} = {}) => ({
  category,
  variant,
  size,
  block,
  disabled,
  loading,
  selected,
  ...(withLink && {
    href,
    target,
  }),
});


export const Default = (args, { argTypes = {} }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
      <gl-button
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        :loading="loading"
        :selected="selected"
      >
        This is a button
      </gl-button>
    `,
});
Default.args = generateProps();

export default {
  title: 'exp/button',
};
