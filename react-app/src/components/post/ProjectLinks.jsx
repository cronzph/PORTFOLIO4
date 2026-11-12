import Icon from '../Icon';

/** Live demo + source links for a post. Hidden when the post has neither. */
export default function ProjectLinks({ post, variant = 'card' }) {
  const { liveUrl, repoUrl } = post;
  if (!liveUrl && !repoUrl) return null;

  const stop = (event) => event.stopPropagation();
  const wide = variant === 'modal';

  return (
    <div className="post-links">
      {liveUrl && (
        <a
          className={`post-link${wide ? ' post-link--wide' : ''}`}
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          title="Live demo"
        >
          <Icon name="external" size={14} />
          {wide && <span>Live demo</span>}
        </a>
      )}

      {repoUrl && (
        <a
          className={`post-link${wide ? ' post-link--wide' : ''}`}
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          title="Source code"
        >
          <Icon name="github" size={14} />
          {wide && <span>Source code</span>}
        </a>
      )}
    </div>
  );
}
