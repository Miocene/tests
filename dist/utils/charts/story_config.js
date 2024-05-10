import times from 'lodash/times';
import { SERIES_NAME, SERIES_NAME_SHORT } from '../stories_constants';
import { marqueeSelectionSvgPath, redoSvgPath, clearAllSvgPath, downloadSvgPath } from '../svgs/svg_paths';
import { colorFromDefaultPalette } from './theme';

const toolbox = {
  feature: {
    dataZoom: {
      icon: {
        zoom: marqueeSelectionSvgPath,
        back: redoSvgPath
      }
    },
    restore: {
      icon: clearAllSvgPath
    },
    saveAsImage: {
      icon: downloadSvgPath
    }
  }
};

/**
 * Generates series data for usage in chart examples
 *
 * @param {Number} amount number of generated series
 * @param {String} nameType type of names - how long they should be
 * @returns {Array} generated series data
 */
const generateSeriesData = function () {
  let amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  let nameType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SERIES_NAME_SHORT;
  const defaultData = [820, 932, 960, 1150, 1290, 1330, 1390];
  const name = SERIES_NAME[nameType];
  return times(amount, index => ({
    color: colorFromDefaultPalette(index),
    data: defaultData.map(value => value * index),
    name: `${name}${index + 1}`
  }));
};

export { generateSeriesData, toolbox };
