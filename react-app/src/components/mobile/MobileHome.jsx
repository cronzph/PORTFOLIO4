import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { AI_BUILDS, PROFILE, TOOLS } from '../../data/site';

const SHELF = [
  {
    n: '01',
    label: 'Projects',
    to: '/projects',
    title: 'Work that shipped',
    desc: 'Apps, sites and systems, with the details behind each one.',
    icon: 'folder',
    tone: 'cool',
  },
  {
    n: '02',
    label: 'Services',
    to: '/#services',
    title: 'What I build',
    desc: 'Web, mobile, automation and hardware, start to handover.',
    icon: 'layers',
    tone: 'warm',
  },
  {
    n: '03',
    label: 'About',
    to: '/about',
    title: 'Who you are hiring',
    desc: 'How I work, what I use, and where I came from.',
    icon: 'user',
    tone: 'cool',
  },
  {
    n: '04',
    label: 'AI builds',
    to: '/#automation',
    title: 'Automations',
    desc: 'Tools I built for myself, not just used.',
    icon: 'bolt',
    tone: 'warm',
  },
];

const STATS = [
  { icon: 'layers', value: TOOLS.length, label: 'Tools' },
  { icon: 'bolt', value: AI_BUILDS.length, label: 'AI builds' },
  { icon: 'clock', value: 'GMT+8', label: 'Time zone' },
];

const initials = (name) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/** The phone home screen. Hidden from 901px up; the desktop hero takes over. */
export default function MobileHome({ onOpenProfile }) {
  return (
    <div className="mhome">
      <header className="mhead">
        <button className="mhead__avatar" type="button" onClick={onOpenProfile} aria-label="Open profile card">
          <img src={PROFILE.photo} alt={`Portrait of ${PROFILE.name}`} />
        </button>

        <div className="mhead__who">
          <p className="mhead__name">
            {PROFILE.name}
            {PROFILE.available && <span className="mhead__dot" title="Available for work" />}
          </p>
          <p className="mhead__meta">
            {PROFILE.handle} · {PROFILE.role}
          </p>
        </div>
      </header>

      <h1 className="mhome__title">
        <span>{PROFILE.headline.solid}</span>
        <span className="mhome__title-soft">{PROFILE.headline.soft}</span>
      </h1>

      <p className="mhome__lede">{PROFILE.lede}</p>

      <ul className="mstats">
        {STATS.map((stat) => (
          <li key={stat.label}>
            <Icon name={stat.icon} size={16} className="mstats__icon" />
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>

      <section className="msec" aria-label="Tools">
        <h2 className="msec__title">Tools I work with</h2>
        <div className="mrail">
          <div className="mrail__track">
            {[0, 1].map((copy) => (
              <div className="mrail__group" key={copy} aria-hidden={copy > 0 || undefined}>
                {TOOLS.map((tool) => (
                  <div className="mtool" key={tool.name} style={{ '--dot': tool.dot }}>
                    {tool.icon ? (
                      <span className="mtool__glyph mtool__glyph--logo">
                        <img src={`/icons/${tool.icon}.svg`} alt="" width="30" height="30" />
                      </span>
                    ) : (
                      <span className="mtool__glyph">{initials(tool.name)}</span>
                    )}
                    <span className="mtool__name">{tool.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="msec" aria-label="Explore">
        <h2 className="msec__title">Explore</h2>
        <div className="mshelf">
          {SHELF.map((item) => (
            <Link className={`mtile mtile--${item.tone}`} to={item.to} key={item.label}>
              <span className="mtile__media">
                <Icon name={item.icon} size={34} />
              </span>
              <span className="mtile__label">
                {item.n} {item.label}
              </span>
              <span className="mtile__title">{item.title}</span>
              <span className="mtile__desc">{item.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
