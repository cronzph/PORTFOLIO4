import { useId } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from './Icon';
import { ABOUT } from '../data/about';
import { PROFILE } from '../data/site';
import useModalDismiss from '../hooks/useModalDismiss';

const EASE = [0.22, 1, 0.36, 1];

/** The short profile card: photo, one line of intro, resume and contact. */
export default function ProfileModal({ onClose }) {
  const panelRef = useModalDismiss(onClose);
  const titleId = useId();

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
        className="modal__panel profile-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={panelRef}
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.99 }}
        transition={{ duration: 0.38, ease: EASE }}
      >
        <button className="modal__close" type="button" onClick={onClose} aria-label="Close">
          <Icon name="close" size={16} />
        </button>

        <div className="profile-modal__body">
          <figure className="profile-modal__photo">
            <img src={PROFILE.photo} alt={`Portrait of ${PROFILE.name}`} />
            <figcaption className="profile-modal__tag">
              <span className="profile-modal__dot" />
              {PROFILE.handle} · {PROFILE.location}
            </figcaption>
          </figure>

          <p className="eyebrow">{ABOUT.eyebrow}</p>
          <h2 className="profile-modal__title" id={titleId}>
            {ABOUT.title}
          </h2>
          <p className="profile-modal__lede">{ABOUT.lede}</p>

          <div className="profile-modal__actions">
            <a className="btn btn--dark btn--sm" href={PROFILE.resume} download>
              <Icon name="download" size={14} />
              Download resume
            </a>
            <Link className="btn btn--ghost btn--sm" to="/#contact" onClick={onClose}>
              Work with me
              <Icon name="arrow" size={14} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
