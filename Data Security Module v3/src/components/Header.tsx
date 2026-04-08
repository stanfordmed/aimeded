const navItems = [
  { id: 'overview', label: 'HIPAA Overview' },
  { id: 'diagram', label: 'AI & Data Flow' },
  { id: 'activity', label: 'Test Your Knowledge' },
]

export default function Header({ activeSection }: { activeSection: string }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-end h-14">
        <ul className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeSection === item.id
                    ? 'bg-hai-blue text-white'
                    : 'text-hai-slate hover:bg-hai-warm-gray'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
