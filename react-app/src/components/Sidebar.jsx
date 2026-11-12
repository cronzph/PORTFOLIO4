import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV, PROFILE, SOCIALS } from '../data/site';
import { usePosts } from '../hooks/usePosts';
import { useTheme } from '../context/ThemeContext';
import Icon from './Icon';
import ProfileModal from './ProfileModal';

export default function Sidebar() {
  const { theme, toggle } = useTheme();
  const { counts } = usePosts();
  const location = useLocation();
  const asideRef = useRef(null);
  const syncRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);

  // The sidebar is the reference height. Its bottom must sit level with the
  // board's bottom, at any window size and whatever the board grows to once
  // Firebase data arrives. On the home page the sidebar is static and as tall
  // as that match needs; elsewhere it stays a sticky full-height card.
  useLayoutEffect(() => {
    const aside = asideRef.current;
    if (!aside) return undefined;

    const board = document.querySelector('.board');
    if (!board) return undefined;

    let frame = 0;

    const sync = () => {
      frame = 0;

      // Matching heights only works while the sidebar sits beside the board.
      // At 1024px and below the shell is one column and the sidebar is hidden,
      // so growing it would push the board down and move the target again —
      // the page then grows without bound.
      const sideBySide =
        board.getBoundingClientRect().top <= aside.getBoundingClientRect().bottom - 1;

      if (!sideBySide) {
        aside.style.minHeight = '';
        return;
      }

      // Layout offsets, not rects: the page entrance animation translates the
      // page for 400ms and a rect would include that. The board's offsetParent
      // changes while the animation runs, so walk the chain up to the shell.
      const shell = aside.offsetParent || document.body;
      let boardTop = 0;
      for (let node = board; node && node !== shell; node = node.offsetParent) {
        boardTop += node.offsetTop;
      }

      const next = Math.ceil(boardTop + board.offsetHeight - aside.offsetTop);
      const current = Math.round(parseFloat(aside.style.minHeight) || 0);

      if (Math.abs(next - current) < 1) return;
      aside.style.minHeight = `${next}px`;
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(sync);
    };

    sync();
    syncRef.current = sync;

    // Watching the board too: projects load after mount and make it taller.
    const observer = new ResizeObserver(schedule);
    observer.observe(board);
    observer.observe(aside);

    // Anything above the board that changes height moves it. The tools strip
    // gets a little shorter when the web font swaps in, which shifts the board
    // up without resizing it.
    document.querySelectorAll('.hero, .toolbar').forEach((el) => observer.observe(el));

    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);

    // The web font swaps in after mount and changes the hero's height, which
    // moves the board without resizing it. Re-measure once fonts settle.
    if (document.fonts?.ready) {
      document.fonts.ready.then(schedule).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(frame);
      syncRef.current = null;
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', schedule);
      aside.style.minHeight = '';
    };
  }, [location.pathname]);

  // Re-measure after every render. Firebase data lands in one commit that
  // changes the board, and that first change can happen before the
  // ResizeObserver's first delivery, so it would otherwise go unnoticed.
  useEffect(() => {
    syncRef.current?.();
  });

  const isHome = location.pathname === '/';

  const isActive = (item) => {
    if (item.to.startsWith('/#')) return isHome && location.hash === item.to.slice(1);
    if (item.to === '/') return isHome && !location.hash;
    return location.pathname === item.to;
  };

  const badgeFor = (item) => {
    if (item.to === '/projects' && counts.projects) return counts.projects;
    if (item.to === '/blog' && counts.posts) return counts.posts;
    return null;
  };

  return (
    <aside className={`sidebar${isHome ? ' sidebar--board' : ''}`} ref={asideRef}>
      <div className="sidebar__top">
        <div className="profile">
          <button
            className="profile__avatar"
            type="button"
            onClick={() => setProfileOpen(true)}
            aria-label="Open profile card"
          >
            <img src={PROFILE.photo} alt={`Portrait of ${PROFILE.name}`} width="112" height="112" />
          </button>
          <div className="profile__meta">
            <p className="profile__name">
              {PROFILE.name}
              {PROFILE.available && <span className="profile__status" title="Available for work" />}
            </p>
            <p className="profile__handle">{PROFILE.handle}</p>
          </div>
        </div>

        <div className="socials">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              className={`social social--${social.icon}`}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
            >
              <Icon name={social.icon} size={19} />
            </a>
          ))}

          <motion.button
            className="social social--theme"
            type="button"
            onClick={toggle}
            whileTap={{ scale: 0.9, rotate: -15 }}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
          </motion.button>
        </div>

        <nav className="nav" aria-label="Sections">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`nav__link${isActive(item) ? ' is-active' : ''}`}
            >
              <Icon name={item.icon} size={17} />
              <span>{item.label}</span>
              {badgeFor(item) ? <span className="nav__badge">{badgeFor(item)}</span> : null}
            </Link>
          ))}
        </nav>
      </div>

      <div className="sidebar__bottom">
        <img className="sidebar__mark" src={PROFILE.photo} alt="" width="30" height="30" />
        <p className="copyright">
          &copy; 2026 {PROFILE.name}.
          <br />
          All rights reserved.
        </p>
      </div>

      {/* Portal: the sidebar is sticky/overflowing, a fixed child would clip. */}
      {createPortal(
        <AnimatePresence>
          {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}
        </AnimatePresence>,
        document.body
      )}
    </aside>
  );
}
