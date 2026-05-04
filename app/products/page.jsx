"use client"; 

import { useState } from "react"; 
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";

export default function ProductsPage() {
  
  const [selectedCategory, setSelectedCategory] = useState("All");

  
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Summer Collection</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">Browse all our premium summer essentials.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)} 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                selectedCategory === cat 
                  ? "bg-orange-500 text-white border-orange-500 shadow-md" 
                  : "bg-white border-orange-200 text-stone-600 hover:border-orange-400 hover:text-orange-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

       
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-stone-400">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}