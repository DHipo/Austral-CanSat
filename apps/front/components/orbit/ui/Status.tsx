import React from 'react';
import { cn } from '../../../lib/cn';

export type Tone = 'neutral' | 'brand' | 'ok' | 'warn' | 'err' | 'info';

const DOT_TONES: Record<Tone, string> = {
  neutral: 'bg-fg-subtle',
  brand: 'bg-brand',
  ok: 'bg-ok',
  warn: 'bg-warn',
  err: 'bg-err',
  info: 'bg-info',
};

export function ToneDot({ tone, className }: { tone: Tone; className?: string }) {
  return <span className={cn('inline-block h-2 w-2 shrink-0 rounded-full', DOT_TONES[tone], className)} />;
}

// Estado como texto plano con un punto. No usar pills/tags de color en la UI.
export function StatusText({ tone, children, className }: { tone: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm text-fg-muted', className)}>
      <ToneDot tone={tone} />
      {children}
    </span>
  );
}
