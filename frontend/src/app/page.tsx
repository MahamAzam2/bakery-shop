import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles, ChefHat } from "lucide-react";

const categories = [
  { name: "Bread", slug: "bread", emoji: "🍞", desc: "Sourdough, baguettes & more", color: "from-amber-900/40 to-orange-900/20" },
  { name: "Pastries", slug: "pastries", emoji: "🥐", desc: "Croissants, danishes & tarts", color: "from-yellow-900/40 to-amber-900/20" },
  { name: "Cakes", slug: "cakes", emoji: "🎂", desc: "Custom cakes for every occasion", color: "from-orange-900/40 to-red-900/20" },
];

const featured = [
  { id: "sourdough-loaf", name: "Sourdough Loaf", price: 8.99, category: "Bread", rating: 4.9, image: "🍞", badge: "Bestseller" },
  { id: "butter-croissant", name: "Butter Croissant", price: 3.49, category: "Pastries", rating: 4.8, image: "🥐", badge: "Fresh Daily" },
  { id: "chocolate-cake", name: "Chocolate Cake", price: 34.99, category: "Cakes", rating: 5.0, image: "🎂", badge: "⭐ Top Rated" },
  { id: "cinnamon-roll", name: "Cinnamon Roll", price: 4.99, category: "Pastries", rating: 4.7, image: "🌀", badge: "Popular" },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">

      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-24">

        {/* Ambient orbs */}
        <div className="bg-orb w-[600px] h-[600px] bg-amber-500 top-[-200px] left-[-200px]" style={{position:'absolute'}} />
        <div className="bg-orb w-[400px] h-[400px] bg-orange-600 bottom-[-100px] right-[-100px]" style={{position:'absolute'}} />
        <div className="bg-orb w-[300px] h-[300px] bg-yellow-500 top-[30%] right-[20%]" style={{position:'absolute', opacity: 0.06}} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{backgroundImage: 'linear-gradient(rgba(251,146,60,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.8) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 neon-border"
            style={{background: 'rgba(251,146,60,0.08)'}}>
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">Fresh Baked Every Morning</span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight">
            <span className="shimmer-text">Artisan</span>
            <br />
            <span className="shimmer-text text-3d">Baked Goods</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Handcrafted with love using traditional recipes. From crusty sourdoughs to
            delicate pastries — taste the difference quality makes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="glow-btn px-8 py-4 rounded-xl text-gray-900 font-bold text-lg flex items-center gap-2">
                Shop Now <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/products?category=cakes">
              <button className="px-8 py-4 rounded-xl font-bold text-lg border neon-border text-amber-400 hover:bg-amber-400/10 transition-all duration-300">
                Order a Cake
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-16">
            {[["500+", "Happy Customers"], ["15+", "Years Baking"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-black shimmer-text">{num}</p>
                <p className="text-muted-foreground text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black shimmer-text text-3d mb-3">Browse Categories</h2>
          <p className="text-muted-foreground">Find exactly what you&apos;re craving</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/products?category=${cat.slug}`}>
              <div className={`glass-card rounded-2xl p-8 text-center cursor-pointer bg-gradient-to-br ${cat.color} relative overflow-hidden group`}>
                {/* Inner glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{background: 'radial-gradient(circle at 50% 50%, rgba(251,146,60,0.08) 0%, transparent 70%)'}} />

                <div className="float-anim text-6xl mb-4 relative z-10">{cat.emoji}</div>
                <h3 className="font-black text-xl text-white mb-2 relative z-10">{cat.name}</h3>
                <p className="text-muted-foreground text-sm relative z-10">{cat.desc}</p>

                <div className="mt-4 inline-flex items-center gap-1 text-amber-400 text-sm font-medium relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="relative py-20 px-4">
        {/* Section background */}
        <div className="absolute inset-0 opacity-30"
          style={{background: 'radial-gradient(ellipse at 50% 50%, rgba(251,146,60,0.05) 0%, transparent 70%)'}} />

        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black shimmer-text text-3d mb-2">Customer Favorites</h2>
              <p className="text-muted-foreground">Our most loved baked goods</p>
            </div>
            <Link href="/products">
              <button className="hidden md:flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors">
                View all <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <Link key={p.id} href={`/products/${p.id}`}>
                <div className="glass-card rounded-2xl overflow-hidden cursor-pointer group">
                  {/* Image area */}
                  <div className="relative h-48 flex items-center justify-center text-6xl"
                    style={{background: `linear-gradient(135deg, rgba(251,146,60,0.12) 0%, rgba(180,80,20,0.08) 100%)`}}>
                    <span className="float-anim" style={{animationDelay: `${i * 0.5}s`}}>{p.image}</span>
                    {/* Badge */}
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold"
                      style={{background: 'rgba(251,146,60,0.2)', color: '#fbbf24', border: '1px solid rgba(251,146,60,0.3)'}}>
                      {p.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <span className="text-xs text-amber-500 font-semibold uppercase tracking-wider">{p.category}</span>
                    <h3 className="font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">{p.name}</h3>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-2xl font-black text-amber-400">${p.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-muted-foreground">{p.rating}</span>
                      </div>
                    </div>

                    {/* Add to cart hint */}
                    <div className="mt-3 w-full py-2 rounded-lg text-center text-sm font-medium text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 neon-border">
                      Add to Cart
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass-card rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20"
            style={{background: 'radial-gradient(ellipse at 30% 50%, rgba(251,146,60,0.15) 0%, transparent 60%)'}} />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              { icon: "🌾", title: "Natural Ingredients", desc: "Only the finest organic flour, butter, and seasonal produce" },
              { icon: "👨‍🍳", title: "Master Bakers", desc: "Trained artisans with decades of traditional baking experience" },
              { icon: "🚚", title: "Fresh Delivery", desc: "Baked at dawn, delivered to your door by morning" },
            ].map((item) => (
              <div key={item.title} className="group">
                <div className="text-5xl mb-4 float-anim">{item.icon}</div>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
