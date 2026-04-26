"use client";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/hooks/useProducts";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="glass-card rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 flex items-center justify-center text-6xl"
          style={{background: 'linear-gradient(135deg, rgba(251,146,60,0.1) 0%, rgba(180,80,20,0.06) 100%)'}}>
          {product.image.startsWith("http") ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="float-anim">{product.image}</span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{background: 'rgba(0,0,0,0.6)'}}>
              <span className="text-sm font-bold text-red-400">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <span className="text-xs text-amber-500 font-semibold uppercase tracking-wider capitalize">{product.category}</span>
          <h3 className="font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 flex-1">{product.description}</p>

          <div className="flex items-center justify-between mt-3">
            <span className="text-xl font-black text-amber-400">${product.price.toFixed(2)}</span>
            {product.rating && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {product.rating}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="mt-3 w-full py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              background: product.stock === 0 ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, rgba(251,146,60,0.2), rgba(180,80,20,0.15))',
              border: '1px solid rgba(251,146,60,0.25)',
              color: product.stock === 0 ? '#666' : '#fbbf24',
            }}
            onMouseEnter={(e) => {
              if (product.stock > 0) {
                (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #fbbf24, #f97316)';
                (e.currentTarget as HTMLButtonElement).style.color = '#111';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(251,146,60,0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (product.stock > 0) {
                (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(251,146,60,0.2), rgba(180,80,20,0.15))';
                (e.currentTarget as HTMLButtonElement).style.color = '#fbbf24';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
              }
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}
