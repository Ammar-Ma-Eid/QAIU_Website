'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminAuthCheck() {
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();



        if (response.ok && data.authenticated) {
          setAuthStatus('authenticated');
        } else {
          setAuthStatus('unauthenticated');
          startRedirectCountdown();
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setAuthStatus('unauthenticated');
        setError('Failed to verify authentication status');
        startRedirectCountdown();
      }
    };

    checkAuth();
  }, [router]);

  // Handle countdown and redirect
  const startRedirectCountdown = () => {
    const countdownInterval = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          router.push('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  };

  if (authStatus === 'loading') {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-pulse">Verifying authentication...</div>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Error</AlertTitle>
        <AlertDescription>
          {error || 'You are not authenticated.'} Redirecting to login page in {redirectCountdown} seconds...
        </AlertDescription>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => router.push('/login')}
        >
          Go to Login Now
        </Button>
      </Alert>
    );
  }

  return null; // Render nothing if authenticated
}