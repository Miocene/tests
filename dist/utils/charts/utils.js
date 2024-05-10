import { ANNOTATIONS_SERIES_NAME, ANNOTATIONS_COMPONENT_TYPE } from './constants';

/**
 * Check if passed series has annotations related data.
 *
 * This is currently used in time series charts (area & line).
 *
 * @param {Array} series Array of series
 * @returns {Boolean}
 */
const seriesHasAnnotations = function () {
  let series = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return (series || []).filter(seriesData => {
    var _seriesData$ANNOTATIO, _seriesData$ANNOTATIO2;
    return seriesData.name === ANNOTATIONS_SERIES_NAME && ((_seriesData$ANNOTATIO = seriesData[ANNOTATIONS_COMPONENT_TYPE]) === null || _seriesData$ANNOTATIO === void 0 ? void 0 : (_seriesData$ANNOTATIO2 = _seriesData$ANNOTATIO.data) === null || _seriesData$ANNOTATIO2 === void 0 ? void 0 : _seriesData$ANNOTATIO2.length);
  }).length !== 0;
};

/**
 * Check if a data point is from an annotation series.
 *
 * This is triggered when hovered over time series charts.
 *
 * This is currently used in
 * @param {Object} params data point object
 * @returns {boolean}
 */
const isDataPointAnnotation = function () {
  let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return params.name === ANNOTATIONS_SERIES_NAME && params.componentType === ANNOTATIONS_COMPONENT_TYPE;
};

/**
 * Date formatter to make date strings more
 * readable.
 *
 * This is currently used in area and line charts
 * stories.
 *
 * @param {String} d date string
 * @returns {String}
 */
const timeSeriesDateFormatter = function () {
  let d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (!d) {
    return '';
  }
  const date = new Date(d);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

export { isDataPointAnnotation, seriesHasAnnotations, timeSeriesDateFormatter };
