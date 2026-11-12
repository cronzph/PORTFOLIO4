import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import PostCard from '../components/post/PostCard';
import PostModal from '../components/post/PostModal';
import Icon from '../components/Icon';
import { CATEGORIES, PROFILE } from '../data/site';
import { getPostCategories, getPostDate, usePosts } from '../hooks/usePosts';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const SORTS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title', label: 'Title A–Z' },
];

export default function Projects() {
  useDocumentTitle(`Projects — ${PROFILE.name}`);

  const { projects, loading, error } = usePosts();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [selected, setSelected] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('cat') || '';

  const setCategory = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('cat', value);
    else next.delete('cat');
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    let list = projects;

    if (query) {
      list = list.filter(
        (post) =>
          (post.title || '').toLowerCase().includes(query) ||
          (post.description || '').toLowerCase().includes(query) ||
          getPostCategories(post).some((item) => item.toLowerCase().includes(query))
      );
    }

    if (category) {
      list = list.filter((post) =>
        getPostCategories(post).some((item) => item.toLowerCase() === category.toLowerCase())
      );
    }

    const sorted = [...list];

    if (sort === 'oldest') sorted.sort((a, b) => getPostDate(a) - getPostDate(b));
    else if (sort === 'title') sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    else sorted.sort((a, b) => getPostDate(b) - getPostDate(a));

    return sorted;
  }, [projects, search, category, sort]);

  const hasFilters = Boolean(search || category || sort !== 'newest');

  const clearFilters = () => {
    setSearch('');
    setSort('newest');
    setCategory('');
  };

  return (
    <PageTransition>
      <header className="page-head">
        <div>
          <p className="eyebrow">Work</p>
          <h1 className="page-title">All projects</h1>
          <p className="page-sub">
            Web apps, mobile builds, IoT systems and automation — every one of them shipped.
          </p>
        </div>
        <Link className="btn btn--ghost btn--sm" to="/#contact">
          Start a project
          <Icon name="arrow" size={14} />
        </Link>
      </header>

      <div className="filters">
        <label className="sr-only" htmlFor="project-search">
          Search projects
        </label>
        <input
          id="project-search"
          className="input"
          type="search"
          placeholder="Search projects…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <label className="sr-only" htmlFor="project-category">
          Filter by category
        </label>
        <select
          id="project-category"
          className="select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="project-sort">
          Sort projects
        </label>
        <select
          id="project-sort"
          className="select"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          {SORTS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button className="btn btn--ghost btn--sm" type="button" onClick={clearFilters}>
            Clear
          </button>
        )}

        <span className="filters__count">
          {loading ? 'Loading…' : `${filtered.length} of ${projects.length}`}
        </span>
      </div>

      {error && <p className="notice notice--err">Firebase read failed: {error}</p>}

      {loading ? (
        <div className="loader">
          <div className="spinner" />
          <p>Loading projects…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No projects found</h3>
          <p>Try a different search or category.</p>
        </div>
      ) : (
        <div className="post-grid">
          {filtered.map((post, index) => (
            <PostCard key={post.id} post={post} onOpen={setSelected} delay={index * 0.04} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <PostModal post={selected} onClose={() => setSelected(null)} page="projects" />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
