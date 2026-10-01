import React from 'react';
import { Info, type LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { initials } from '../../../lib/orbit/team';

interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, eyebrow, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <div className="apple-label-small mb-3 text-brand">{eyebrow}</div>}
        <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl lg:text-[44px] lg:leading-[1.1]">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-base text-fg-muted sm:text-lg">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-14 text-center', className)}>
      <div className="mb-4 rounded-2xl bg-fg/5 p-3.5 text-fg-subtle">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-base font-bold text-fg">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-fg-subtle">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Notice({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-2xl border border-info/25 bg-info/[0.07] px-5 py-3.5 text-sm text-fg-muted',
        className,
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" />
      <div>{children}</div>
    </div>
  );
}

export function Avatar({ name, size = 'md', className }: { name: string; size?: 'sm' | 'md'; className?: string }) {
  return (
    <span
      title={name}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-[#17264F] font-bold text-brand ring-1 ring-brand/60',
        size === 'sm' ? 'h-7 w-7 text-[11px]' : 'h-10 w-10 text-sm',
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

export function ProgressBar({ value, max, className }: { value: number; max: number; className?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      className={cn('h-2 w-full overflow-hidden rounded-full bg-fg/10', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}
