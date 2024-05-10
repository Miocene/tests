import { POSITION } from '../components/utilities/truncate/constants';

function appendDefaultOption(options) {
  return {
    ...options,
    default: ''
  };
}
const COMMA = ',';
const CONTRAST_LEVELS = [{
  grade: 'F',
  min: 0,
  max: 3
}, {
  grade: 'AA+',
  min: 3,
  max: 4.5
}, {
  grade: 'AA',
  min: 4.5,
  max: 7
}, {
  grade: 'AAA',
  min: 7,
  max: 22
}];
const HEX_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const LEFT_MOUSE_BUTTON = 0;
const glThemes = ['indigo', 'blue', 'light-blue', 'green', 'red', 'light-red'];
const variantOptions = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  light: 'light',
  dark: 'dark'
};
const badgeSizeOptions = {
  sm: 'sm',
  md: 'md',
  lg: 'lg'
};
const badgeVariantOptions = {
  muted: 'muted',
  neutral: 'neutral',
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  tier: 'tier'
};
const badgeIconSizeOptions = {
  sm: 12,
  md: 16
};
const variantCssColorMap = {
  muted: 'gl-text-gray-500',
  neutral: 'gl-text-blue-100',
  info: 'gl-text-blue-500',
  success: 'gl-text-green-500',
  warning: 'gl-text-orange-500',
  danger: 'gl-text-red-500'
};
const targetOptions = ['_self', '_blank', '_parent', '_top', null];
const viewModeOptions = {
  dark: 'dark',
  light: 'light'
};
const labelColorOptions = {
  ...viewModeOptions
};
const avatarSizeOptions = [96, 64, 48, 32, 24, 16];
const avatarsInlineSizeOptions = [32, 24, 16];
const avatarShapeOptions = {
  circle: 'circle',
  rect: 'rect'
};
const formStateOptions = {
  default: null,
  valid: true,
  invalid: false
};
const buttonCategoryOptions = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary'
};
const buttonVariantOptions = {
  default: 'default',
  confirm: 'confirm',
  info: 'info (deprecated)',
  success: 'success (deprecated)',
  danger: 'danger',
  dashed: 'dashed',
  link: 'link',
  /**
   * The "reset" variant can be used when customization of GlButton styles is required
   * (e.g. for the "close" button in GlLabel).
   * It should be used sparingly and only when other approaches fail.
   * Prefer supported variants where ever possible.
   */
  reset: 'gl-reset'
};
const badgeForButtonOptions = {
  [buttonVariantOptions.default]: badgeVariantOptions.neutral,
  [buttonVariantOptions.confirm]: badgeVariantOptions.info,
  [buttonVariantOptions.danger]: badgeVariantOptions.danger
};
const dropdownVariantOptions = {
  default: 'default',
  confirm: 'confirm',
  info: 'info (deprecated)',
  success: 'success (deprecated)',
  danger: 'danger',
  link: 'link'
};
const dropdownPlacements = {
  'right-start': 'right-start',
  'bottom-start': 'bottom-start',
  'bottom-end': 'bottom-end',
  bottom: 'bottom',
  left: 'bottom-start',
  // deprecated, should be replaced with "bottom-start"
  center: 'bottom',
  // deprecated, should be replaced with "bottom"
  right: 'bottom-end' // deprecated, should be replaced with "bottom-end"
};
const dropdownHorizontalCornerPlacement = ['right-start', 'right-end', 'left-start', 'left-end'];
const dropdownVerticalCornerPlacement = ['bottom-start', 'top-start', 'bottom-end', 'top-end'];
const dropdownAllowedAutoPlacements = {
  'right-start': dropdownHorizontalCornerPlacement,
  'bottom-start': dropdownVerticalCornerPlacement,
  'bottom-end': dropdownVerticalCornerPlacement,
  bottom: ['bottom', 'top'],
  left: dropdownVerticalCornerPlacement,
  // deprecated, should be replaced with "bottom-start"
  center: ['bottom', 'top'],
  // deprecated, should be replaced with "bottom"
  right: dropdownVerticalCornerPlacement // deprecated, should be replaced with "bottom-end"
};
const buttonSizeOptions = {
  small: 'sm',
  medium: 'md'
};
const datepickerWidthOptionsMap = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl'
};

