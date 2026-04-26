"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Order {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  items: { productId: string; quantity: number; price: number; product?: { name: string } }[];
}

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user, router]);

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get("/orders/my");
      return data;
    },
    enabled: !!user,
  });

  if (isLoading) return (
    <div className="container mx-auto px-4 py-10 space-y-4">
      {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {!orders?.length ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-mono">#{order.id.slice(0, 8)}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColor[order.status] || "bg-gray-100"}`}>
                  {order.status}
                </span>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="font-bold text-amber-700">${order.total.toFixed(2)}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {order.items.map((item, i) => (
                    <span key={i}>{item.product?.name || item.productId} × {item.quantity}{i < order.items.length - 1 ? ", " : ""}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
