'use client';

import { FC, FormEvent, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const SignUpPage: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp, error } = useAuth();
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            if (formData.password !== formData.confirmPassword) {
              return;
            }
            setIsSubmitting(true);
            try {
              await signUp(formData.name, formData.email, formData.password);
              router.push('/dashboard');
            } catch (err) {
              // Error is handled by AuthContext
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                rounded="top"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                label="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                rounded="none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email address"
                label="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                rounded="none"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                label="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                rounded="bottom"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm Password"
                label="Confirm Password"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              isLoading={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
            {error && (
              <div className="mt-3 text-sm text-red-600">
                {error}
              </div>
            )}
            {formData.password !== formData.confirmPassword && (
              <div className="mt-3 text-sm text-red-600">
                Passwords do not match
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;