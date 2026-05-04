"use client";

import { notFound, useRouter } from "next/navigation";
import { useEffect, useState, use } from "react"; // use ইমপোর্ট করা হয়েছে
import products from "@/data/products.json";
import { Star, ShoppingCart, Heart, Shield, Truck, RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage({ params }) {
  // Next.js 15+ এ params আনর্যাপ করার সঠিক নিয়ম
  const resolvedParams = use(params); 
  const productId = resolvedParams.id;

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // ১. ইউজার লগইন চেক (অ্যাসাইনমেন্টের শর্ত অনুযায়ী Protected Route)
  const user = true; // এখানে আপনার আসল Auth লজিক বসবে

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  // আইডি ম্যাচিং স্ট্রিং এবং নাম্বার উভয়ের জন্য নিরাপদ করা হয়েছে
  const product = products.find((p) => String(p.id) === String(productId));

  if (!product) return notFound();

  const relatedProducts = products
    .filter((p) => p.category === product.category && String(p.id) !== String(productId))
    .slice(0, 3);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Back Button */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-2 text-sm text-stone-500">
             <Link href="/" className="hover:text-orange-500">Home</Link>
             <span>/</span>
             <Link href="/products" className="hover:text-orange-500">Products</Link>
             <span>/</span>
             <span className="text-stone-700 font-medium">{product.name}</span>
           </div>
           <Link href="/products" className="text-orange-500 flex items-center gap-1 text-sm font-semibold">
             <ArrowLeft size={16}/> Back to Shop
           </Link>
        </div>

        {/* Product Card Content (বাকি কোড আপনার আগের মতোই ঠিক আছে) */}
        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2">
            <div className="relative bg-orange-50 h-80 lg:h-auto">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://placehold.co/600x400/fed7aa/f97316?text=SunCart"; }} 
              />
            </div>
            <div className="p-8 lg:p-10 space-y-5">
              <p className="text-orange-400 font-bold uppercase tracking-widest text-sm">{product.brand}</p>
              <h1 className="text-3xl font-bold text-stone-900 mt-1">{product.name}</h1>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-orange-500">${product.price}</span>
              </div>
              <p className="text-stone-600 leading-relaxed">{product.description}</p>
              <button className="w-full bg-orange-500 text-white font-semibold py-4 rounded-2xl hover:bg-orange-600 transition-all">
                <ShoppingCart size={18} className="inline mr-2" /> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}