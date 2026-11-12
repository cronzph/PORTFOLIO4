import { marked } from 'marked';
import { parseContentWithEmbeds } from '../../utils/embedParser';
import { sanitizeHtml } from '../../utils/sanitizeHtml';
import VideoEmbed from './VideoEmbed';

const isHtml = (value) => /<[a-z][\s\S]*>/i.test(value);

marked.setOptions({ breaks: true, gfm: true });

// Fenced code blocks get a header with a copy button.
const renderer = new marked.Renderer();

renderer.code = (code, infostring) => {
  const language = (infostring || '').trim().split(/\s+/)[0] || '';
  const escaped = String(code)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return (
    '<div class="code-block">' +
    '<div class="code-block__head">' +
    `<span>${language || 'code'}</span>` +
    '<button type="button" class="code-block__copy"><span>Copy</span></button>' +
    '</div>' +
    `<pre><code class="language-${language}">${escaped}</code></pre>` +
    '</div>'
  );
};

marked.use({ renderer });

/**
 * Renders post content: real HTML stays HTML, everything else is parsed as
 * Markdown, and standalone video URLs become lazy embeds.
 */
export default function ContentRenderer({ content }) {
  if (!content) return null;

  const segments = parseContentWithEmbeds(content);

  const handleClick = (event) => {
    const button = event.target.closest('.code-block__copy');
    if (!button) return;

    const code = button.closest('.code-block')?.querySelector('code');
    if (!code) return;

    navigator.clipboard
      .writeText(code.textContent)
      .then(() => {
        const label = button.querySelector('span');
        const original = label.textContent;
        label.textContent = 'Copied';
        setTimeout(() => {
          label.textContent = original;
        }, 1500);
      })
      .catch(() => {});
  };

  return (
    <div className="markdown-body" onClick={handleClick}>
      {segments.map((segment, index) => {
        if (segment.type === 'embed') {
          return <VideoEmbed key={index} embed={segment.embed} originalUrl={segment.originalUrl} />;
        }

        const html = isHtml(segment.content)
          ? sanitizeHtml(segment.content)
          : marked.parse(segment.content);

        return <div key={index} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </div>
  );
}
