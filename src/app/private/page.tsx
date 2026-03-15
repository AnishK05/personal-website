'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PrivatePageContent() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [connected, setConnected] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const authParam = searchParams.get('auth');
    if (authParam === 'error') {
      setStatusMessage('OAuth failed. Please try again.');
    }
  }, [searchParams]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/private/status', {
        headers: { 'x-private-password': password },
      });
      const data = await res.json();

      if (data.authorized) {
        setAuthorized(true);
        setConnected(data.connected);
      } else {
        setAuthError('Incorrect password.');
      }
    } catch {
      setAuthError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-sm shadow-xl">
          <h1 className="text-gray-100 text-xl font-semibold mb-1">Private Route</h1>
          <p className="text-gray-400 text-sm mb-6">Enter the admin password to continue.</p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-400 text-sm"
              autoFocus
            />
            {authError && <p className="text-red-400 text-xs">{authError}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-100 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-sm shadow-xl space-y-6">
        <h1 className="text-gray-100 text-xl font-semibold">Admin Panel</h1>

        {statusMessage && (
          <div className="text-xs px-3 py-2 rounded-lg bg-red-900/40 text-red-400 border border-red-700">
            {statusMessage}
          </div>
        )}

        <div className="flex items-center gap-4">
          {connected ? (
            <div className="w-10 h-10 rounded-full bg-green-900/50 border border-green-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-red-900/50 border border-red-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          <div>
            <p className="text-gray-100 text-sm font-medium">
              {connected ? 'Google Calendar connected' : 'Google Calendar not connected'}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">
              {connected
                ? 'The AI secretary can access your calendar.'
                : 'Click below to authenticate with Google, then follow the instructions to set GOOGLE_TOKENS_JSON in your environment.'}
            </p>
          </div>
        </div>

        <a
          href="/api/google/auth"
          className="block w-full text-center py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
        >
          {connected ? 'Re-authenticate' : 'Connect Google Calendar'}
        </a>
      </div>
    </div>
  );
}

export default function PrivatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <PrivatePageContent />
    </Suspense>
  );
}
