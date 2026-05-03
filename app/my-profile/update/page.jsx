"use client";

import { useState, useEffect } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?callbackUrl=/my-profile/update");
    }
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({ name, image: image || undefined });
      toast.success("Profile updated! 🌞");
      router.push("/my-profile");
    } catch {
      toast.error("Failed to update.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-sky-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-400" />
          <div className="p-8">
            <Link href="/my-profile" className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-orange-500 mb-6">
              <ArrowLeft size={14} /> Back to Profile
            </Link>

            <div className="text-center mb-8">
              {image ? (
                <img src={image} alt="Preview" className="w-20 h-20 rounded-2xl border-4 border-orange-200 object-cover mx-auto mb-4"
                  onError={(e) => { e.target.src = "https://placehold.co/80x80/fed7aa/f97316?text=☀️"; }} />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-orange-400 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{name?.charAt(0)?.toUpperCase() || "?"}</span>
                </div>
              )}
              <h1 className="text-2xl font-bold text-stone-900">Update Profile</h1>
              <p className="text-stone-500 text-sm mt-1">Change your name and photo</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Profile Photo URL</label>
                <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/photo.jpg" className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" />
              </div>
              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-3 rounded-2xl hover:bg-orange-600 transition-all disabled:opacity-60 mt-2">
                {loading ? "Saving..." : <><Save size={16} /> Update Information</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}