// size options all have corresponding styles (e.g. .s12 defined in icon.scss)
const iconSizeOptions = [8, 12, 14, 16, 24, 32, 48, 72];
const triggerVariantOptions = {
  click: 'click',
  hover: 'hover',
  focus: 'focus'
};
const tooltipPlacements = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom'
};

// in milliseconds
const tooltipDelay = {
  show: 500,
  hide: 0
};
const popoverPlacements = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left'
};
const columnOptions = {
  stacked: 'stacked',
  tiled: 'tiled'
};
const alignOptions = {
  left: 'left',
  center: 'center',
  right: 'right',
  fill: 'fill'
};
const alertVariantOptions = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  tip: 'tip'
};
const alertVariantIconMap = {
  success: 'check-circle',
  warning: 'warning',
  danger: 'error',
  info: 'information-o',
  tip: 'bulb'
};
const colorThemes = {
  indigo: 'theme-indigo-900',
  'light-indigo': 'theme-indigo-700',
  blue: 'theme-blue-900',
  'light-blue': 'theme-blue-700',
  green: 'theme-green-900',
  'light-green': 'theme-green-700',
  red: 'theme-red-900',
  'light-red': 'theme-red-700',
  dark: 'gray-900',
  light: 'gray-700'
};
const modalButtonDefaults = {
  actionPrimary: {
    variant: 'confirm',
    category: 'primary'
  },
  actionSecondary: {
    variant: 'confirm',
    category: 'secondary'
  },
  actionCancel: {
    variant: 'default'
  }
};
const tabsButtonDefaults = {
  actionPrimary: {
    variant: 'success',
    category: 'primary'
  },
  actionSecondary: {
    variant: 'default',
    category: 'secondary'
  },
  actionTertiary: {
    variant: 'default'
  }
};
const tokenVariants = ['default', 'search-type', 'search-value'];
const resizeDebounceTime = 200;
const variantOptionsWithNoDefault = appendDefaultOption(variantOptions);

// Datetime constants
const defaultDateFormat = 'YYYY-MM-DD';
const bannerVariants = ['promotion', 'introduction'];
const maxZIndex = 10;
const modalSizeOptions = {
  sm: 'sm',
  md: 'md',
  lg: 'lg'
};
const focusableTags = ['INPUT', 'TEXTAREA', 'A', 'BUTTON', 'SELECT'];
const keyboard = {
  escape: 'Escape',
  backspace: 'Backspace',
  delete: 'Delete',
  left: 'Left',
  arrowLeft: 'ArrowLeft',
  right: 'Right',
  arrowRight: 'ArrowRight',
  home: 'Home',
  end: 'End',
  tab: 'Tab'
};
const truncateOptions = POSITION;
const formInputWidths = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '(unset or null)': null
};
const toggleLabelPosition = {
  hidden: 'hidden',
  left: 'left',
  top: 'top'
};
const tooltipActionEvents = ['open', 'close', 'enable', 'disable'];
const drawerVariants = {
  default: 'default',
  sidebar: 'sidebar'
};
const loadingIconSizes = {
  'sm (16x16)': 'sm',
  'md (24x24)': 'md',
  'lg (32x32)': 'lg',
  'xl (64x64)': 'xl'
};
const loadingIconVariants = {
  spinner: 'spinner',
  dots: 'dots'
};

export { COMMA, CONTRAST_LEVELS, HEX_REGEX, LEFT_MOUSE_BUTTON, alertVariantIconMap, alertVariantOptions, alignOptions, avatarShapeOptions, avatarSizeOptions, avatarsInlineSizeOptions, badgeForButtonOptions, badgeIconSizeOptions, badgeSizeOptions, badgeVariantOptions, bannerVariants, buttonCategoryOptions, buttonSizeOptions, buttonVariantOptions, colorThemes, columnOptions, datepickerWidthOptionsMap, defaultDateFormat, drawerVariants, dropdownAllowedAutoPlacements, dropdownPlacements, dropdownVariantOptions, focusableTags, formInputWidths, formStateOptions, glThemes, iconSizeOptions, keyboard, labelColorOptions, loadingIconSizes, loadingIconVariants, maxZIndex, modalButtonDefaults, modalSizeOptions, popoverPlacements, resizeDebounceTime, tabsButtonDefaults, targetOptions, toggleLabelPosition, tokenVariants, tooltipActionEvents, tooltipDelay, tooltipPlacements, triggerVariantOptions, truncateOptions, variantCssColorMap, variantOptions, variantOptionsWithNoDefault, viewModeOptions };
