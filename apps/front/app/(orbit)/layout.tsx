import React from 'react';
import { AuthProvider } from '@/components/orbit/auth/AuthProvider';

export default function OrbitLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
