"use client";

import { Star, ArrowRight } from "lucide-react";
import Link from "next/link"; 

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
      {/* Product Image & Category Tag */}
      <div className="relative overflow-hidden h-52 bg-orange-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/90 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full border border-orange-200">
          {product.category}
        </span>
      </div>

      <div className="p-5 space-y-3">
        {/* Product Name */}
        <h3 className="font-semibold text-stone-800 line-clamp-1">{product.name}</h3>
        
        {/* Rating Stars Section */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((index) => (
              <Star
                key={index}
                size={14}
                className={
                  index <= Math.floor(product.rating)
                    ? "text-amber-400 fill-amber-400" 
                    : "text-stone-200 fill-stone-200" 
                }
              />
            ))}
          </div>
          <span className="text-xs font-bold text-stone-500">({product.rating})</span>
        </div>

        {/* Price and Dynamic Link to Details Page */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-2xl font-bold text-orange-500">${product.price}</span>
          
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