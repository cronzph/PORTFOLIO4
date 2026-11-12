import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { get, push, ref as dbRef, remove, set } from 'firebase/database';
import { auth, db } from '../lib/firebase';
import { PROFILE } from '../data/site';
import { getPostDate, getPostImage, usePosts } from '../hooks/usePosts';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatShortDate } from '../utils/format';
import LoginForm from '../components/admin/LoginForm';
import PostForm from '../components/admin/PostForm';
import HighlightsPanel from '../components/admin/HighlightsPanel';
import CategoriesPanel from '../components/admin/CategoriesPanel';
import Icon from '../components/Icon';

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'categories', label: 'Categories' },
];

function friendlyError(error) {
  const message = error?.message || 'Something went wrong.';
  if (/permission_denied|PERMISSION_DENIED/i.test(message)) {
    return 'Permission denied. Add your UID under admins/ in the Realtime Database, then publish database.rules.json.';
  }
  return message;
}

export default function Admin() {
  useDocumentTitle(`Admin — ${PROFILE.name}`);

  const [user, setUser] = useState(undefined); // undefined = still checking

  useEffect(() => onAuthStateChanged(auth, (nextUser) => setUser(nextUser)), []);

  if (user === undefined) {
    return (
      <div className="admin">
        <div className="loader">
          <div className="spinner" />
          <p>Checking session…</p>
        </div>
      </div>
    );
  }

  if (!user) return <LoginForm />;

  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  const { projects, blogPosts, categories, highlights, loading, error } = usePosts();

  const [tab, setTab] = useState('projects');
  const [editing, setEditing] = useState(null); // { post, type }
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const list = tab === 'projects' ? projects : blogPosts;

  const notify = (text, kind = 'ok') => setNotice({ text, kind });

  const switchTab = (nextTab) => {
    setTab(nextTab);
    setEditing(null);
  };

  const startNew = () => {
    setEditing({ post: null, type: tab === 'projects' ? 'project' : 'blog' });
  };

  const savePost = async (payload, id) => {
    setBusy(true);
    try {
      if (id) {
        await set(dbRef(db, `posts/${id}`), payload);
        notify('Post updated.');
      } else {
        const created = push(dbRef(db, 'posts'));
        await set(created, payload);
        notify('Post published.');
      }
      setEditing(null);
    } catch (err) {
      notify(friendlyError(err), 'err');
    } finally {
      setBusy(false);
    }
  };

  const deletePost = async (post) => {
    const confirmed = window.confirm(`Delete "${post.title}"? This cannot be undone.`);
    if (!confirmed) return;

    setBusy(true);
    try {
      await remove(dbRef(db, `posts/${post.id}`));

      // Drop any highlight pointing at the deleted post.
      const snapshot = await get(dbRef(db, 'highlights'));
      const cleanups = [];
      snapshot.forEach((child) => {
        if (child.val()?.postId === post.id) cleanups.push(remove(child.ref));
      });
      await Promise.all(cleanups);

      setEditing(null);
      notify('Post deleted.');
    } catch (err) {
      notify(friendlyError(err), 'err');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin">
      <div className="admin__bar">
        <div className="admin__brand">
          <span>M</span>
          Portfolio admin
        </div>

        <div className="admin__user">
          <Link className="btn btn--ghost btn--sm" to="/">
            View site
          </Link>
          <span>{user.email}</span>
          <button className="btn btn--ghost btn--sm" type="button" onClick={() => signOut(auth)}>
            <Icon name="logout" size={13} />
            Sign out
          </button>
        </div>
      </div>

      <div className="admin__body">
        <div className="admin-head">
          <div>
            <h1 className="admin-title">Content</h1>
            <p className="admin-sub">
              {projects.length} projects · {blogPosts.length} blog posts ·{' '}
              {categories.length} categories
            </p>
          </div>

          {(tab === 'projects' || tab === 'blog') && (
            <button className="btn btn--dark btn--sm" type="button" onClick={startNew}>
              <Icon name="plus" size={13} />
              New {tab === 'projects' ? 'project' : 'post'}
            </button>
          )}
        </div>

        <div className="tabs" role="tablist">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={`tab${tab === item.id ? ' is-on' : ''}`}
              onClick={() => switchTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {notice && (
          <p className={`notice${notice.kind === 'err' ? ' notice--err' : ''}`}>{notice.text}</p>
        )}
        {error && <p className="notice notice--err">Firebase read failed: {error}</p>}

        {tab === 'highlights' && (
          <HighlightsPanel projects={projects} highlights={highlights} onNotice={notify} />
        )}

        {tab === 'categories' && (
          <CategoriesPanel categories={categories} onNotice={notify} />
        )}

        {(tab === 'projects' || tab === 'blog') && (
          <div className="admin-grid">
            <section className="panel">
              <div className="panel__head">
                <p className="panel__title">{tab}</p>
                <span className="admin-row__meta">{list.length}</span>
              </div>

              {loading ? (
                <div className="loader" style={{ padding: 24 }}>
                  <div className="spinner" />
                </div>
              ) : list.length === 0 ? (
                <p className="hint">Nothing here yet. Create the first one.</p>
              ) : (
                <div className="admin-list">
                  {list.map((post) => {
                    const image = getPostImage(post);
                    const active = editing?.post?.id === post.id;

                    return (
                      <button
                        key={post.id}
                        type="button"
                        className={`admin-row${active ? ' is-active' : ''}`}
                        onClick={() =>
                          setEditing({ post, type: tab === 'projects' ? 'project' : 'blog' })
                        }
                      >
                        {image ? (
                          <img className="admin-thumb" src={image} alt="" />
                        ) : (
                          <span className="admin-thumb admin-thumb--empty">none</span>
                        )}
                        <span className="admin-row__text">
                          <span className="admin-row__title">{post.title}</span>
                          <span className="admin-row__meta">
                            {formatShortDate(getPostDate(post))}
                            {post.featured ? ' · featured' : ''}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>

            {editing ? (
              <PostForm
                key={editing.post?.id || `new-${editing.type}`}
                post={editing.post}
                type={editing.type}
                blogCategories={categories}
                busy={busy}
                onSave={savePost}
                onCancel={() => setEditing(null)}
                onDelete={deletePost}
              />
            ) : (
              <section className="panel">
                <p className="panel__title">Editor</p>
                <p className="hint">
                  Pick something on the left to edit, or hit “New {tab === 'projects' ? 'project' : 'post'}”.
                </p>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
