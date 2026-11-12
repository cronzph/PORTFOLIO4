import { motion } from 'framer-motion';
import { PROFILE } from '../data/site';
import Icon from './Icon';

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Hero() {
  return (
    <header className="hero" id="home">
      <motion.div className="hero__text" variants={container} initial="hidden" animate="show">
        <h1 className="hero__title">
          <motion.span variants={item}>{PROFILE.headline.solid}</motion.span>{' '}
          <motion.span className="hero__title-soft" variants={item}>
            {PROFILE.headline.soft}
          </motion.span>
        </h1>

        <motion.p className="hero__lede" variants={item}>
          {PROFILE.lede}
        </motion.p>
      </motion.div>

      <motion.a
        className="btn btn--dark"
        href="#contact"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        Get in touch
        <Icon name="arrow" size={15} />
      </motion.a>
    </header>
  );
}
