import React from 'react'
import { handleLinkClick } from '../../router/useRouter'

interface NavbarProps {
  currentPath: string
  navigate: (path: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const navItems = [
    { path: '/', label: 'Visión General' },
    { path: '/informes', label: 'Informes' },
    { path: '/todo', label: 'Tareas' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full apple-glass-nav h-12 flex items-center transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
        
        {/* Brand with Apple-sized Minimalist Logo */}
        <a 
          href="/" 
          onClick={(e) => handleLinkClick(e, '/', navigate)}
          className="flex items-center gap-2.5 group opacity-90 hover:opacity-100 transition-opacity"
        >
          <img 
            src="/logo.png" 
            alt="AuSat" 
            className="w-6 h-6 object-contain" 
          />
          <span className="text-sm font-semibold tracking-tight text-[#f5f5f7]">
            AuSat <span className="text-[#86868b] font-normal">Orbit</span>
          </span>
        </a>

        {/* Center Navigation Links (Apple Style: 12px text, high contrast, clean) */}
        <nav className="flex items-center gap-6 sm:gap-8">
          {navItems.map((item) => {
            const isActive = currentPath === item.path
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path, navigate)}
                className={`text-xs tracking-tight transition-colors ${
                  isActive
                    ? 'text-[#f5f5f7] font-semibold'
                    : 'text-[#86868b] hover:text-[#f5f5f7]'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>



      </div>
    </header>
  )
}
