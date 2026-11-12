import { motion } from 'framer-motion';
import { CAT_COLORS } from '../../data/site';
import { getPostCategories, getPostDate, getPostImage } from '../../hooks/usePosts';
import { stripHtml, truncate } from '../../utils/stripHtml';
import { formatShortDate } from '../../utils/format';
import ProjectLinks from './ProjectLinks';

export default function PostCard({ post, onOpen, delay = 0 }) {
  const categories = getPostCategories(post);
  const image = getPostImage(post);
  const description = stripHtml(post.description || post.excerpt || post.content);

  return (
    <motion.article
      className="post-card"
      onClick={() => onOpen(post)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(post);
        }
      }}
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="post-card__banner">
        {image ? (
          <img src={image} alt={post.title} loading="lazy" />
        ) : (
          <div className="post-card__fallback">{categories[0] || 'Project'}</div>
        )}
      </div>

      <div className="post-card__body">
        <div className="cat-row">
          {categories.slice(0, 3).map((category) => {
            const color = CAT_COLORS[category] || '#94a3b8';
            return (
              <span
                className="cat-chip"
                key={category}
                style={{
                  color,
                  background: `${color}1f`,
                  borderColor: `${color}55`,
                }}
              >
                {category}
              </span>
            );
          })}
        </div>

        <h3 className="post-card__title">{post.title}</h3>
        <p className="post-card__desc">{truncate(description, 120)}</p>

        <div className="post-card__meta">
          <span>{formatShortDate(getPostDate(post))}</span>
          <ProjectLinks post={post} />
        </div>
      </div>
    </motion.article>
  );
}
