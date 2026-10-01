import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ReportEditor } from '@/components/orbit/ReportEditor';

export default function NewReportPage() {
  return (
    <div className="space-y-8">
      <Link href="/orbit/reports" className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted hover:text-fg">
        <ArrowLeft className="h-3.5 w-3.5" />
        Informes
      </Link>
      <ReportEditor />
    </div>
  );
}
