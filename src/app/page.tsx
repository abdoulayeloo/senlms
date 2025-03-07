'use client';

import Image from "next/image";
import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }else{
      router.push('/signin');
    }
  }, [user, router]);

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
}
