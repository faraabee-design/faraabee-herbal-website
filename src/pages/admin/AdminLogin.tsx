import React, { useState } from 'react';
import { FarabiLogo } from '../../components/FarabiLogo';
import { useAuth } from '../../context/FirebaseContext';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onBackToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToStore }) => {
  const { currentUser, isAdmin, loginWithEmail, loginWithGoogle, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await loginWithEmail(email, password);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials';
      if (msg.includes('user-not-found') || msg.includes('wrong-password') || msg.includes('invalid-credential')) {
        setError('Invalid administrator email or password.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google authentication failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F3] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <button
          onClick={onBackToStore}
          className="inline-block transition-transform hover:scale-105 cursor-pointer"
          title="Return to FARABI Herbal Wellness Store"
        >
          <FarabiLogo variant="dark" size="lg" />
        </button>
        <h2 className="mt-4 text-2xl font-serif font-bold text-[#183F32] tracking-tight">
          Admin Portal
        </h2>
        <p className="mt-1 text-sm text-[#26312B]/70">
          Private catalog and formulation management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-[#AFC7A5]/30 sm:px-10">
          {/* If signed in but not authorized as admin */}
          {currentUser && !isAdmin ? (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800">
                  <p className="font-semibold">Account Not Authorized</p>
                  <p className="mt-1">
                    Signed in as <strong>{currentUser.email}</strong>. This account does not have administrator privileges.
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full py-2.5 px-4 bg-[#183F32] text-white text-sm font-medium rounded-xl hover:bg-[#122F25] transition-colors cursor-pointer"
              >
                Sign Out & Switch Account
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#183F32] mb-1.5">
                  Admin Email
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#26312B]/40">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="faraabee@gmail.com"
                    className="block w-full pl-10 pr-3 py-2.5 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32] focus:border-transparent bg-[#FAF9F3]/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#183F32] mb-1.5">
                  Password
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#26312B]/40">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="block w-full pl-10 pr-3 py-2.5 border border-[#AFC7A5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183F32] focus:border-transparent bg-[#FAF9F3]/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-[#183F32] hover:bg-[#122F25] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#183F32] disabled:opacity-50 transition-colors cursor-pointer"
              >
                <span>{loading ? 'Verifying...' : 'Sign In to Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#AFC7A5]/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-[#26312B]/50 font-medium">Or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex justify-center items-center gap-2.5 py-2.5 px-4 border border-[#AFC7A5]/50 rounded-xl text-sm font-medium text-[#26312B] bg-[#FAF9F3] hover:bg-[#E3EBDD]/40 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-[#AFC7A5]/20 flex items-center justify-between text-xs text-[#26312B]/70">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#183F32]" />
              Firebase Zero-Trust Protected
            </span>
            <button
              onClick={onBackToStore}
              className="text-[#183F32] font-semibold hover:underline cursor-pointer"
            >
              ← Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
