import { useState } from 'react';
import { push, ref as dbRef, remove, set, update } from 'firebase/database';
import { db } from '../../lib/firebase';
import Icon from '../Icon';

export default function CategoriesPanel({ categories, onNotice }) {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [busy, setBusy] = useState(false);

  const add = async (event) => {
    event.preventDefault();
    const clean = name.trim();
    if (!clean) return;

    setBusy(true);
    try {
      await set(push(dbRef(db, 'blogCategories')), { name: clean, createdAt: Date.now() });
      setName('');
      onNotice?.('Category added.');
    } catch (error) {
      onNotice?.(error.message, 'err');
    } finally {
      setBusy(false);
    }
  };

  const rename = async (category) => {
    const clean = editingName.trim();
    if (!clean) return;

    setBusy(true);
    try {
      await update(dbRef(db, `blogCategories/${category.id}`), { name: clean });
      setEditingId(null);
      onNotice?.('Category renamed.');
    } catch (error) {
      onNotice?.(error.message, 'err');
    } finally {
      setBusy(false);
    }
  };

  const removeCategory = async (category) => {
    const confirmed = window.confirm(
      `Delete "${category.name}"? Posts in it fall back to the #latest row.`
    );
    if (!confirmed) return;

    setBusy(true);
    try {
      await remove(dbRef(db, `blogCategories/${category.id}`));
      onNotice?.('Category deleted.');
    } catch (error) {
      onNotice?.(error.message, 'err');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="panel">
      <div className="panel__head">
        <p className="panel__title">Blog categories</p>
      </div>

      <form onSubmit={add} style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <input
          className="input"
          style={{ flex: '1 1 180px' }}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="New category name"
        />
        <button className="btn btn--dark btn--sm" type="submit" disabled={busy}>
          <Icon name="plus" size={13} />
          Add
        </button>
      </form>

      {categories.length === 0 ? (
        <p className="hint">No categories yet.</p>
      ) : (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {categories.map((category) => (
            <li
              key={category.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 9px',
                borderRadius: 10,
                background: 'var(--surface-2)',
              }}
            >
              {editingId === category.id ? (
                <>
                  <input
                    className="input"
                    style={{ flex: 1 }}
                    value={editingName}
                    onChange={(event) => setEditingName(event.target.value)}
                  />
                  <button
                    className="btn btn--dark btn--sm"
                    type="button"
                    onClick={() => rename(category)}
                    disabled={busy}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn--ghost btn--sm"
                    type="button"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontSize: 12, fontWeight: 550 }}>{category.name}</span>
                  <button
                    className="btn btn--ghost btn--sm"
                    type="button"
                    onClick={() => {
                      setEditingId(category.id);
                      setEditingName(category.name);
                    }}
                  >
                    <Icon name="edit" size={13} />
                    Rename
                  </button>
                  <button
                    className="btn btn--danger btn--sm"
                    type="button"
                    onClick={() => removeCategory(category)}
                    disabled={busy}
                  >
                    <Icon name="trash" size={13} />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
