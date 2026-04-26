import { Croissant } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-20" style={{borderTop: '1px solid rgba(251,146,60,0.12)'}}>
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.5), transparent)'}} />

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10"
        style={{background: 'rgba(18,12,8,0.6)'}}>

        <div>
          <div className="flex items-center gap-2 font-black text-lg mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{background: 'linear-gradient(135deg, #fbbf24, #f97316)', boxShadow: '0 0 12px rgba(251,146,60,0.4)'}}>
              <Croissant className="h-3.5 w-3.5 text-gray-900" />
            </div>
            <span style={{background: 'linear-gradient(90deg, #fbbf24, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              La Boulangerie
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Fresh baked goods made with love every morning. Tradition meets artistry in every bite.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-amber-400 mb-4 text-sm uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[["Bread", "/products?category=bread"], ["Pastries", "/products?category=pastries"], ["Cakes", "/products?category=cakes"]].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="hover:text-amber-400 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-amber-400 mb-4 text-sm uppercase tracking-wider">Account</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[["Login", "/auth/login"], ["Register", "/auth/register"], ["My Orders", "/orders"], ["Contact", "/contact"]].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="hover:text-amber-400 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center py-4 text-xs text-muted-foreground"
        style={{borderTop: '1px solid rgba(251,146,60,0.08)'}}>
        © {new Date().getFullYear()} La Boulangerie. Crafted with ❤️ and butter.
      </div>
    </footer>
  );
}
