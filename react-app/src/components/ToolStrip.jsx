import { motion } from 'framer-motion';
import { TOOLS } from '../data/site';

// Four identical rows. The track slides by exactly one row width (25% of the
// total), and the three rows left over always cover the strip, so the loop
// never shows a blank gap on wide screens.
const COPIES = [0, 1, 2, 3];

export default function ToolStrip() {
  return (
    <motion.section
      className="toolbar"
      aria-label="Tools I work with"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="toolbar__label">
        <span>Daily drivers</span>
        <strong>Tools I work with</strong>
      </div>

      <span className="toolbar__divider" aria-hidden="true" />

      <div className="toolbar__chips">
        <div className="toolbar__track">
          {COPIES.map((copy) => (
            <div className="toolbar__group" key={copy} aria-hidden={copy > 0 || undefined}>
              {TOOLS.map((tool) => (
                <span
                  key={tool.name}
                  className={`chip${tool.icon ? ' chip--logo' : ''}`}
                  style={{ '--dot': tool.dot }}
                >
                  {tool.icon && (
                    <img
                      className="chip__logo"
                      src={`/icons/${tool.icon}.svg`}
                      alt=""
                      width="18"
                      height="18"
                    />
                  )}
                  {tool.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
