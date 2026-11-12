import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import BentoCard from './BentoCard';
import Icon from '../Icon';
import ProfileModal from '../ProfileModal';
import { PROFILE } from '../../data/site';

export default function AboutCard() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <BentoCard className="card--about span-3" delay={0.1} id="about">
      <div className="card__head">
        <span className="card__icon">
          <Icon name="user" size={16} />
        </span>
        <div>
          <h2 className="card__title">About</h2>
          <p className="card__sub">Who I am and how I work.</p>
        </div>
        <Link className="card__link" to="/about">
          Full
          <Icon name="arrow" size={12} />
        </Link>
      </div>

      <p className="card__text">{PROFILE.about}</p>

      <button
        className="about-art"
        type="button"
        onClick={() => setProfileOpen(true)}
        aria-label="Open profile card"
      >
        <img src="/about-card.webp" alt="" width="1100" height="978" loading="lazy" />
      </button>

      {/* Portal: the card animates a transform, which would trap a fixed child. */}
      {createPortal(
        <AnimatePresence>
          {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}
        </AnimatePresence>,
        document.body
      )}
    </BentoCard>
  );
}
