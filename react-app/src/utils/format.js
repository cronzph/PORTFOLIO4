/** Date helpers — timestamps in the database are milliseconds. */

export function formatDate(timestamp, options = { year: 'numeric', month: 'long', day: 'numeric' }) {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleDateString('en-US', options);
}

export function formatShortDate(timestamp) {
  return formatDate(timestamp, { month: 'short', day: 'numeric', year: 'numeric' });
}

/** "2026-11-12" for <input type="date"> */
export function toDateInput(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromDateInput(value) {
  if (!value) return Date.now();
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0).getTime();
}
