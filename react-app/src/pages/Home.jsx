import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import ToolStrip from '../components/ToolStrip';
import MobileHome from '../components/mobile/MobileHome';
import ProfileModal from '../components/ProfileModal';
import ProjectsCard from '../components/bento/ProjectsCard';
import AboutCard from '../components/bento/AboutCard';
import AiBuildsCard from '../components/bento/AiBuildsCard';
import CredentialsCard from '../components/bento/CredentialsCard';
import ServicesCard from '../components/bento/ServicesCard';
import TestimonialsCard from '../components/bento/TestimonialsCard';
import ContactSection from '../components/ContactSection';
import PostModal from '../components/post/PostModal';
import { PROFILE } from '../data/site';
import { usePosts } from '../hooks/usePosts';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle(`${PROFILE.name} — ${PROFILE.role}`);

  const { featuredProjects, loading, error } = usePosts();
  const [selected, setSelected] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <PageTransition>
      <MobileHome onOpenProfile={() => setProfileOpen(true)} />
      <Hero />
      <ToolStrip />

      {error && (
        <p className="notice notice--err">
          Firebase read failed: {error}. Check your Realtime Database rules.
        </p>
      )}

      <section className="board" aria-label="Portfolio overview">
        <ProjectsCard
          projects={featuredProjects}
          loading={loading}
          onOpen={setSelected}
        />
        <AboutCard />
        <AiBuildsCard />
        <CredentialsCard />
        <ServicesCard />
        <TestimonialsCard />
      </section>

      <ContactSection />

      <footer className="page-foot">
        <span>Built with React, Firebase and Framer Motion.</span>
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
      </footer>

      <AnimatePresence>
        {selected && (
          <PostModal post={selected} onClose={() => setSelected(null)} page="home" />
        )}
      </AnimatePresence>

      {createPortal(
        <AnimatePresence>
          {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}
        </AnimatePresence>,
        document.body
      )}
    </PageTransition>
  );
}
