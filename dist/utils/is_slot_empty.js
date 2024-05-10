import Vue from 'vue';

// Fragment will be available only in Vue.js 3
const {
  Fragment,
  Comment
} = Vue;
function callIfNeeded(fnOrResult, args) {
  return fnOrResult instanceof Function ? fnOrResult(args) : fnOrResult;
}
function isEmpty(vnode) {
  if (!vnode || Comment && vnode.type === Comment) {
    return true;
  }
  if (Array.isArray(vnode)) {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    return vnode.every(isEmpty);
  }
  if (Fragment && vnode.type === Fragment) {
    // Vue.js 3 fragment, check children
    // eslint-disable-next-line unicorn/no-array-callback-reference
    return vnode.children.every(isEmpty);
  }
  return false;
}
function isSlotEmpty(vueInstance, slot, slotArgs) {
  var _vueInstance$$scopedS, _vueInstance$$scopedS2;
  const isVue3 = Boolean(Fragment);
  const slotContent = isVue3 ?
  // we need to check both $slots and $scopedSlots due to https://github.com/vuejs/core/issues/8869
  // additionally, in @vue/compat $slot might be a function instead of array of vnodes (sigh)
  callIfNeeded(vueInstance.$slots[slot] || vueInstance.$scopedSlots[slot], slotArgs) : (_vueInstance$$scopedS = (_vueInstance$$scopedS2 = vueInstance.$scopedSlots)[slot]) === null || _vueInstance$$scopedS === void 0 ? void 0 : _vueInstance$$scopedS.call(_vueInstance$$scopedS2, slotArgs);

  // eslint-disable-next-line unicorn/no-array-callback-reference
  return isEmpty(slotContent);
}

export { isSlotEmpty };
