import isMatch from 'lodash/isMatch';

/* global jest, beforeEach, afterEach */

/**
 * This class gives us a JSDom friendly DOM observer which we can manually trigger in tests
 *
 * Use this in place of MutationObserver or IntersectionObserver
 *
 * This class is largely influenced from [a test helper][1] in the main GitLab project
 *
 * [1]: https://gitlab.com/gitlab-org/gitlab/blob/a123813c63147392b95cd03c4744ae9db0575b0f/spec/frontend/helpers/mock_dom_observer.js#L95
 */
class MockObserver {
  constructor(cb) {
    this.$_cb = cb;
    this.$_observers = [];
  }
  observe(node) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.$_observers.push([node, options]);
  }
  disconnect() {
    this.$_observers = [];
  }
  takeRecords() {}

  // eslint-disable-next-line camelcase
  $_triggerObserve(nodeParam) {
    let {
      entry = {},
      options = {}
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const nodes = this.$_getNodesFromParam(nodeParam);
    nodes.forEach(node => {
      if (this.$_hasObserver(node, options)) {
        this.$_cb([{
          target: node,
          ...entry
        }]);
      }
    });
  }

  // eslint-disable-next-line camelcase
  $_hasObserver(node) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.$_observers.some(_ref => {
      let [obvNode, obvOptions] = _ref;
      return node === obvNode && isMatch(options, obvOptions);
    });
  }
  $_getNodesFromParam(nodeParam) {
    if (!nodeParam) {
      return this.$_observers.map(_ref2 => {
        let [node] = _ref2;
        return node;
      });
    }
    if (!Array.isArray(nodeParam)) {
      return [nodeParam];
    }
    return nodeParam;
  }
}
class MockIntersectionObserver extends MockObserver {
  unobserve(node) {
    this.$_observers = this.$_observers.filter(_ref3 => {
      let [obvNode] = _ref3;
      return node !== obvNode;
    });
  }
}
const useMockIntersectionObserver = () => {
  let instances;
  let origObserver;
  beforeEach(() => {
    instances = [];
    origObserver = global.IntersectionObserver;
    global.IntersectionObserver = jest.fn().mockImplementation(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      const mockObserver = new MockIntersectionObserver(...args);
      instances.push(mockObserver);
      return mockObserver;
    });
  });
  afterEach(() => {
    instances = [];
    global.IntersectionObserver = origObserver;
  });
  const trigger = function (observer) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    observer.$_triggerObserve(...args);
  };
  const getInstances = () => {
    return instances;
  };
  return {
    getInstances,
    trigger
  };
};

export { useMockIntersectionObserver };
