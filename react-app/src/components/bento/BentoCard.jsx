import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * A bento card with a shared entrance + hover spring.
 * `delay` staggers the six cards on the home board.
 */
export default function BentoCard({ children, className = '', delay = 0, id }) {
  return (
    <motion.article
      id={id}
      className={`card ${className}`.trim()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      whileHover={{ y: -3 }}
    >
      {children}
    </motion.article>
  );
}
