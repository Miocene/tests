import { buttonSizeOptions } from '../../utils/constants';

const ButtonMixin = {
  computed: {
    buttonSize() {
      return buttonSizeOptions[this.size];
    }
  }
};

export { ButtonMixin };
