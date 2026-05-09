"use client";

import { useState, Suspense } from "react"; // Suspense ইমপোর্ট করা হয়েছে
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Sun, Mail, Lock, Eye, EyeOff } from "lucide-react";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams(); // এটি এখন নিরাপদ
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn.email({ email, password, callbackURL: callbackUrl });
      if (result.error) {
        toast.error(result.error.message || "Invalid credentials.");
      } else {
        toast.success("Welcome back! 🌞");
        router.push(callbackUrl);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({ provider: "google", callbackURL: callbackUrl });
    } catch {
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-sky-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-400" />
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-400 rounded-2xl mb-4">
                <Sun size={28} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-stone-900">Welcome Back</h1>
              <p className="text-stone-500 text-sm mt-1">Sign in to your account</p>
            </div>

            <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white border border-stone-200 text-stone-700 font-medium py-3 rounded-2xl hover:bg-stone-50 transition-all mb-5 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-xs text-stone-400">or sign in with email</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full pl-10 pr-10 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-orange-500 text-black font-semibold py-3 rounded-2xl hover:bg-orange-600 transition-all disabled:opacity-60 mt-2">
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="flex justify-end mt-1">
              <Link href="/forgot-password" size="sm" className="text-xs font-medium text-orange-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            <p className="text-center text-sm text-black mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-orange-500 font-semibold">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}