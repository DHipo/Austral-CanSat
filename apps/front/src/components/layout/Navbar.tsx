import React from 'react'
import { FileText, CheckSquare, Activity, Compass } from 'lucide-react'
import { handleLinkClick } from '../../router/useRouter'

interface NavbarProps {
  currentPath: string
  navigate: (path: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const navItems = [
    { path: '/', label: 'Inicio', icon: Compass },
    { path: '/informes', label: 'Informes', icon: FileText },
    { path: '/todo', label: 'Tareas', icon: CheckSquare },
    { path: '/dashboard', label: 'Telemetría', icon: Activity },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#c87d55]/20 bg-[#090a0d]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand with Metallic Medallion Logo */}
        <a 
          href="/" 
          onClick={(e) => handleLinkClick(e, '/', navigate)}
          className="flex items-center gap-3 group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden bg-[#161a24] border border-[#c87d55]/40 shadow-md shadow-[#c87d55]/10 group-hover:border-[#e29b68] transition-all">
            <img 
              src="/logo.png" 
              alt="AuSat Medallion" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-[#f3cfb3] transition-colors">
                AuSat
              </span>
              <span className="text-[10px] uppercase font-mono font-semibold tracking-wider px-1.5 py-0.2 rounded bg-[#c87d55]/15 text-[#e29b68] border border-[#c87d55]/40">
                ORBIT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono -mt-0.5">
              Universidad Austral
            </p>
          </div>
        </a>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.path
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path, navigate)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#c87d55]/20 text-[#f3cfb3] border border-[#c87d55]/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#e29b68]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Competition Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#12151e] border border-[#c87d55]/25 text-[11px] font-mono text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e29b68] animate-pulse"></span>
          <span>CanSat 2026</span>
        </div>

      </div>
    </header>
  )
}
