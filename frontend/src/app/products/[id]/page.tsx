"use client";
import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id);
  const addItem = useCartStore((s) => s.addItem);

  if (isLoading) return (
    <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <Skeleton className="h-96 rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );

  if (!product) return <div className="container mx-auto px-4 py-20 text-center">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <Link href="/products" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-700 mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-amber-50 rounded-2xl h-96 flex items-center justify-center text-8xl overflow-hidden">
          {product.image.startsWith("http") ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-2xl" />
          ) : (
            <span>{product.image}</span>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <Badge variant="secondary" className="w-fit capitalize mb-3">{product.category}</Badge>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {product.rating && (
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating!) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
              ))}
              <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
            </div>
          )}

          <p className="text-muted-foreground mb-6">{product.description}</p>
          <p className="text-3xl font-bold text-amber-700 mb-6">${product.price.toFixed(2)}</p>

          <div className="flex gap-3">
            <Button
              size="lg"
              className="bg-amber-700 hover:bg-amber-800"
              disabled={product.stock === 0}
              onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
            <Link href="/cart">
              <Button size="lg" variant="outline">View Cart</Button>
            </Link>
          </div>

          {product.stock > 0 && product.stock < 10 && (
            <p className="text-sm text-orange-600 mt-3">Only {product.stock} left!</p>
          )}
        </div>
      </div>
    </div>
  );
}
