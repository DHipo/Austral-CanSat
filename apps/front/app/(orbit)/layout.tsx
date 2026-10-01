'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Satellite, Calendar, FileText, LayoutDashboard, ArrowLeft } from 'lucide-react';

export default function OrbitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/orbit', label: 'Panel General', icon: LayoutDashboard },
    { href: '/orbit/calendar', label: 'Calendario de Misión', icon: Calendar },
    { href: '/orbit/reports', label: 'Reportes & Bitácoras', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#060C1E] text-[#EEF2FA] flex flex-col font-sans">
      {/* Orbit Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0B1633]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF7A1A] to-[#D9620B] flex items-center justify-center shadow-md shadow-[#FF7A1A]/30">
            <Satellite className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-[#EEF2FA]">Orbit</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF7A1A]/20 text-[#FF7A1A]">
                Técnico
              </span>
            </div>
            <p className="text-[10px] text-[#5A6785]">AuSat • Universidad Austral</p>
          </div>
        </div>

        {/* Center: Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#17264F]/70 p-1 rounded-2xl border border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#FF7A1A] text-white shadow-sm'
                    : 'text-[#C9D6F2] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: User Status & Back to Landing */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-right">
            <div>
              <div className="text-xs font-bold text-[#EEF2FA]">Bautista D'Hipólito</div>
              <div className="text-[10px] text-[#FF7A1A] font-semibold">Líder de Proyecto</div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#17264F] border border-[#FF7A1A] flex items-center justify-center text-xs font-bold text-[#FF7A1A]">
              BD
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#17264F] hover:bg-[#1E3268] text-[#C9D6F2] border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Landing Pública</span>
          </Link>
        </div>

      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}
