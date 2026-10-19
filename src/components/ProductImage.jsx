// Polished vector product visuals, used until real product photos exist.
// Driven by `image` = { kind, tone, view } from the product data.
const tones = {
  violet: ['#6fa3e8', '#2f6fcc'],
  indigo: ['#4382df', '#1f4a94'],
  sage: ['#aaccd6', '#4f8aa0'],
  amber: ['#8db8ee', '#3a6fbd'],
  coral: ['#c9e0e8', '#5f97b0'],
  slate: ['#7fa6d6', '#2a4f86'],
}

function Art({ kind, a, b, id }) {
  const body = `url(#body-${id})`
  switch (kind) {
    case 'phone':
      return (
        <g>
          <rect x="82" y="30" width="76" height="160" rx="16" fill={body} stroke="#ffffff33" />
          <rect x="88" y="38" width="64" height="144" rx="11" fill="#0f2547" />
          <rect x="88" y="38" width="64" height="144" rx="11" fill={`url(#screen-${id})`} opacity=".85" />
          <rect x="108" y="44" width="24" height="7" rx="3.5" fill="#000" />
          <rect x="94" y="62" width="30" height="30" rx="8" fill="#ffffff22" />
          <circle cx="102" cy="72" r="5" fill="#ffffff55" />
        </g>
      )
    case 'laptop':
      return (
        <g>
          <rect x="52" y="48" width="136" height="88" rx="8" fill="#0f2547" stroke="#ffffff30" />
          <rect x="58" y="54" width="124" height="76" rx="4" fill={`url(#screen-${id})`} />
          <path d="M34 142h172l-10 14a6 6 0 0 1-5 2H49a6 6 0 0 1-5-2l-10-14Z" fill={body} />
          <rect x="104" y="146" width="32" height="4" rx="2" fill="#00000040" />
        </g>
      )
    case 'headphones':
      return (
        <g>
          <path d="M60 128V108a60 60 0 0 1 120 0v20" fill="none" stroke={body} strokeWidth="12" strokeLinecap="round" />
          <rect x="46" y="108" width="34" height="56" rx="15" fill={body} stroke="#ffffff30" />
          <rect x="160" y="108" width="34" height="56" rx="15" fill={body} stroke="#ffffff30" />
          <rect x="54" y="118" width="18" height="36" rx="9" fill="#00000030" />
          <rect x="168" y="118" width="18" height="36" rx="9" fill="#00000030" />
        </g>
      )
    case 'shoe':
      return (
        <g>
          <path d="M40 132c0-24 6-42 18-46l30 14c10 5 18 4 28-3l14-10c14 2 30 22 42 34 5 5 6 11 6 20H40v-9Z" fill={body} stroke="#ffffff30" />
          <path d="M40 148h136v10c0 6-4 10-10 10H50c-6 0-10-4-10-10v-10Z" fill="#f2f3f8" />
          <path d="M92 104l12 10m4-16 12 10" stroke="#ffffff88" strokeWidth="3" strokeLinecap="round" />
          <rect x="58" y="150" width="52" height="8" rx="4" fill={a} opacity=".7" />
        </g>
      )
    case 'console':
      return (
        <g>
          <rect x="88" y="28" width="64" height="150" rx="14" fill="#f2f3f8" />
          <path d="M88 50h64v100H88z" fill={body} opacity=".9" />
          <rect x="98" y="34" width="44" height="6" rx="3" fill="#00000030" />
          <circle cx="120" cy="164" r="5" fill={a} />
          <rect x="70" y="180" width="100" height="8" rx="4" fill="#0f2547" opacity=".5" />
        </g>
      )
    case 'watch':
      return (
        <g>
          <rect x="98" y="16" width="44" height="46" rx="10" fill={body} opacity=".7" />
          <rect x="98" y="178" width="44" height="46" rx="10" fill={body} opacity=".7" />
          <rect x="72" y="52" width="96" height="116" rx="26" fill="#0f2547" stroke="#ffffff40" strokeWidth="2" />
          <rect x="80" y="60" width="80" height="100" rx="20" fill={`url(#screen-${id})`} />
          <circle cx="120" cy="110" r="22" fill="none" stroke="#ffffffaa" strokeWidth="4" />
          <path d="M120 110V96m0 14 10 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    case 'chair':
      return (
        <g>
          <rect x="82" y="26" width="76" height="86" rx="18" fill={body} stroke="#ffffff30" />
          <rect x="92" y="38" width="56" height="62" rx="10" fill="#00000030" />
          <rect x="70" y="118" width="100" height="24" rx="12" fill={body} stroke="#ffffff30" />
          <rect x="116" y="142" width="8" height="34" fill="#c9cede" />
          <path d="M120 176 80 192m40-16 40 16M120 176v16" stroke="#c9cede" strokeWidth="6" strokeLinecap="round" />
          <path d="M76 100v20m88-20v20" stroke="#c9cede" strokeWidth="5" strokeLinecap="round" />
        </g>
      )
    case 'jar':
      return (
        <g>
          <rect x="82" y="40" width="76" height="26" rx="6" fill="#0f2547" />
          <rect x="72" y="66" width="96" height="120" rx="14" fill={body} stroke="#ffffff30" />
          <rect x="82" y="92" width="76" height="56" rx="8" fill="#f2f3f8" opacity=".92" />
          <path d="M96 112h48M96 124h32" stroke={b} strokeWidth="5" strokeLinecap="round" />
        </g>
      )
    default:
      return <rect x="70" y="50" width="100" height="100" rx="18" fill={body} />
  }
}

export default function ProductImage({ image, alt, className = '' }) {
  const [a, b] = tones[image.tone] ?? tones.violet
  const id = `${image.kind}-${image.tone}-${image.view ?? 'main'}`
  const shift = image.view === 'angle' ? 'rotate(-8 120 120)' : image.view === 'detail' ? 'translate(-30 -20) scale(1.25)' : undefined
  return (
    <div className={`product-image ${className}`} role="img" aria-label={alt}>
      <svg viewBox="0 0 240 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a} stopOpacity=".28" />
            <stop offset="1" stopColor={b} stopOpacity=".55" />
          </linearGradient>
          <radialGradient id={`glow-${id}`} cx=".5" cy=".45" r=".55">
            <stop offset="0" stopColor={a} stopOpacity=".45" />
            <stop offset="1" stopColor={a} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`body-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
          <linearGradient id={`screen-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor="#0f2547" />
          </linearGradient>
        </defs>
        <rect width="240" height="240" fill={`url(#bg-${id})`} />
        <rect width="240" height="240" fill={`url(#glow-${id})`} />
        <ellipse cx="120" cy="206" rx="62" ry="7" fill="#000" opacity=".28" />
        <g transform={shift}>
          <Art kind={image.kind} a={a} b={b} id={id} />
        </g>
      </svg>
    </div>
  )
}
