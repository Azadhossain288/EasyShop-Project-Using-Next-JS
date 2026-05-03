import { notFound } from "next/navigation";
import products from "@/data/products.json";
import { Star, ShoppingCart, Heart, Shield, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => p.id === parseInt(params.id));
  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-orange-500">Products</Link>
          <span>/</span>
          <span className="text-stone-700 font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2">
            <div className="relative bg-orange-50 h-80 lg:h-auto">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://placehold.co/600x400/fed7aa/f97316?text=SunCart"; }} />
              <span className="absolute top-4 left-4 bg-white/90 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full border border-orange-200">
                {product.category}
              </span>
            </div>

            <div className="p-8 lg:p-10 space-y-5">
              <div>
                <p className="text-orange-400 font-bold uppercase tracking-widest text-sm">{product.brand}</p>
                <h1 className="text-3xl font-bold text-stone-900 mt-1">{product.name}</h1>
              </div>

              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} size={16} className={star <= Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-stone-200 fill-stone-200"} />
                ))}
                <span className="text-stone-600 text-sm">{product.rating} out of 5</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-orange-500">${product.price}</span>
                <span className="text-stone-400 text-sm line-through">${(product.price * 1.3).toFixed(0)}</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">SAVE 23%</span>
              </div>

              <p className="text-stone-600 leading-relaxed">{product.description}</p>

              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${product.stock > 5 ? "bg-green-400" : "bg-red-400"}`} />
                <span className="text-sm text-stone-600">
                  {product.stock > 5 ? `In Stock (${product.stock} available)` : `Only ${product.stock} left!`}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-3.5 rounded-2xl hover:bg-orange-600 transition-all">
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button className="flex items-center justify-center gap-2 bg-white border border-stone-200 text-stone-600 font-semibold py-3.5 px-5 rounded-2xl hover:border-orange-300 hover:text-orange-500 transition-all">
                  <Heart size={18} /> Wishlist
                </button>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-stone-100">
                {[
                  { Icon: Shield, label: "1 Year Warranty" },
                  { Icon: Truck, label: "Free Delivery" },
                  { Icon: RotateCcw, label: "30-Day Returns" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-stone-500">
                    <Icon size={14} className="text-orange-400" /> {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-stone-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProducts.map((related) => (
                <Link key={related.id} href={`/products/${related.id}`} className="bg-white rounded-2xl overflow-hidden border border-orange-100 hover:shadow-md hover:-translate-y-1 transition-all flex gap-4 p-4">
                  <img src={related.image} alt={related.name} className="w-20 h-20 rounded-xl object-cover shrink-0"
                    onError={(e) => { e.target.src = "https://placehold.co/80x80/fed7aa/f97316?text=☀️"; }} />
                  <div>
                    <p className="font-semibold text-stone-800 text-sm">{related.name}</p>
                    <p className="text-xs text-orange-400 mt-0.5">{related.brand}</p>
                    <p className="font-bold text-orange-500 mt-1">${related.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}