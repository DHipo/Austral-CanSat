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
    <div className="min-h-screen bg-black text-[#F5F5F7] flex flex-col font-sans selection:bg-[#FF7A1A]/30 selection:text-white">
      {/* Orbit Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-2xl border-b border-white/10 px-6 sm:px-10 py-4 flex items-center justify-between">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF7A1A] to-[#D9620B] flex items-center justify-center shadow-lg shadow-[#FF7A1A]/30">
            <Satellite className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#F5F5F7]">Orbit</span>
              <span className="apple-label-small px-2.5 py-0.5 rounded-full bg-[#FF7A1A]/20 text-[#FF7A1A] border border-[#FF7A1A]/40 text-[10px]">
                TÉCNICO
              </span>
            </div>
            <p className="text-xs text-[#86868B]">AuSat • Universidad Austral</p>
          </div>
        </div>

        {/* Center: Apple Rounded Pill Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-white/[0.06] p-1.5 rounded-full border border-white/10 backdrop-blur-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#FF7A1A] text-white shadow-md shadow-[#FF7A1A]/30'
                    : 'text-[#C9D6F2] hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: User Status & Back to Landing */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2.5 text-right">
            <div>
              <div className="text-xs font-bold text-[#F5F5F7]">Bautista D'Hipólito</div>
              <div className="text-[10px] text-[#FF7A1A] font-semibold">Líder de Proyecto</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#17264F] border border-[#FF7A1A] flex items-center justify-center text-xs font-bold text-[#FF7A1A]">
              BD
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-white/[0.08] hover:bg-white/[0.15] text-[#F5F5F7] border border-white/15 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Landing Pública</span>
          </Link>
        </div>

      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-10">
        {children}
      </main>
    </div>
  );
}
