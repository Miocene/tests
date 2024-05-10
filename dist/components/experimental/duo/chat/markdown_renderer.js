import { Marked } from 'marked';
import markedBidi from 'marked-bidi';

// eslint-disable-next-line no-restricted-imports
const duoMarked = new Marked([{
  async: false,
  breaks: false,
  gfm: false
}, markedBidi()]);
function renderDuoChatMarkdownPreview(md) {
  try {
    return md ? duoMarked.parse(md.toString()) : '';
  } catch {
    return md;
  }
}

export { renderDuoChatMarkdownPreview };
