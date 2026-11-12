/**
 * One inline SVG set for the whole app.
 * Usage: <Icon name="folder" size={16} />
 * Brand marks (github / linkedin / facebook) are filled; the rest are stroked.
 */

const PATHS = {
  home: (
    <>
      <path d="M4 10.6 12 4l8 6.6V19a1.4 1.4 0 0 1-1.4 1.4H5.4A1.4 1.4 0 0 1 4 19z" />
      <path d="M9.6 20.4v-6h4.8v6" />
    </>
  ),
  folder: (
    <path d="M3.6 7.6A1.6 1.6 0 0 1 5.2 6h3.6l2 2.4h8A1.6 1.6 0 0 1 20.4 10v7.4a1.6 1.6 0 0 1-1.6 1.6H5.2a1.6 1.6 0 0 1-1.6-1.6z" />
  ),
  note: (
    <>
      <path d="M6.4 3.8h7l4.2 4.2v12.2H6.4z" />
      <path d="M13.4 3.9v4.3h4.2" />
      <path d="M9 12.6h6M9 16.2h4.4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8.5 4.6L12 12.7 3.5 8.1z" />
      <path d="m4.4 12.4 7.6 4.1 7.6-4.1" />
      <path d="m4.4 16.6 7.6 4.1 7.6-4.1" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.4" r="3.6" />
      <path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0" />
    </>
  ),
  mail: (
    <>
      <rect x="3.4" y="5.6" width="17.2" height="12.8" rx="2.4" />
      <path d="m4.4 7.4 7.6 5.4 7.6-5.4" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.4 5.4l1.4 1.4M17.2 17.2l1.4 1.4M18.6 5.4l-1.4 1.4M6.8 17.2l-1.4 1.4" />
    </>
  ),
  moon: <path d="M20 14.4A8.6 8.6 0 0 1 9.6 4a8.6 8.6 0 1 0 10.4 10.4z" />,
  arrow: <path d="M4.6 12h14.2M13.2 6.4 18.8 12l-5.6 5.6" />,
  download: <path d="M12 4v10.4M7.8 10.6 12 14.8l4.2-4.2M4.8 19.4h14.4" />,
  check: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m8.2 12.3 2.6 2.6 5-5.2" />
    </>
  ),
  bolt: <path d="M13.2 3 5.6 13.6h5.4L10 21l7.6-10.6h-5.4z" />,
  star: <path d="m12 4 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />,
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4l-8.4 8.4" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.4" />
      <path d="m15.8 15.8 4.4 4.4" />
    </>
  ),
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  trash: (
    <>
      <path d="M4.8 6.6h14.4" />
      <path d="M9.4 6.6V4.8h5.2v1.8" />
      <path d="m6.6 6.6.8 13.2h9.2l.8-13.2" />
      <path d="M10.2 10.2v6M13.8 10.2v6" />
    </>
  ),
  edit: (
    <>
      <path d="m4 20 4.2-1 10-10a2.1 2.1 0 0 0-3-3l-10 10z" />
      <path d="m13.6 5.8 4.6 4.6" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4.2 7.2h15.6M4.2 12h15.6M4.2 16.8h15.6" />,
  more: (
    <>
      <circle cx="12" cy="5.6" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="18.4" r="1.5" />
    </>
  ),
  logout: (
    <>
      <path d="M9.4 4.6H5.4a1.4 1.4 0 0 0-1.4 1.4v12a1.4 1.4 0 0 0 1.4 1.4h4" />
      <path d="M15.6 8.4 19.2 12l-3.6 3.6" />
      <path d="M9.6 12h9.4" />
    </>
  ),
  image: (
    <>
      <rect x="3.6" y="4.6" width="16.8" height="14.8" rx="2" />
      <circle cx="9" cy="9.8" r="1.5" />
      <path d="m4.8 17.6 4.8-4.8 3.4 3.4 2.4-2.2 3.8 3.8" />
    </>
  ),
  upload: <path d="M12 15.4V4.6M8 8.6 12 4.6l4 4M4.8 19.4h14.4" />,
  save: (
    <>
      <path d="M5.6 4.6h10.2l3 3v11.8H5.6z" />
      <path d="M9 4.6v4.4h5.4V4.6" />
      <rect x="9" y="13.4" width="6" height="5.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.4V12l3 1.8" />
    </>
  ),
  code: <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />,
  phone: (
    <>
      <rect x="7" y="2.8" width="10" height="18.4" rx="2.4" />
      <path d="M10.6 5.6h2.8M11 18.4h2" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 3.4v3.6M14 3.4v3.6M10 17v3.6M14 17v3.6M3.4 10H7M3.4 14H7M17 10h3.6M17 14h3.6" />
    </>
  ),
  wrench: (
    <path d="M20.2 6.4a5 5 0 0 1-6.6 6.4l-7 7a2 2 0 0 1-2.8-2.8l7-7a5 5 0 0 1 6.4-6.6l-3 3 .4 2.6 2.6.4z" />
  ),
  github: (
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z" />
  ),
  facebook: (
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3-.04-1.3-.13-2.45-.13-2.42 0-4.08 1.48-4.08 4.2v2.34H7.4V13h2.77v8z" />
  ),
};

const FILLED = new Set(['github', 'linkedin', 'facebook', 'more']);

export default function Icon({ name, size = 18, className = '', style, ...rest }) {
  const path = PATHS[name];
  if (!path) return null;

  const filled = FILLED.has(name);

  return (
    <svg
      className={`icon ${className}`.trim()}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ width: size, height: size, ...style }}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? 0 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {path}
    </svg>
  );
}
