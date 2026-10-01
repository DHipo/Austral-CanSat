'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Activity,
  ArrowLeft,
  Calendar,
  FileText,
  FlaskConical,
  Home,
  LogOut,
  ListChecks,
  Menu,
  Moon,
  Sun,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../../../lib/cn';
import { useTheme } from '../../../context/ThemeContext';
import { roleLabel } from '../../../lib/orbit/team';
import { useAuth, useCurrentUser } from '../auth/AuthProvider';
import { Avatar } from '../ui';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  soon?: boolean;
}

const NAV_MAIN: NavItem[] = [
  { href: '/orbit', label: 'Inicio', icon: Home },
  { href: '/orbit/calendar', label: 'Calendario', icon: Calendar },
  { href: '/orbit/reports', label: 'Informes', icon: FileText },
];

const NAV_SOON: NavItem[] = [
  { href: '#', label: 'Ensayos', icon: FlaskConical, soon: true },
  { href: '#', label: 'Telemetría', icon: Activity, soon: true },
  { href: '#', label: 'Requisitos CONAE', icon: ListChecks, soon: true },
];

function isActive(pathname: string, href: string) {
  if (href === '/orbit') return pathname === '/orbit';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate?: () => void }) {
  const Icon = item.icon;

  if (item.soon) {
    return (
      <span className="flex cursor-not-allowed items-center gap-3 rounded-2xl px-4 py-2.5 text-[15px] text-fg-subtle">
        <Icon className="h-[18px] w-[18px]" />
        <span className="flex-1">{item.label}</span>
        <span className="text-xs text-fg-subtle/70">Pronto</span>
      </span>
    );
  }

  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-2xl px-4 py-2.5 text-[15px] font-semibold transition-all',
        active
          ? 'bg-brand text-brand-fg shadow-[0_0_24px_-6px_rgba(255,122,26,0.5)]'
          : 'text-fg-muted hover:bg-fg/[0.06] hover:text-fg',
      )}
    >
      <Icon className="h-[18px] w-[18px]" />
      {item.label}
    </Link>
  );
}

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const user = useCurrentUser();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/orbit/login');
  };

  return (
    <div className="flex h-full flex-col">
      <Link href="/orbit" onClick={onNavigate} className="flex items-center gap-3 px-6 py-6">
        <img src="/logo.png" alt="" className="h-11 w-11 object-contain drop-shadow-[0_2px_12px_rgba(255,122,26,0.35)]" />
        <div className="leading-tight">
          <div className="text-xl font-bold tracking-tight text-fg">Orbit</div>
          <div className="apple-label-small mt-0.5 text-[10px] text-fg-subtle">AuSat · CanSat 2026</div>
        </div>
      </Link>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-2">
        <div className="space-y-1">
          {NAV_MAIN.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
          ))}
        </div>
        <div className="space-y-1">
          <div className="apple-label-small px-4 pb-2 text-[10px] text-fg-subtle">
            Próximamente
          </div>
          {NAV_SOON.map((item) => (
            <NavLink key={item.label} item={item} pathname={pathname} />
          ))}
        </div>
      </nav>

      <div className="space-y-1 border-t border-line p-4">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-fg-muted transition-colors hover:bg-fg/[0.06] hover:text-fg cursor-pointer"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-fg-muted transition-colors hover:bg-fg/[0.06] hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al sitio
        </Link>
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-line bg-fg/[0.04] px-3 py-3">
          <Avatar name={user.name} />
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-sm font-bold text-fg">{user.name}</div>
            <div className="truncate text-xs font-semibold text-brand">{roleLabel(user)}</div>
          </div>
          <button
            onClick={handleLogout}
            className="shrink-0 rounded-full p-2 text-fg-subtle transition-colors hover:bg-fg/[0.06] hover:text-err cursor-pointer"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function OrbitShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => setDrawerOpen(false), [pathname]);

  return (
    <div className="relative min-h-screen bg-canvas font-sans text-fg selection:bg-brand/25">
      {/* Resplandor ambiente, igual que la landing */}
      <div className="no-print pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-ambient-mesh absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-brand/[0.08] blur-[140px]" />
        <div className="animate-ambient-mesh-slow absolute -bottom-48 left-1/4 h-[480px] w-[480px] rounded-full bg-[#17264F]/40 blur-[140px]" />
      </div>

      {/* Sidebar desktop */}
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-line bg-chrome backdrop-blur-2xl lg:block">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Topbar mobile */}
      <header className="no-print sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-chrome px-4 backdrop-blur-2xl lg:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="-ml-1.5 rounded-lg p-1.5 text-fg-muted hover:bg-panel-hover hover:text-fg cursor-pointer"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
        <img src="/logo.png" alt="" className="h-9 w-9 object-contain" />
        <span className="text-lg font-bold tracking-tight">Orbit</span>
      </header>

      {/* Drawer mobile */}
      {drawerOpen && (
        <div className="no-print fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-line bg-canvas shadow-2xl">
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute right-4 top-7 rounded-full p-1.5 text-fg-subtle hover:bg-panel-hover hover:text-fg cursor-pointer"
              aria-label="Cerrar menú"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarContent pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <main className="relative lg:pl-72 print:pl-0">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-10 sm:py-12 print:p-0">{children}</div>
      </main>
    </div>
  );
}
