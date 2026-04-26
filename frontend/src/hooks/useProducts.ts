import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "bread" | "pastries" | "cakes";
  stock: number;
  rating?: number;
}

export function useProducts(category?: string) {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      const params = category ? `?category=${category}` : "";
      const { data } = await api.get(`/products${params}`);
      return data;
    },
  });
}

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
