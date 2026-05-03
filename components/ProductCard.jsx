"use client";

import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
      <div className="relative overflow-hidden h-52 bg-orange-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x300/fed7aa/f97316?text=SunCart";
          }}
        />
        <span className="absolute top-3 left-3 bg-white/90 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full border border-orange-200">
          {product.category}
        </span>
        {product.stock <= 5 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Low Stock
          </span>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div>
          <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="font-semibold text-stone-800 mt-0.5 line-clamp-1">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={13}
              className={
                star <= Math.floor(product.rating)
                  ? "text-amber-400 fill-amber-400"
                  : "text-stone-200 fill-stone-200"
              }
            />
          ))}
          <span className="text-xs text-stone-500">{product.rating}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-2xl font-bold text-orange-500">
            ${product.price}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="flex items-center gap-1.5 bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-orange-600 transition-all"
          >
            View Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}