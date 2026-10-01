import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/cn';

const CONTROL =
  'w-full rounded-2xl border border-line bg-fg/[0.04] px-4 text-[15px] text-fg placeholder:text-fg-subtle transition-colors ' +
  'focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20 disabled:opacity-60';

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function Field({ label, htmlFor, hint, className, children }: FieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={htmlFor} className="block text-xs font-bold uppercase tracking-wider text-fg-subtle">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-fg-subtle">{hint}</p>}
    </div>
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(CONTROL, 'h-12', className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(CONTROL, 'resize-y py-3 leading-relaxed', className)} {...props} />;
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={cn('relative', className)}>
      <select className={cn(CONTROL, 'h-12 cursor-pointer appearance-none pr-10 [&>option]:bg-panel')} {...props}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
    </div>
  );
}
