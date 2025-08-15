'use client';

import { useTransition } from 'react';
import { logout } from '@/app/login/actions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <Button onClick={handleLogout} variant="outline" disabled={isPending}>
      <LogOut className="mr-2 h-4 w-4" />
      {isPending ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
