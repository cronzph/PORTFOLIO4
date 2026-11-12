import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { push, ref as dbRef } from 'firebase/database';
import { db } from '../../lib/firebase';
import { CAT_COLORS } from '../../data/site';
import { getPostCategories, getPostDate, getPostImage } from '../../hooks/usePosts';
import { formatDate } from '../../utils/format';
import ContentRenderer from './ContentRenderer';
import ProjectLinks from './ProjectLinks';
import Icon from '../Icon';

const EASE = [0.22, 1, 0.36, 1];

function trackView(postId, page) {
  try {
    push(dbRef(db, `views/${postId}`), { postId, timestamp: Date.now(), page }).catch(() => {});
  } catch {
    /* analytics must never break the UI */
  }
}

export default function PostModal({ post, onClose, page = 'portfolio' }) {
  const [lightbox, setLightbox] = useState(null);
  const closeRef = useRef(null);
  const image = getPostImage(post);
  const categories = getPostCategories(post);
  const gallery = Array.isArray(post.images) ? post.images.filter((item) => item?.data) : [];

  useEffect(() => {
    trackView(post.id, page);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (lightbox) setLightbox(null);
        else onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="modal__overlay" onClick={onClose} />

      <motion.div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={post.title}
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.99 }}
        transition={{ duration: 0.38, ease: EASE }}
      >
        <button className="modal__close" type="button" onClick={onClose} ref={closeRef} aria-label="Close">
          <Icon name="close" size={16} />
        </button>

        {image && (
          <div className="modal__banner">
            <img src={image} alt={post.title} />
          </div>
        )}

        <div className="modal__body">
          <div className="cat-row">
            {categories.map((category) => {
              const color = CAT_COLORS[category] || '#94a3b8';
              return (
                <span
                  className="cat-chip"
                  key={category}
                  style={{ color, background: `${color}1f`, borderColor: `${color}55` }}
                >
                  {category}
                </span>
              );
            })}
          </div>

          <h2 className="modal__title">{post.title}</h2>

          <ProjectLinks post={post} variant="modal" />

          <ContentRenderer content={post.content || post.description} />

          <div className="modal__meta">
            <span>{formatDate(getPostDate(post))}</span>
            {post.readTime ? <span>{post.readTime} min read</span> : null}
          </div>

          {gallery.length > 0 && (
            <div className="gallery">
              <p className="gallery__title">Gallery</p>
              <div className="gallery__grid">
                {gallery.map((item, index) => (
                  <button
                    className="gallery__item"
                    key={index}
                    type="button"
                    onClick={() => setLightbox(item.data)}
                  >
                    <img src={item.data} alt={`${post.title} — ${index + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="presentation">
          <img src={lightbox} alt="Full size" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </motion.div>
  );
}
