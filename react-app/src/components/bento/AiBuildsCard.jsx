import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import BentoCard from './BentoCard';
import Icon from '../Icon';
import BuildModal from '../build/BuildModal';
import { AI_BUILDS } from '../../data/site';

export default function AiBuildsCard() {
  const [selected, setSelected] = useState(null);

  return (
    <BentoCard className="card--ai span-3" delay={0.15} id="automation">
      <div className="card__head">
        <span className="card__icon">
          <Icon name="bolt" size={16} />
        </span>
        <div>
          <h2 className="card__title">AI builds</h2>
          <p className="card__sub">Automations I built, not just used.</p>
        </div>
      </div>

      <ul className="builds">
        {AI_BUILDS.map((item) => (
          <li key={item.id}>
            <button
              className="build"
              type="button"
              onClick={() => setSelected(item)}
              style={{ '--dot': item.dot }}
              aria-label={`${item.name} — open details`}
            >
              <span className="build__dot" aria-hidden="true" />
              <span className="build__name">{item.name}</span>
              <span className="build__status">{item.status}</span>
              <Icon name="arrow" size={12} className="build__arrow" />
            </button>
          </li>
        ))}
      </ul>

      <p className="card__note">Built, documented, then handed over with the keys.</p>

      {/* Rendered in a portal so the card's hover transform cannot trap the fixed overlay. */}
      {createPortal(
        <AnimatePresence>
          {selected && <BuildModal build={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>,
        document.body
      )}
    </BentoCard>
  );
}
