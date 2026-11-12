import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../Icon';

const TABS = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/projects', label: 'Projects', icon: 'folder' },
  { to: '/#contact', label: 'Contact', icon: 'mail', primary: true },
  { to: '/blog', label: 'Blog', icon: 'note' },
  { to: '/about', label: 'About', icon: 'user' },
];

/** Phone-only bottom navigation. The middle slot is the raised contact button. */
export default function TabBar() {
  const location = useLocation();
  const [hidden, setHidden] = useState(false);

  // Tuck the bar away while the page scrolls down, bring it back on the way up.
  useEffect(() => {
    let last = window.scrollY;
    let live = false;

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      if (!live) live = true;
      setHidden(y > last && y > 90);
      last = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = location.pathname === '/';

  const isActive = (item) => {
    if (item.to.startsWith('/#')) return isHome && location.hash === item.to.slice(1);
    if (item.to === '/') return isHome && !location.hash;
    return location.pathname === item.to;
  };

  const activeIndex = TABS.findIndex((item) => isActive(item));
  const pillIndex = TABS[activeIndex]?.primary ? -1 : activeIndex;

  return (
    <nav
      className="tabbar"
      aria-label="Sections"
      data-hidden={hidden || undefined}
      style={{ '--pill': pillIndex }}
    >
      <span className="tabbar__pill" data-off={pillIndex < 0 || undefined} aria-hidden="true" />

      {TABS.map((item) => {
        const active = isActive(item);

        if (item.primary) {
          return (
            <Link
              key={item.label}
              to={item.to}
              className="tabbar__fab"
              aria-label={item.label}
              onClick={() => setHidden(false)}
            >
              <Icon name={item.icon} size={22} />
            </Link>
          );
        }

        return (
          <Link
            key={item.label}
            to={item.to}
            className={`tabbar__tab${active ? ' is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
            onClick={() => setHidden(false)}
          >
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
