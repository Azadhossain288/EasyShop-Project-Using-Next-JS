import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";

export default function ProductsPage() {
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Summer Collection</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">Browse all our premium summer essentials.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <span key={cat} className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all ${cat === "All" ? "bg-orange-500 text-white" : "bg-white border border-orange-200 text-stone-600 hover:border-orange-400 hover:text-orange-500"}`}>
              {cat}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}