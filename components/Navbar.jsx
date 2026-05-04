"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-amber-400 rounded-xl flex items-center justify-center">
              <Sun size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-orange-500">Sun</span>
              <span className="text-stone-800">Cart</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-stone-600 hover:text-orange-500 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium text-stone-600 hover:text-orange-500 transition-colors">
              Products
            </Link>
            {session && (
              <Link href="/my-profile" className="text-sm font-medium text-stone-600 hover:text-orange-500 transition-colors">
                My Profile
              </Link>
            )}
          </div>

          {/* Auth Buttons Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-stone-700 max-w-[120px] truncate">
                    {session.user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-orange-600 border border-orange-300 hover:bg-orange-500 hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-orange-600 border border-orange-300 hover:bg-orange-50 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-stone-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-orange-100 px-4 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm font-medium text-stone-700 hover:text-orange-500"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm font-medium text-stone-700 hover:text-orange-500"
          >
            Products
          </Link>
          {session && (
            <Link
              href="/my-profile"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-stone-700 hover:text-orange-500"
            >
              My Profile
            </Link>
          )}
          <div className="pt-2 border-t border-orange-100 flex flex-col gap-2">
            {session ? (
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="w-full py-2 rounded-xl text-sm font-medium text-white bg-orange-500"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-2 rounded-xl text-sm font-medium text-orange-600 border border-orange-300"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-2 rounded-xl text-sm font-medium text-white bg-orange-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}