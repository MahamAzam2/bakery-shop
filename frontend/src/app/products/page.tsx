"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/products/ProductCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = ["all", "bread", "pastries", "cakes"];

function CategoryTabs() {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "all";
  return (
    <Tabs value={active} className="mb-8">
      <TabsList>
        {CATEGORIES.map((cat) => (
          <Link key={cat} href={cat === "all" ? "/products" : `/products?category=${cat}`}>
            <TabsTrigger value={cat} className="capitalize">{cat}</TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}

function ProductGrid() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const { data: products, isLoading, error } = useProducts(category);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p>Could not load products. Make sure the backend is running.</p>
      </div>
    );
  }

  if (!products?.length) {
    return <div className="text-center py-20 text-muted-foreground">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Our Baked Goods</h1>
      <p className="text-muted-foreground mb-8">Fresh from the oven every morning</p>
      <Suspense fallback={<div className="h-10 w-80 bg-gray-100 rounded-lg animate-pulse mb-8" />}>
        <CategoryTabs />
      </Suspense>
      <Suspense fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-xl" />)}
        </div>
      }>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
