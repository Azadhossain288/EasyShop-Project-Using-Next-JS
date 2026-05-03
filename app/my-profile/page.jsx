"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { Mail, Edit3, ShoppingBag, Heart, Star } from "lucide-react";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?callbackUrl=/my-profile");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const { user } = session;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-orange-400 to-amber-300" />
          <div className="px-8 pb-8 -mt-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
              <div className="shrink-0">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover" />
                ) : (
                  <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-orange-400 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{user.name?.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 pb-1">
                <h1 className="text-2xl font-bold text-stone-900">{user.name}</h1>
                <p className="text-stone-500 text-sm flex items-center gap-1.5 mt-1"><Mail size={14} />{user.email}</p>
              </div>
              <Link href="/my-profile/update" className="flex items-center gap-2 bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-2xl hover:bg-orange-600 transition-all text-sm">
                <Edit3 size={15} /> Update Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: <ShoppingBag size={20} className="text-orange-500" />, label: "Orders", value: "12" },
            { icon: <Heart size={20} className="text-pink-500" />, label: "Wishlist", value: "5" },
            { icon: <Star size={20} className="text-amber-500" />, label: "Reviews", value: "8" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 text-center border border-orange-100 shadow-sm">
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-stone-800">{stat.value}</p>
              <p className="text-xs text-stone-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-stone-800 mb-6">Account Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 py-3 border-b border-stone-100">
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">👤</div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Full Name</p>
                <p className="text-sm text-stone-700 font-medium mt-0.5">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-3">
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">✉️</div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Email Address</p>
                <p className="text-sm text-stone-700 font-medium mt-0.5">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}