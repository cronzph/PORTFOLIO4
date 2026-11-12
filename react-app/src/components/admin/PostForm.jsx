import { useMemo, useState } from 'react';
import { CATEGORIES } from '../../data/site';
import { fromDateInput, toDateInput } from '../../utils/format';
import { ImageUploader, GalleryUploader } from './ImageUploader';
import Icon from '../Icon';

const blank = {
  title: '',
  description: '',
  content: '',
  categories: [],
  category: '',
  liveUrl: '',
  repoUrl: '',
  tags: '',
  readTime: '',
  featured: false,
  bannerImage: null,
  images: [],
};

export default function PostForm({ post, type, blogCategories, onSave, onCancel, onDelete, busy }) {
  const [draft, setDraft] = useState(() => {
    if (!post) return { ...blank };

    return {
      title: post.title || '',
      description: post.description || '',
      content: post.content || '',
      categories: Array.isArray(post.categories) ? post.categories : post.category ? [post.category] : [],
      category: post.category || '',
      liveUrl: post.liveUrl || '',
      repoUrl: post.repoUrl || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      readTime: post.readTime || '',
      featured: post.featured === true,
      bannerImage: post.bannerImage?.data ? post.bannerImage : null,
      images: Array.isArray(post.images) ? post.images.filter((image) => image?.data) : [],
    };
  });

  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt || post?.createdAt || Date.now()
  );
  const [error, setError] = useState('');

  const set = (field) => (event) => {
    const value = event?.target ? event.target.value : event;
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const toggleCategory = (category) => {
    setDraft((current) => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter((item) => item !== category)
        : [...current.categories, category],
    }));
  };

  const wordCount = useMemo(
    () => draft.content.trim().split(/\s+/).filter(Boolean).length,
    [draft.content]
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!draft.title.trim()) {
      setError('A title is required.');
      return;
    }

    const payload = {
      title: draft.title.trim(),
      description: draft.description.trim(),
      content: draft.content,
      blog: type === 'blog',
      type,
      categories: type === 'project' ? draft.categories : [],
      category: type === 'blog' ? draft.category || null : null,
      liveUrl: draft.liveUrl.trim() || null,
      repoUrl: draft.repoUrl.trim() || null,
      tags: draft.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      readTime: draft.readTime ? Number(draft.readTime) : null,
      featured: Boolean(draft.featured),
      bannerImage: draft.bannerImage,
      images: draft.images,
      publishedAt,
      createdAt: post?.createdAt || publishedAt,
      updatedAt: Date.now(),
    };

    setError('');
    onSave(payload, post?.id || null);
  };

  return (
    <form className="post-form panel" onSubmit={handleSubmit}>
      <div className="panel__head">
        <p className="panel__title">
          {post ? 'Editing' : 'New'} {type}
        </p>
        <button className="btn btn--ghost btn--sm" type="button" onClick={onCancel}>
          Close
        </button>
      </div>

      <div className="form-field">
        <label className="label" htmlFor="post-title">
          Title
        </label>
        <input
          id="post-title"
          className="input"
          value={draft.title}
          onChange={set('title')}
          placeholder={type === 'blog' ? 'WSL Ubuntu GUI setup' : 'Smart Medical Box'}
          required
        />
      </div>

      <div className="form-field">
        <label className="label" htmlFor="post-description">
          Short description
        </label>
        <textarea
          id="post-description"
          className="textarea"
          style={{ minHeight: 72 }}
          value={draft.description}
          onChange={set('description')}
          placeholder="One or two lines used on cards and previews."
        />
      </div>

      {type === 'project' ? (
        <div className="form-field">
          <span className="label">Categories</span>
          <div className="chip-picker">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`chip-pick${draft.categories.includes(category) ? ' is-on' : ''}`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="form-grid">
          <div className="form-field">
            <label className="label" htmlFor="post-blog-category">
              Blog category
            </label>
            <select
              id="post-blog-category"
              className="select"
              value={draft.category}
              onChange={set('category')}
            >
              <option value="">Uncategorized</option>
              {blogCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {blogCategories.length === 0 && (
              <p className="hint">Create one in the Categories tab first.</p>
            )}
          </div>

          <div className="form-field">
            <span className="label">Options</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, featured: event.target.checked }))
                }
              />
              Featured on the blog hero
            </label>
          </div>
        </div>
      )}

      <div className="form-grid">
        <div className="form-field">
          <label className="label" htmlFor="post-live">
            Live URL
          </label>
          <input
            id="post-live"
            className="input"
            value={draft.liveUrl}
            onChange={set('liveUrl')}
            placeholder="https://…"
          />
        </div>

        <div className="form-field">
          <label className="label" htmlFor="post-repo">
            Source code URL
          </label>
          <input
            id="post-repo"
            className="input"
            value={draft.repoUrl}
            onChange={set('repoUrl')}
            placeholder="https://github.com/…"
          />
        </div>
      </div>

      <div className="form-grid form-grid--3">
        <div className="form-field">
          <label className="label" htmlFor="post-tags">
            Tags
          </label>
          <input
            id="post-tags"
            className="input"
            value={draft.tags}
            onChange={set('tags')}
            placeholder="react, firebase"
          />
        </div>

        <div className="form-field">
          <label className="label" htmlFor="post-read">
            Read time (min)
          </label>
          <input
            id="post-read"
            className="input"
            type="number"
            min="1"
            value={draft.readTime}
            onChange={set('readTime')}
            placeholder="4"
          />
        </div>

        <div className="form-field">
          <label className="label" htmlFor="post-date">
            Published
          </label>
          <input
            id="post-date"
            className="input"
            type="date"
            value={toDateInput(publishedAt)}
            onChange={(event) => setPublishedAt(fromDateInput(event.target.value))}
          />
        </div>
      </div>

      <ImageUploader
        label="Banner image"
        value={draft.bannerImage}
        onChange={(value) => setDraft((current) => ({ ...current, bannerImage: value }))}
      />

      <GalleryUploader
        values={draft.images}
        onChange={(value) => setDraft((current) => ({ ...current, images: value }))}
      />

      <div className="form-field">
        <label className="label" htmlFor="post-content">
          Content — Markdown or HTML
        </label>
        <textarea
          id="post-content"
          className="textarea"
          rows={14}
          value={draft.content}
          onChange={set('content')}
          placeholder={'## What it does\n\nWrite normally, or paste HTML.\n\nStandalone YouTube / TikTok / Instagram links become embeds automatically.'}
        />
        <p className="hint">
          {wordCount} words · fenced code blocks get a copy button · video links embed
          themselves.
        </p>
      </div>

      {error && <p className="notice notice--err">{error}</p>}

      <div className="form-actions">
        <button className="btn btn--dark btn--sm" type="submit" disabled={busy}>
          <Icon name="save" size={13} />
          {busy ? 'Saving…' : post ? 'Save changes' : 'Publish'}
        </button>

        <button className="btn btn--ghost btn--sm" type="button" onClick={onCancel}>
          Cancel
        </button>

        <span className="form-actions__spacer" />

        {post && (
          <button className="btn btn--danger btn--sm" type="button" onClick={() => onDelete(post)}>
            <Icon name="trash" size={13} />
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
