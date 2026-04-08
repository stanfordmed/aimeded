const s = { width: '1em', height: '1em', fill: 'currentColor', viewBox: '0 0 24 24' } as const

export function LockIcon({ className }: { className?: string }) {
  return (
    <svg {...s} className={className}>
      <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 1 1 6 0v3H9V7zm3 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
    </svg>
  )
}

export function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg {...s} className={className}>
      <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 2.18l7 3.89v4.43c0 4.5-3.08 8.71-7 9.93-3.92-1.22-7-5.43-7-9.93V8.07l7-3.89zm-1 5.82v4h2v-4h-2zm0 6v2h2v-2h-2z" />
    </svg>
  )
}

export function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg {...s} className={className}>
      <path d="M9 2a2 2 0 0 0-2 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2-2H9zm0 2h6v1H9V4zM5 6h2v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h2v14H5V6zm2 4v2h10v-2H7zm0 4v2h7v-2H7z" />
    </svg>
  )
}

export function AlertIcon({ className }: { className?: string }) {
  return (
    <svg {...s} className={className}>
      <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
    </svg>
  )
}

export function GraduationIcon({ className }: { className?: string }) {
  return (
    <svg {...s} className={className}>
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9 12 3zm0 2.18L19.83 9 12 12.82 4.17 9 12 5.18zM7 12.27l5 2.73 5-2.73v3.91L12 19l-5-2.82v-3.91z" />
    </svg>
  )
}

export function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg {...s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* center post */}
      <line x1="12" y1="3" x2="12" y2="21" />
      {/* base */}
      <line x1="8" y1="21" x2="16" y2="21" />
      {/* beam */}
      <line x1="3" y1="7" x2="21" y2="7" />
      {/* left pan strings */}
      <line x1="3" y1="7" x2="5" y2="14" />
      <line x1="9" y1="7" x2="7" y2="14" />
      {/* left pan */}
      <path d="M5 14a2.5 2 0 0 0 2 0" />
      {/* right pan strings */}
      <line x1="15" y1="7" x2="17" y2="14" />
      <line x1="21" y1="7" x2="19" y2="14" />
      {/* right pan */}
      <path d="M17 14a2.5 2 0 0 0 2 0" />
      {/* top finial */}
      <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ChatIcon({ className }: { className?: string }) {
  return (
    <svg {...s} className={className}>
      <path d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4l4 4 4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 14h-4.83L12 19.17 8.83 16H4V4h16v12zM7 8h10v2H7V8zm0 4h7v2H7v-2z" />
    </svg>
  )
}

export function ShieldLockIcon({ className }: { className?: string }) {
  return (
    <svg {...s} className={className}>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v5.2c0 4.5-3.08 8.71-7 9.93-3.92-1.22-7-5.43-7-9.93V6.3l7-3.12zM11 8v2.5H9.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5H13V8a1 1 0 1 0-2 0zm1 5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
    </svg>
  )
}

export type IconName = 'lock' | 'shield' | 'clipboard' | 'alert' | 'graduation' | 'scale' | 'chat' | 'shield-lock'

const iconMap: Record<IconName, React.FC<{ className?: string }>> = {
  lock: LockIcon,
  shield: ShieldIcon,
  clipboard: ClipboardIcon,
  alert: AlertIcon,
  graduation: GraduationIcon,
  scale: ScaleIcon,
  chat: ChatIcon,
  'shield-lock': ShieldLockIcon,
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Comp = iconMap[name]
  return <Comp className={className} />
}
