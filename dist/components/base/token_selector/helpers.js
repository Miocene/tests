import has from 'lodash/has';

const tokensValidator = tokens => tokens.every(token => has(token, 'id'));

export { tokensValidator };
