// Single line-icon set (24px grid, stroke based) used across the whole app.
const paths = {
  search: 'm21 21-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  heart: 'M12 20s-7-4.5-9-9.2C1.6 7.4 3.8 4 7 4c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.2 0 5.4 3.4 4 6.8C19 15.5 12 20 12 20Z',
  star: 'm12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  chevronDown: 'm6 9 6 6 6-6',
  chevronRight: 'm9 6 6 6-6 6',
  filter: 'M4 6h16M7 12h10M10 18h4',
  compare: 'M8 4v16M16 4v16M4 8h8M12 16h8',
  thumbUp: 'M7 11v9H4v-9h3Zm0 0 4-7c1.5 0 2.5 1 2.2 2.5L12.7 10H19a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7',
  thumbDown: 'M7 13V4H4v9h3Zm0 0 4 7c1.5 0 2.5-1 2.2-2.5L12.7 14H19a2 2 0 0 0 2-2.3l-1.2-6A2 2 0 0 0 17.8 4H7',
  comment: 'M4 5h16v11H9l-5 4V5Z',
  flag: 'M5 21V4m0 1h12l-2 4 2 4H5',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm7 12 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z',
  send: 'M4 12 20 4l-4 16-4-6-8-2Z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Zm-3 9 2.2 2.2L15.5 10',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1M16 4.5a3.5 3.5 0 0 1 0 6.5m2 3.2A5 5 0 0 1 21 19v1',
  chat: 'M4 5h16v10H9l-5 4V5Zm4 4h8m-8 3h5',
  external: 'M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  trash: 'M5 7h14M10 7V4h4v3m-7 0 1 13h8l1-13M10 11v6m4-6v6',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 8a8 8 0 0 1 16 0',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  dashboard: 'M4 4h7v7H4V4Zm9 0h7v4h-7V4Zm0 6h7v10h-7V10ZM4 13h7v7H4v-7Z',
  box: 'm12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12v9M12 12 4 7.5',
  layers: 'm12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-2a7.5 7.5 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-1.7-1L15 3h-4l-.4 2.6a7.5 7.5 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.5 7.5 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.5 7.5 0 0 0 1.7 1L11 21h4l.4-2.6a7.5 7.5 0 0 0 1.7-1l2.4 1 2-3.4-2.1-1.6Z',
  flagReport: 'M5 21V4m0 1h12l-2 4 2 4H5',
  trending: 'm3 17 6-6 4 4 8-8m0 0h-5m5 0v5',
  // category icons
  electronics: 'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm4 15h2',
  computers: 'M5 5h14a1 1 0 0 1 1 1v9H4V6a1 1 0 0 1 1-1Zm-3 13h20',
  fashion: 'M9 3 4 6l2 4 2-1v11h8V9l2 1 2-4-5-3c-.5 1.2-1.7 2-3 2s-2.5-.8-3-2Z',
  home: 'M3 11 12 3l9 8M5 9.5V21h5v-6h4v6h5V9.5',
  gaming: 'M7 8h10a5 5 0 0 1 5 4.5l.5 4a2.5 2.5 0 0 1-4.3 2L16 17H8l-2.2 1.5a2.5 2.5 0 0 1-4.3-2l.5-4A5 5 0 0 1 7 8Zm1 3v3m-1.5-1.5h3M16 12h.01M18 14h.01',
  grocery: 'M3 4h2.5l2 11h10l2-8H6.5M9 20a1 1 0 1 0 0-.01M17 20a1 1 0 1 0 0-.01',
}

export default function Icon({ name, size = 20, className = '', filled = false, strokeWidth = 1.8 }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name] ?? paths.box} />
    </svg>
  )
}
