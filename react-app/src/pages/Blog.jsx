import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import PostModal from '../components/post/PostModal';
import Icon from '../components/Icon';
import { PROFILE } from '../data/site';
import { getPostDate, getPostImage, usePosts } from '../hooks/usePosts';
import { stripHtml, truncate } from '../utils/stripHtml';
import { formatShortDate } from '../utils/format';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function BlogMini({ post, onOpen }) {
  const image = getPostImage(post);

  return (
    <motion.article
      className="blog-mini"
      onClick={() => onOpen(post)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="blog-mini__thumb">
        {image ? <img src={image} alt={post.title} loading="lazy" /> : null}
      </div>
      <div className="blog-mini__body">
        <h4 className="blog-mini__title">{post.title}</h4>
        <p className="blog-mini__excerpt">
          {truncate(stripHtml(post.excerpt || post.description || ''), 80)}
        </p>
        <span className="blog-mini__date">{formatShortDate(getPostDate(post))}</span>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  useDocumentTitle(`Blog — ${PROFILE.name}`);

  const { blogPosts, categories, featuredBlog, loading, error } = usePosts();
  const [selected, setSelected] = useState(null);

  const rows = useMemo(() => {
    const grouped = [];

    categories.forEach((category) => {
      const matching = blogPosts.filter((post) => post.category === category.id);
      if (matching.length) grouped.push({ label: category.name, posts: matching });
    });

    const groupedIds = new Set(grouped.flatMap((row) => row.posts.map((post) => post.id)));
    const rest = blogPosts.filter((post) => !groupedIds.has(post.id));
    if (rest.length) grouped.push({ label: 'latest', posts: rest });

    return grouped;
  }, [blogPosts, categories]);

  const heroTags = featuredBlog
    ? featuredBlog.tags?.length
      ? featuredBlog.tags.slice(0, 3)
      : categories.filter((category) => category.id === featuredBlog.category).map((c) => c.name)
    : [];

  return (
    <PageTransition>
      <header className="page-head">
        <div>
          <p className="eyebrow">System log</p>
          <h1 className="page-title">Dev blog</h1>
          <p className="page-sub">
            Field notes, build logs and tech deep-dives from the grind.
          </p>
        </div>
        <span className="filters__count">
          {loading ? 'Loading…' : `${blogPosts.length} ${blogPosts.length === 1 ? 'post' : 'posts'}`}
        </span>
      </header>

      {error && <p className="notice notice--err">Firebase read failed: {error}</p>}

      {loading ? (
        <div className="loader">
          <div className="spinner" />
          <p>Loading posts…</p>
        </div>
      ) : !featuredBlog ? (
        <div className="empty-state">
          <h3>No blog posts yet</h3>
          <p>Write one from the admin panel and it lands here instantly.</p>
        </div>
      ) : (
        <>
          <motion.article
            className="blog-hero"
            onClick={() => setSelected(featuredBlog)}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {getPostImage(featuredBlog) && (
              <img
                className="blog-hero__bg"
                src={getPostImage(featuredBlog)}
                alt=""
                loading="lazy"
              />
            )}

            <div className="blog-hero__content">
              <div className="blog-hero__tags">
                {heroTags.map((tag) => (
                  <span className="blog-hero__tag" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>

              <h2 className="blog-hero__title">{featuredBlog.title}</h2>

              <p className="blog-hero__excerpt">
                {truncate(
                  stripHtml(featuredBlog.excerpt || featuredBlog.description || featuredBlog.content),
                  200
                )}
              </p>

              <div className="blog-hero__meta">
                <span>{formatShortDate(getPostDate(featuredBlog))}</span>
                {featuredBlog.readTime ? <span>{featuredBlog.readTime} min read</span> : null}
              </div>

              <span className="blog-hero__cta">
                Read more
                <Icon name="arrow" size={13} />
              </span>
            </div>
          </motion.article>

          <div className="blog-rows">
            {rows.map((row, rowIndex) => (
              <section className="blog-row" key={row.label}>
                <div className="blog-row__head">
                  <h3 className="blog-row__title">#{row.label}</h3>
                  <span className="blog-row__count">
                    {row.posts.length} {row.posts.length === 1 ? 'post' : 'posts'}
                  </span>
                </div>

                <motion.div
                  className="blog-row__scroll"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 * rowIndex, ease: [0.22, 1, 0.36, 1] }}
                >
                  {row.posts.map((post) => (
                    <BlogMini key={post.id} post={post} onOpen={setSelected} />
                  ))}
                </motion.div>
              </section>
            ))}
          </div>
        </>
      )}

      <AnimatePresence>
        {selected && <PostModal post={selected} onClose={() => setSelected(null)} page="blog" />}
      </AnimatePresence>
    </PageTransition>
  );
}
