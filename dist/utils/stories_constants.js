/**
 * Arg types subcategories to be used to organize props within arg tables
 */

const ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL = 'Look & feel';
const ARG_TYPE_SUBCATEGORY_STATE = 'State';
const ARG_TYPE_SUBCATEGORY_SEARCH = 'Search';
const ARG_TYPE_SUBCATEGORY_ACCESSIBILITY = 'Accessibility';
const ARG_TYPE_SUBCATEGORY_INFINITE_SCROLL = 'Infinite scroll';

/**
 * These are used to test varying lengths of series names
 */
const SERIES_NAME_SHORT = 'SERIES_NAME_SHORT';
const SERIES_NAME_LONG = 'SERIES_NAME_LONG';
const SERIES_NAME_LONG_WITHOUT_SPACES = 'SERIES_NAME_LONG_WITHOUT_SPACES';
const SERIES_NAME = {
  [SERIES_NAME_SHORT]: 'Series ',
  [SERIES_NAME_LONG]: 'Series name long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt interdum sapien ut blandit. Nulla fermentum nisi id euismod vulputate. END',
  [SERIES_NAME_LONG_WITHOUT_SPACES]: 'Series_name_long._Lorem_ipsum_dolor_sit_amet,_consectetur_adipiscing_elit._Sed_tincidunt_interdum_sapien_ut_blandit._Nulla_fermentum_nisi_id_euismod_vulputate._END'
};

/**
 * Reused constants for ListBox
 */

const LISTBOX_CONTAINER_HEIGHT = '370px';

export { ARG_TYPE_SUBCATEGORY_ACCESSIBILITY, ARG_TYPE_SUBCATEGORY_INFINITE_SCROLL, ARG_TYPE_SUBCATEGORY_LOOK_AND_FEEL, ARG_TYPE_SUBCATEGORY_SEARCH, ARG_TYPE_SUBCATEGORY_STATE, LISTBOX_CONTAINER_HEIGHT, SERIES_NAME, SERIES_NAME_LONG, SERIES_NAME_LONG_WITHOUT_SPACES, SERIES_NAME_SHORT };
