/** Strip HTML tags and return plain text (for excerpts). */
export function stripHtml(html) {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
}

/** Shorten plain text to `max` characters without cutting a word in half. */
export function truncate(text, max) {
  const clean = (text || '').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).replace(/\s+\S*$/, '') + '…';
}
