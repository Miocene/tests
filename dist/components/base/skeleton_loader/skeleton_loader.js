import range from 'lodash/range';
import { uid } from '../../../utils/utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const DEFAULT_LINE_MAX_WIDTH = 235;
const DEFAULT_LINE_WIDTH_PERCENTAGES = [65, 100, 85];
const DEFAULT_LINE_HEIGHT = 10;
const DEFAULT_LINE_SPACING = 4;
const DEFAULT_SVG_WIDTH = 400;
const DEFAULT_SVG_HEIGHT = 130;
var script = {
  name: 'GlSkeletonLoader',
  functional: true,
  props: {
    /**
     * It will be set in the viewbox attr in the <svg />.
     * Defaults to 400 when skeleton is passed via the slot. Defaults to 235 when default skeleton is used
     */
    width: {
      type: Number,
      default: null,
      required: false
    },
    /**
     * It will be set in the viewbox attr in the <svg />. Defaults to 130 when skeleton is passed via the slot.
     * Defaults to the combined height of the lines when default skeleton is used
     */
    height: {
      type: Number,
      default: null,
      required: false
    },
    /**
     * Aspect ratio option of <svg/>
     */
    preserveAspectRatio: {
      type: String,
      default: 'xMidYMid meet',
      required: false
    },
    /**
     * Required if you're using <base url="/" /> in your <head />. Defaults to an empty string.
     * This prop is common used as: <gl-skeleton-loader :base-url="$route.fullPath" /> which will fill the SVG attribute with the relative path.
     */
    baseUrl: {
      type: String,
      default: '',
      required: false
    },
    /**
     * Defaults to unique id
     */
    uniqueKey: {
      type: String,
      default: () => uid(),
      required: false
    },
    /**
     * Number of lines to show when using the default skeleton
     */
    lines: {
      type: Number,
      default: 3,
      required: false
    },
    /**
     * If the default skeleton lines should all be the same width
     */
    equalWidthLines: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  render(createElement, _ref) {
    let {
      props,
      slots
    } = _ref;
    const slotIsSet = () => slots().default;
    const propValueOrDefault = (name, defaultValue) => props[name] !== null ? props[name] : defaultValue;
    const width = () => {
      if (slotIsSet()) {
        return propValueOrDefault('width', DEFAULT_SVG_WIDTH);
      }
      return propValueOrDefault('width', DEFAULT_LINE_MAX_WIDTH);
    };
    const height = () => {
      if (slotIsSet()) {
        return propValueOrDefault('height', DEFAULT_SVG_HEIGHT);
      }
      return propValueOrDefault('height', props.lines * DEFAULT_LINE_HEIGHT + (props.lines - 1) * DEFAULT_LINE_SPACING);
    };
    const lineWidth = index => {
      if (props.equalWidthLines) {
        return '100%';
      }
      return `${DEFAULT_LINE_WIDTH_PERCENTAGES[index % DEFAULT_LINE_WIDTH_PERCENTAGES.length]}%`;
    };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const svg = createElement('svg', {
      class: {
        'gl-skeleton-loader': true,
        'gl-w-full gl-h-full': !slotIsSet()
      },
      attrs: {
        viewBox: `0 0 ${width()} ${height()}`,
        version: '1.1',
        preserveAspectRatio: props.preserveAspectRatio
      }
    }, [createElement('title', {}, ['Loading']), createElement('rect', {
      attrs: {
        'clip-path': `url(${props.baseUrl}#${props.uniqueKey}-idClip)`,
        x: 0,
        y: 0,
        width: width(),
        height: height(),
        ...(reducedMotion ? {
          class: 'gl-fill-gray-100'
        } : {
          fill: `url(${props.baseUrl}#${props.uniqueKey}-idGradient)`
        })
      }
    }), createElement('defs', {}, [createElement('clipPath', {
      attrs: {
        id: `${props.uniqueKey}-idClip`
      }
    }, slotIsSet() ? slots().default : range(props.lines).map(index => createElement('rect', {
      key: index,
      attrs: {
        y: index * DEFAULT_LINE_HEIGHT + index * DEFAULT_LINE_SPACING,
        width: lineWidth(index),
        height: DEFAULT_LINE_HEIGHT,
        rx: 4
      }
    }))), !reducedMotion && createElement('linearGradient', {
      attrs: {
        id: `${props.uniqueKey}-idGradient`
      }
    }, [createElement('stop', {
      class: 'primary-stop',
      attrs: {
        offset: '0%'
      }
    }, [createElement('animate', {
      attrs: {
        attributeName: 'offset',
        values: '-2; 1',
        dur: '1s',
        repeatCount: 'indefinite'
      }
    })]), createElement('stop', {
      class: 'secondary-stop',
      attrs: {
        offset: '50%'
      }
    }, [createElement('animate', {
      attrs: {
        attributeName: 'offset',
        values: '-1.5; 1.5',
        dur: '1s',
        repeatCount: 'indefinite'
      }
    })]), createElement('stop', {
      class: 'primary-stop',
      attrs: {
        offset: '100%'
      }
    }, [createElement('animate', {
      attrs: {
        attributeName: 'offset',
        values: '-1; 2',
        dur: '1s',
        repeatCount: 'indefinite'
      }
    })])])])]);
    if (slotIsSet()) {
      return svg;
    }
    return createElement('div', {
      class: 'gl-skeleton-loader-default-container gl-max-w-full',
      style: {
        width: props.width !== null ? `${props.width}px` : null,
        height: props.height !== null ? `${props.height}px` : null
      }
    }, [svg]);
  }
};

/* script */
const __vue_script__ = script;

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__;