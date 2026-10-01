import type { UserRole } from '@prisma/client';

// Usuario que OrbitAuthGuard adjunta a request['user'].
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      career: string;
      subsystem: string;
      avatarUrl: string | null;
      isAuthorizedTechnical: boolean;
    }
  }
}

export {};
