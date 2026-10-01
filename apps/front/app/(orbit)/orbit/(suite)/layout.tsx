import React from 'react';
import { RequireAuth } from '@/components/orbit/auth/RequireAuth';
import { OrbitShell } from '@/components/orbit/shell/OrbitShell';

export default function OrbitSuiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <OrbitShell>{children}</OrbitShell>
    </RequireAuth>
  );
}
