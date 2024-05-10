// See https://gitlab.com/gitlab-org/gitlab-ui/-/issues/1421#note_617098438
// for more details
const forbiddenDataAttrs = ['data-remote', 'data-url', 'data-type', 'data-method', 'data-disable-with', 'data-disabled', 'data-disable', 'data-turbo'];
const forbiddenTags = ['style', 'mstyle', 'form'];

export { forbiddenDataAttrs, forbiddenTags };