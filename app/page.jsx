import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import { Shield, Droplets, Sun, Wind, ArrowRight, Zap } from "lucide-react";

export default function Home() {
  const popularProducts = products.slice(0, 3);

  const brands = [
    { name: "SunShade", tagline: "UV Protection Experts", emoji: "🕶️" },
    { name: "BreezeWear", tagline: "Summer Fashion", emoji: "👗" },
    { name: "GlowGuard", tagline: "Skincare Science", emoji: "✨" },
    { name: "SplashZone", tagline: "Beach Fun Gear", emoji: "🌊" },
  ];

  const tips = [
    { icon: <Shield size={22} className="text-orange-500" />, title: "Apply SPF Daily", body: "Use broad-spectrum SPF 30+ every morning, even on cloudy days." },
    { icon: <Droplets size={22} className="text-sky-500" />, title: "Stay Hydrated", body: "Drink at least 8 glasses of water daily in summer." },
    { icon: <Sun size={22} className="text-amber-500" />, title: "Seek Shade", body: "Avoid direct sun between 10AM–4PM. Wear wide-brim hats." },
    { icon: <Wind size={22} className="text-teal-500" />, title: "Wear Light Fabrics", body: "Choose breathable fabrics like cotton and linen." },
  ];

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-sky-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                <Zap size={14} />
                Summer Sale is LIVE 🔥
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
                Gear Up For{" "}
                <span className="text-orange-500">The Sun!</span>
              </h1>
              <p className="text-lg text-stone-600 max-w-lg">
                Explore our curated collection of summer essentials.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Summer Sale 50% OFF", "Free Shipping $50+", "Hot Deals 🔥"].map((badge) => (
                  <span key={badge} className="bg-white border border-orange-200 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-7 py-3.5 rounded-2xl hover:bg-orange-600 transition-all shadow-lg">
                  Shop Now <ArrowRight size={18} />
                </Link>
                <a href="#popular" className="inline-flex items-center gap-2 bg-white text-stone-700 font-semibold px-7 py-3.5 rounded-2xl border border-stone-200 hover:border-orange-300 hover:text-orange-500 transition-all">
                  View Deals
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80"
                  alt="Summer beach"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section id="popular" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">🔥 Trending Now</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">Popular Products</h2>
            <p className="text-stone-500 mt-3 max-w-lg mx-auto">Our most-loved summer picks.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="inline-flex items-center gap-2 bg-white border border-orange-200 text-orange-600 font-semibold px-8 py-3 rounded-2xl hover:bg-orange-50 transition-all shadow-sm">
              See All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SUMMER CARE TIPS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-2">☀️ Stay Safe</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">Summer Care Tips</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-gray-50 rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                  {tip.icon}
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">{tip.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP BRANDS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">🏆 Our Partners</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">Top Brands</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <div key={brand.name} className="bg-white rounded-2xl p-6 text-center border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="text-4xl mb-3">{brand.emoji}</div>
                <h3 className="font-bold text-stone-800">{brand.name}</h3>
                <p className="text-xs text-stone-500 mt-1">{brand.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-3xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Ready for Summer? 🌞</h2>
            <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
              Join thousands who trust SunCart for their summer essentials.
            </p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-3.5 rounded-2xl hover:bg-orange-50 transition-all shadow-lg">
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}