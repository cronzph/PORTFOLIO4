import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../Icon';
import { PROFILE } from '../../data/site';
import { useTheme } from '../../context/ThemeContext';

/** The "..." button in the phone header: theme and résumé, nothing else. */
export default function QuickMenu() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="qmenu" ref={rootRef}>
      <button
        className="qmenu__button"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="More options"
        aria-expanded={open}
      >
        <Icon name="more" size={18} />
      </button>

      {open && (
        <motion.div
          className="qmenu__panel"
          initial={{ opacity: 0, scale: 0.94, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <button className="qmenu__row" type="button" onClick={toggle} role="switch" aria-checked={theme === 'dark'}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            <span className="qmenu__switch" aria-hidden="true" />
          </button>

          <a className="qmenu__row" href={PROFILE.resume} download>
            <Icon name="download" size={17} />
            <span>Résumé</span>
          </a>

          <a className="qmenu__row" href={`mailto:${PROFILE.email}`}>
            <Icon name="mail" size={17} />
            <span>{PROFILE.email}</span>
          </a>
        </motion.div>
      )}
    </div>
  );
}
