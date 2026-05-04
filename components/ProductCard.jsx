"use client";

import { useState } from "react"; 
import { Star, ArrowRight, X } from "lucide-react";

export default function ProductCard({ product }) {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
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
          <h3 className="font-semibold text-stone-800 line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-between pt-1">
            <span className="text-2xl font-bold text-orange-500">${product.price}</span>
            
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1.5 bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-orange-600 transition-all"
            >
              View Details <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

     
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 bg-stone-100 rounded-full hover:bg-orange-100 text-stone-500 hover:text-orange-600 transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            <div className="p-8">
              <img src={product.image} className="w-full h-64 object-cover rounded-2xl mb-6" alt="" />
              <h2 className="text-2xl font-bold text-stone-800">{product.name}</h2>
              <p className="text-stone-500 mt-4 leading-relaxed">{product.description || "No description available."}</p>
              <div className="flex items-center justify-between mt-8">
                <span className="text-3xl font-bold text-orange-500">${product.price}</span>
                <button className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-orange-600 transition-all">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}