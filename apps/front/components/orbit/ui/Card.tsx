import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/cn';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('orbit-card overflow-hidden rounded-[28px]', className)} {...props} />;
}

interface CardHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}

export function CardHeader({ title, description, icon: Icon, action, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4 border-b border-line px-6 py-5', className)}>
      <div className="flex min-w-0 items-start gap-3">
        {Icon && (
          <div className="rounded-xl bg-brand/15 p-2 text-brand">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight text-fg">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-fg-subtle">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />;
}
