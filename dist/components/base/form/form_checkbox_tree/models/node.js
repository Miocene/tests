import { CHECKED_STATE } from './constants';

class Node {
  constructor(_ref) {
    let {
      value,
      label,
      parent = null,
      children = [],
      depth,
      isChecked
    } = _ref;
    this.value = value;
    this.label = label;
    this.parent = parent;
    this.children = children;
    this.depth = depth;
    this.checkedState = isChecked ? CHECKED_STATE.CHECKED : CHECKED_STATE.UNCHECKED;
  }

  /**
   * Sets the node's checked state
   * @param {number} checkedState
   */
  setCheckedState(checkedState) {
    this.checkedState = checkedState;
  }
  get isChild() {
    return this.parent !== null;
  }
  get isParent() {
    return this.children.length > 0;
  }
  get isLeaf() {
    return !this.isParent;
  }
  get isUnchecked() {
    return this.checkedState === CHECKED_STATE.UNCHECKED;
  }
  get isIndeterminate() {
    return this.checkedState === CHECKED_STATE.INDETERMINATE;
  }
  get isChecked() {
    return this.checkedState === CHECKED_STATE.CHECKED;
  }
  get isCheckedOrIndeterminate() {
    return this.isChecked || this.isIndeterminate;
  }
}

export { Node };
