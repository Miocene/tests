const CHAT_RESET_MESSAGE = '/reset';
const CHAT_CLEAN_MESSAGE = '/clean';
const LOADING_TRANSITION_DURATION = 7500;
const DOCUMENTATION_SOURCE_TYPES = {
  HANDBOOK: {
    value: 'handbook',
    icon: 'book'
  },
  DOC: {
    value: 'doc',
    icon: 'documents'
  },
  BLOG: {
    value: 'blog',
    icon: 'list-bulleted'
  }
};
const MESSAGE_MODEL_ROLES = {
  user: 'user',
  system: 'system',
  assistant: 'assistant'
};

export { CHAT_CLEAN_MESSAGE, CHAT_RESET_MESSAGE, DOCUMENTATION_SOURCE_TYPES, LOADING_TRANSITION_DURATION, MESSAGE_MODEL_ROLES };
