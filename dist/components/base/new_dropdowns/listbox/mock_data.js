const mockOptions = [{
  value: 'prod',
  text: 'Product'
}, {
  value: 'ppl',
  text: 'People'
}, {
  value: 'fin',
  text: 'Finance'
}, {
  value: 'leg',
  text: 'Legal'
}, {
  value: 'eng',
  text: 'Engineering'
}, {
  value: 'sales',
  text: 'Sales'
}, {
  value: 'marketing',
  text: 'Marketing'
}, {
  value: 'acc',
  text: 'Accounting'
}, {
  value: 'hr',
  text: 'Human Resource Management'
}, {
  value: 'rnd',
  text: 'Research and Development'
}, {
  value: 'cust',
  text: 'Customer Service'
}, {
  value: 'sup',
  text: 'Support'
}];
const mockOptionsValues = mockOptions.map(_ref => {
  let {
    value
  } = _ref;
  return value;
});
const mockGroups = [{
  text: 'Branches',
  options: [{
    text: 'main',
    value: 'main'
  }, {
    text: 'feature-123',
    value: 'feature-123'
  }]
}, {
  text: 'Tags',
  options: [{
    text: 'v1.0',
    value: 'v1.0'
  }, {
    text: 'v2.0',
    value: 'v2.0'
  }, {
    text: 'v2.1',
    value: 'v2.1'
  }]
}];
const mockGroupOptionsValues = mockGroups.map(group => group.options).flat().map(_ref2 => {
  let {
    value
  } = _ref2;
  return value;
});
const mockGroupsWithTextSrOnly = [{
  text: 'Default',
  options: [{
    text: 'main',
    value: 'main'
  }, {
    text: 'development',
    value: 'development'
  }],
  textSrOnly: true
}, {
  text: 'Feature branches',
  options: [{
    text: 'feature/add-avatar',
    value: 'add'
  }, {
    text: 'feature/improve-panel',
    value: 'improve'
  }]
}, {
  text: 'Bugfix branches',
  options: [{
    text: 'fix/border-of-avatar',
    value: 'fix-border'
  }, {
    text: 'fix/radius-panel',
    value: 'fix-radius'
  }]
}];
const mockUsers = [{
  value: 'mikegreiling',
  text: 'Mike Greiling',
  secondaryText: '@mikegreiling',
  icon: 'foo'
}, {
  value: 'ohoral',
  text: 'Olena Horal-Koretska',
  secondaryText: '@ohoral',
  icon: 'bar'
}, {
  value: 'markian',
  text: 'Mark Florian',
  secondaryText: '@markian',
  icon: 'bin'
}];

export { mockGroupOptionsValues, mockGroups, mockGroupsWithTextSrOnly, mockOptions, mockOptionsValues, mockUsers };