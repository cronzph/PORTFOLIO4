import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BentoCard from './BentoCard';
import Icon from '../Icon';
import { getPostCategories, getPostImage } from '../../hooks/usePosts';
import { stripHtml, truncate } from '../../utils/stripHtml';

const AUTOPLAY_MS = 6000;
const ART_FALLBACKS = ['slide__art--a', 'slide__art--b', 'slide__art--c'];

export default function ProjectsCard({ projects = [], loading = false, onOpen }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = projects.length;

  useEffect(() => {
    if (paused || count < 2) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  useEffect(() => {
    if (index > count - 1) setIndex(0);
  }, [index, count]);

  const current = projects[index];

  return (
    <BentoCard className="card--projects span-6" delay={0.05}>
      <div className="card__head">
        <span className="card__icon">
          <Icon name="folder" size={16} />
        </span>
        <div>
          <h2 className="card__title">Projects</h2>
        </div>
        <Link className="card__link" to="/projects">
          All
          <Icon name="arrow" size={12} />
        </Link>
      </div>

      <div
        className="slider"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence initial={false} mode="wait">
          {current ? (
            <motion.article
              key={current.id}
              className="slide"
              role="button"
              tabIndex={0}
              aria-label={`Open ${current.title}`}
              onClick={() => onOpen?.(current)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onOpen?.(current);
                }
              }}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className={`slide__art ${
                  getPostImage(current) ? '' : ART_FALLBACKS[index % ART_FALLBACKS.length]
                }`}
                style={
                  getPostImage(current)
                    ? { backgroundImage: `url(${getPostImage(current)})` }
                    : undefined
                }
              />
              <p className="slide__kicker">Case study</p>
              <h3 className="slide__title">{current.title}</h3>
              <p className="slide__desc">{truncate(stripHtml(current.description), 110)}</p>
              <div className="slide__tags">
                {getPostCategories(current)
                  .slice(0, 3)
                  .map((category) => (
                    <span key={category}>{category}</span>
                  ))}
              </div>
            </motion.article>
          ) : (
            <motion.article
              key="placeholder"
              className="slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="slide__art slide__art--a" />
              <p className="slide__kicker">{loading ? 'Fetching' : 'Empty'}</p>
              <h3 className="slide__title">
                {loading ? 'Pulling projects from Firebase…' : 'No projects published yet.'}
              </h3>
              <p className="slide__desc">
                {loading ? 'One moment.' : 'Add one from the admin panel and it shows up here.'}
              </p>
            </motion.article>
          )}
        </AnimatePresence>
      </div>

      <div className="dots" role="tablist" aria-label="Featured projects">
        {projects.map((project, i) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            className={`dot${i === index ? ' is-active' : ''}`}
            aria-selected={i === index}
            aria-label={project.title}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </BentoCard>
  );
}
