const badgeTypes = ['experiment', 'beta', null];
const badgeTypeValidator = value => badgeTypes.includes(value);

export { badgeTypeValidator, badgeTypes };
