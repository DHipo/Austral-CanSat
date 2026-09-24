import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { handleLinkClick } from '../../router/useRouter'
import { useTheme } from '../../context/ThemeContext'

interface NavbarProps {
  currentPath: string
  navigate: (path: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { effectiveTheme, systemTheme, toggleTheme } = useTheme()

  const navItems = [
    { path: '/', label: 'Visión General' },
    { path: '/informes', label: 'Informes' },
    { path: '/todo', label: 'Tareas' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full apple-glass-nav h-12 flex items-center transition-colors duration-300">
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

        {/* Right Action: Intelligent Theme Switcher Button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleTheme}
            title={
              effectiveTheme === 'dark'
                ? `Cambiar a Modo Claro (Sistema del equipo: ${systemTheme === 'dark' ? 'Oscuro' : 'Claro'})`
                : `Cambiar a Modo Oscuro (Sistema del equipo: ${systemTheme === 'dark' ? 'Oscuro' : 'Claro'})`
            }
            aria-label="Cambiar tema de color"
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#a1a1a6] hover:text-white border border-white/[0.08] transition-all flex items-center gap-1.5 text-xs font-mono group"
          >
            {effectiveTheme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#e29b68] group-hover:rotate-45 transition-transform duration-300" />
                <span className="hidden sm:inline text-[11px] text-[#a1a1a6] group-hover:text-white transition-colors">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#0071e3] group-hover:-rotate-12 transition-transform duration-300" />
                <span className="hidden sm:inline text-[11px] text-[#1d1d1f] transition-colors">Oscuro</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  )
}
