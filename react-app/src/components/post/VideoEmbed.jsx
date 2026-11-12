import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';

const LABELS = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  instagram: 'Instagram',
};

/**
 * Lazy video embed — the iframe only mounts once it is near the viewport.
 * Facebook blocks most iframe embeds and TikTok short links cannot be resolved
 * client-side, so those fall back to a link button.
 */
export default function VideoEmbed({ embed, originalUrl }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (embed.platform === 'facebook' || !embed.embedUrl) {
    return (
      <a className="video-link" href={originalUrl} target="_blank" rel="noopener noreferrer">
        <Icon name="external" size={15} />
        Watch on {LABELS[embed.platform] || embed.platform}
      </a>
    );
  }

  const vertical = embed.aspectRatio === '9/16';

  return (
    <div
      ref={ref}
      className="video-embed"
      style={{ maxWidth: vertical ? 340 : '100%', aspectRatio: embed.aspectRatio }}
    >
      {visible ? (
        <iframe
          src={embed.embedUrl}
          title={`${LABELS[embed.platform] || embed.platform} video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div className="video-embed__loading">Loading {LABELS[embed.platform] || 'video'}…</div>
      )}
    </div>
  );
}
