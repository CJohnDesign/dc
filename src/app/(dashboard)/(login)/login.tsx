'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '../../../lib/auth/middleware';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Logo from '@/components/logo';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    (_, formData) => mode === 'signin' ? signIn(formData) : signUp(formData),
    { error: '' },
  );

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo className="text-2xl" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === 'signin'
            ? 'Sign in to your account'
            : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" action={formAction}>
          <input type="hidden" name="redirect" value={redirect || ''} />
          <input type="hidden" name="priceId" value={priceId || ''} />
          <input type="hidden" name="inviteId" value={inviteId || ''} />
          
          {/* Different form fields based on mode */}
          {mode === 'signin' ? (
            <>
              {/* Sign In Form Fields */}
              <div>
                <Label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </Label>
                <div className="mt-1">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    defaultValue={state.username}
                    required
                    maxLength={50}
                    className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:z-10 sm:text-sm"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    defaultValue={state.password}
                    required
                    minLength={3}
                    maxLength={100}
                    className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </Label>
                <RadioGroup defaultValue="lead" name="userType" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lead" id="user-lead" />
                    <Label htmlFor="user-lead">Customer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="broker" id="user-broker" />
                    <Label htmlFor="user-broker">Broker</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          ) : (
            <>
              {/* Sign Up Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </Label>
                  <div className="mt-1">
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      defaultValue={state.firstName}
                      required
                      maxLength={100}
                      className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:z-10 sm:text-sm"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </Label>
                  <div className="mt-1">
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      defaultValue={state.lastName}
                      required
                      maxLength={100}
                      className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:z-10 sm:text-sm"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={state.email}
                    required
                    maxLength={50}
                    className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:z-10 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    defaultValue={state.password}
                    required
                    minLength={8}
                    maxLength={100}
                    className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:z-10 sm:text-sm"
                    placeholder="Create a password"
                  />
                </div>
              </div>
              
              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </Label>
                <div className="mt-1">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    defaultValue={state.confirmPassword}
                    required
                    minLength={8}
                    maxLength={100}
                    className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:z-10 sm:text-sm"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </Label>
                <RadioGroup defaultValue="customer" name="accountType" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="customer" id="account-customer" />
                    <Label htmlFor="account-customer">Customer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="broker" id="account-broker" />
                    <Label htmlFor="account-broker">Broker</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {state?.error && (
            <div className="text-red-500 text-sm">{state.error}</div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Loading...
                </>
              ) : mode === 'signin' ? (
                'Sign in'
              ) : (
                'Sign up'
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                {mode === 'signin'
                  ? 'New to our platform?'
                  : 'Already have an account?'}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                redirect ? `?redirect=${redirect}` : ''
              }${priceId ? `&priceId=${priceId}` : ''}`}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
            >
              {mode === 'signin'
                ? 'Create an account'
                : 'Sign in to existing account'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
