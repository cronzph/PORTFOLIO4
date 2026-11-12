import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppShell from './components/AppShell';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';

// The admin panel is only downloaded when someone visits /admin.
const Admin = lazy(() => import('./pages/Admin'));

const AdminFallback = (
  <div className="admin">
    <div className="loader">
      <div className="spinner" />
      <p>Loading admin…</p>
    </div>
  </div>
);

/** Scrolls to the hash target on navigation, or back to the top. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    const scrollToTarget = () => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    if (scrollToTarget()) return undefined;

    // The target may mount a frame later when navigating from another page.
    const timer = setTimeout(scrollToTarget, 140);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route
            path="/admin"
            element={
              <Suspense fallback={AdminFallback}>
                <Admin />
              </Suspense>
            }
          />

          <Route element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
