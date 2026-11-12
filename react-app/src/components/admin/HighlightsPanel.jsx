import { useEffect, useState } from 'react';
import { get, ref as dbRef, remove, set } from 'firebase/database';
import { db } from '../../lib/firebase';
import { CATEGORIES } from '../../data/site';
import Icon from '../Icon';

const keyFor = (category) => category.replace(/[^A-Za-z0-9]/g, '_');

/**
 * Picks which project represents each category on the home slider.
 * Stored in `highlights/{key}` as { category, postId } — the shape the old site used.
 */
export default function HighlightsPanel({ projects, highlights, onNotice }) {
  const [draft, setDraft] = useState(highlights);
  const [saving, setSaving] = useState('');

  useEffect(() => {
    setDraft(highlights);
  }, [highlights]);

  const save = async (category) => {
    setSaving(category);

    try {
      const postId = draft[category];

      if (postId) {
        await set(dbRef(db, `highlights/${keyFor(category)}`), { category, postId });
      } else {
        await remove(dbRef(db, `highlights/${keyFor(category)}`));
      }

      // Clean up any duplicate keys pointing at the same category.
      const snapshot = await get(dbRef(db, 'highlights'));
      const removals = [];
      snapshot.forEach((child) => {
        if (child.val()?.category === category && child.key !== keyFor(category)) {
          removals.push(remove(child.ref));
        }
      });
      await Promise.all(removals);

      onNotice?.(`Featured project saved for ${category}.`);
    } catch (error) {
      onNotice?.(error.message, 'err');
    } finally {
      setSaving('');
    }
  };

  return (
    <section className="panel">
      <div className="panel__head">
        <p className="panel__title">Home slider</p>
      </div>

      <p className="hint" style={{ marginTop: 0 }}>
        One featured project per category. The first three filled in appear in the home slider.
      </p>

      {CATEGORIES.map((category) => (
        <div
          key={category}
          style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <span style={{ flex: '1 1 140px', fontSize: 11.5, color: 'var(--text-soft)' }}>
            {category}
          </span>

          <select
            className="select"
            style={{ flex: '1 1 220px', width: 'auto' }}
            value={draft[category] || ''}
            onChange={(event) =>
              setDraft((current) => ({ ...current, [category]: event.target.value }))
            }
          >
            <option value="">None</option>
            {projects
              .filter((project) =>
                (Array.isArray(project.categories) ? project.categories : [project.category])
                  .filter(Boolean)
                  .some((item) => item.toLowerCase() === category.toLowerCase())
              )
              .map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
          </select>

          <button
            className="btn btn--ghost btn--sm"
            type="button"
            onClick={() => save(category)}
            disabled={saving === category}
          >
            <Icon name="save" size={13} />
            {saving === category ? 'Saving…' : 'Save'}
          </button>
        </div>
      ))}
    </section>
  );
}
