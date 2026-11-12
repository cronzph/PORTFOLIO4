import { useId } from 'react';
import { motion } from 'framer-motion';
import Icon from '../Icon';
import useModalDismiss from '../../hooks/useModalDismiss';

const EASE = [0.22, 1, 0.36, 1];

/** Detail panel for one AI build. Same shell as the project modal. */
export default function BuildModal({ build, onClose }) {
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
        className="modal__panel build-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={panelRef}
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.99 }}
        transition={{ duration: 0.38, ease: EASE }}
      >
        <button className="modal__close" type="button" onClick={onClose} aria-label="Close">
          <Icon name="close" size={16} />
        </button>

        <div className="modal__body build-modal__body">
          <div className="build-modal__top">
            <span className="build-modal__dot" style={{ '--dot': build.dot }} />
            <span className="build-modal__status">{build.status}</span>
          </div>

          <h2 className="modal__title" id={titleId}>
            {build.name}
          </h2>
          <p className="build-modal__tagline">{build.tagline}</p>

          <ul className="build-modal__points">
            {build.points.map((point) => (
              <li key={point}>
                <Icon name="check" size={15} />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="build-modal__stack">
            <p className="build-modal__label">Built with</p>
            <ul className="about-tags">
              {build.stack.map((item) => (
                <li className="about-tag" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="build-modal__note">{build.note}</p>

          {build.repo && (
            <a
              className="btn btn--ghost btn--sm build-modal__repo"
              href={build.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" size={15} />
              View on GitHub
              <Icon name="external" size={13} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
