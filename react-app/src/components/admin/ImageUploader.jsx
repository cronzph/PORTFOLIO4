import { useRef, useState } from 'react';
import { compressImage, dataUrlSizeKb } from '../../utils/image';
import Icon from '../Icon';

/**
 * Single image field. Files are resized + re-encoded in the browser and stored
 * as { data, name, type } — the shape the existing posts already use.
 */
export function ImageUploader({ label = 'Image', value, onChange, hint }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('That file is not an image.');
      return;
    }

    setBusy(true);
    setError('');

    try {
      const result = await compressImage(file, { maxWidth: 1600 });
      onChange(result);
    } catch {
      setError('Could not read that image.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="form-field">
      <span className="label">{label}</span>

      <div className="uploader">
        {value?.data ? (
          <img className="uploader__preview" src={value.data} alt="" />
        ) : (
          <div className="uploader__preview uploader__preview--empty">No image</div>
        )}

        <div className="uploader__actions">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button className="btn btn--ghost btn--sm" type="button" onClick={() => inputRef.current?.click()} disabled={busy}>
              <Icon name="upload" size={13} />
              {busy ? 'Compressing…' : value?.data ? 'Replace' : 'Upload'}
            </button>

            {value?.data && (
              <button className="btn btn--danger btn--sm" type="button" onClick={() => onChange(null)}>
                Remove
              </button>
            )}
          </div>

          <p className="uploader__hint">
            {value?.data
              ? `${value.name || 'image'} · ${dataUrlSizeKb(value.data)} KB`
              : hint || 'JPG, PNG or WebP. Resized to 1600px and compressed automatically.'}
          </p>

          {error && <p className="uploader__hint" style={{ color: 'var(--danger)' }}>{error}</p>}
        </div>
      </div>

      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} hidden />
    </div>
  );
}

/** Multi-image field used for the post gallery. */
export function GalleryUploader({ values = [], onChange }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const handleFiles = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length) return;

    setBusy(true);
    const added = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      try {
        added.push(await compressImage(file, { maxWidth: 1400 }));
      } catch {
        /* skip unreadable file */
      }
    }

    onChange([...values, ...added]);
    setBusy(false);
  };

  const removeAt = (index) => onChange(values.filter((_, i) => i !== index));

  return (
    <div className="form-field">
      <span className="label">Gallery</span>

      {values.length > 0 && (
        <div className="gallery-edit">
          {values.map((image, index) => (
            <div className="gallery-edit__item" key={index}>
              <img src={image.data} alt="" />
              <button
                className="gallery-edit__remove"
                type="button"
                onClick={() => removeAt(index)}
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
        <button className="btn btn--ghost btn--sm" type="button" onClick={() => inputRef.current?.click()} disabled={busy}>
          <Icon name="image" size={13} />
          {busy ? 'Compressing…' : 'Add images'}
        </button>
        <span className="uploader__hint" style={{ alignSelf: 'center' }}>
          {values.length} {values.length === 1 ? 'image' : 'images'}
        </span>
      </div>

      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFiles} hidden />
    </div>
  );
}
