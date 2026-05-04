import Link from "next/link";
import { Sun, Mail, Phone, MapPin } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-orange-400 rounded-xl flex items-center justify-center">
                <Sun size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-orange-400">Sun</span>
                <span className="text-white">Cart</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone-400">
              Your one-stop destination for premium summer essentials.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-orange-400 transition-colors">Products</Link></li>
              <li><Link href="/my-profile" className="hover:text-orange-400 transition-colors">My Profile</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail size={15} className="text-orange-400" />azadhossain016288@gmail.com</li>
              <li className="flex items-center gap-2"><Phone size={15} className="text-orange-400" /> (+88) 01628893299</li>
              <li className="flex items-start gap-2"><MapPin size={15} className="text-orange-400 mt-0.5" />Amborkhana,Sylhet</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {["🔷 𝐟", "⬛ 𝐠", "🔵 𝖎𝖓"].map((icon, i) => (
                <button key={i} className="w-9 h-9 rounded-xl bg-stone-700 hover:bg-orange-500 flex items-center justify-center transition-colors text-sm">
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} SunCart. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-orange-400">Privacy Policy</Link>
            <Link href="#" className="hover:text-orange-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}