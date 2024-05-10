/**
 * As of %12.10 all annotations are added as a decorations
 * by piggybacking a scatter series. The series should
 * have 'annotations' as name for the annotation tooltips
 * to work.
 *
 * More info here https://gitlab.com/gitlab-org/gitlab/-/merge_requests/28825
 *
 */
const ANNOTATIONS_SERIES_NAME = 'annotations';
/**
 * Annotations have a line (markLine) and an arrow (markPoint).
 * When the markPoint is hovered, a tooltip is displayed to
 * show the annotation description.
 *
 * All markPoints have this component type
 */
const ANNOTATIONS_COMPONENT_TYPE = 'markPoint';

/**
 * This is a slight offset that gets applied to the left
 * of the chart tooltips to ensure a correct position.
 */
const TOOLTIP_LEFT_OFFSET = 2;

/**
 * This is a slight offset that gets applied to the left
 * of the chart tooltips to ensure a correct position.
 */
const TOOLTIP_TOP_OFFSET = 10;

/**
 * These are the accepted values for the layout prop
 * of the chart legend component
 */
const LEGEND_LAYOUT_INLINE = 'inline';
const LEGEND_LAYOUT_TABLE = 'table';

/**
 * Default values for the chart legend field labels
 */
const LEGEND_AVERAGE_TEXT = 'Avg';
const LEGEND_CURRENT_TEXT = 'Current';
const LEGEND_MIN_TEXT = 'Min';
const LEGEND_MAX_TEXT = 'Max';

/**
 * These arrow symbols are used as markPoints under the annotations lines
 * within area and line charts. This icon doesn't exist in the svg
 * library yet. The below issue is to track the progress of the svg icon
 * https://gitlab.com/gitlab-org/gitlab-svgs/-/issues/118
 */
const arrowSymbol = 'path://m5 229 5 8h-10z';

// Constants for the type property of charts
const CHART_TYPE_BAR = 'bar';
const CHART_TYPE_LINE = 'line';

// Constants for height "auto"
const HEIGHT_AUTO_CLASSES = 'gl-chart-h-auto gl-display-flex gl-flex-direction-column gl-h-full';
const HEIGHT_AUTO_HORIZONTAL_LAYOUT_CLASSES = 'gl-display-flex gl-h-full';

export { ANNOTATIONS_COMPONENT_TYPE, ANNOTATIONS_SERIES_NAME, CHART_TYPE_BAR, CHART_TYPE_LINE, HEIGHT_AUTO_CLASSES, HEIGHT_AUTO_HORIZONTAL_LAYOUT_CLASSES, LEGEND_AVERAGE_TEXT, LEGEND_CURRENT_TEXT, LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE, LEGEND_MAX_TEXT, LEGEND_MIN_TEXT, TOOLTIP_LEFT_OFFSET, TOOLTIP_TOP_OFFSET, arrowSymbol };
