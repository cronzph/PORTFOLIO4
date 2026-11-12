import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/** Enter animation for a route. Each page mounts fresh, so this is enough. */
export default function PageTransition({ children, className = 'page' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
