"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2, Plus, Loader2, Package, ShoppingBag, Users } from "lucide-react";

type Category = "bread" | "pastries" | "cakes";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  stock: number;
}

interface Product extends ProductFormData {
  id: string;
  rating?: number;
}

interface Order {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  user?: { name: string; email: string };
}

const EMPTY: ProductFormData = {
  name: "", description: "", price: 0, image: "", category: "bread", stock: 0,
};

function ProductForm({
  initial, onSave, onCancel, saving,
}: {
  initial: ProductFormData;
  onSave: (d: ProductFormData) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [f, setF] = useState<ProductFormData>(initial);
  return (
    <div className="border rounded-xl p-5 bg-amber-50 space-y-3 mb-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label>Name</Label>
          <Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label>Price ($)</Label>
          <Input type="number" step="0.01" value={f.price} onChange={(e) => setF({ ...f, price: +e.target.value })} />
        </div>
      </div>
      <div className="space-y-1">
        <Label>Description</Label>
        <Input value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <Label>Category</Label>
          <Select value={f.category} onValueChange={(v) => setF({ ...f, category: v as Category })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="bread">Bread</SelectItem>
              <SelectItem value="pastries">Pastries</SelectItem>
              <SelectItem value="cakes">Cakes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Stock</Label>
          <Input type="number" value={f.stock} onChange={(e) => setF({ ...f, stock: +e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label>Image (emoji or URL)</Label>
          <Input value={f.image} onChange={(e) => setF({ ...f, image: e.target.value })} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="bg-amber-700 hover:bg-amber-800" onClick={() => onSave(f)} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-3 w-3 animate-spin" />} Save
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const qc = useQueryClient();
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") router.push("/");
  }, [user, router]);

  const { data: products, isLoading: loadingProducts } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => (await api.get("/products")).data,
  });

  const { data: orders, isLoading: loadingOrders } = useQuery<Order[]>({
    queryKey: ["admin-orders"],
    queryFn: async () => (await api.get("/orders")).data,
  });

  const createMutation = useMutation({
    mutationFn: (data: ProductFormData) => api.post("/products", data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["products"] }); setShowForm(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductFormData }) => api.patch(`/products/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["products"] }); setEditId(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });

  const updateOrderStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`/orders/${id}/status`, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-orders"] }),
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">Manage your bakery</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <Package className="h-8 w-8 text-amber-600" />
            <div>
              <p className="text-2xl font-bold">{products?.length ?? "—"}</p>
              <p className="text-sm text-muted-foreground">Products</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">{orders?.length ?? "—"}</p>
              <p className="text-sm text-muted-foreground">Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <Users className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">
                ${(orders?.reduce((s, o) => s + o.total, 0) ?? 0).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Products</h2>
            <Button size="sm" className="bg-amber-700 hover:bg-amber-800"
              onClick={() => { setShowForm(true); setEditId(null); }}>
              <Plus className="h-4 w-4 mr-1" /> Add Product
            </Button>
          </div>

          {showForm && (
            <ProductForm
              initial={EMPTY}
              onSave={(d) => createMutation.mutate(d)}
              onCancel={() => setShowForm(false)}
              saving={createMutation.isPending}
            />
          )}

          {loadingProducts ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
            </div>
          ) : (
            <div className="space-y-3">
              {products?.map((p) => (
                <div key={p.id}>
                  {editId === p.id ? (
                    <ProductForm
                      initial={{ name: p.name, description: p.description, price: p.price, image: p.image, category: p.category, stock: p.stock }}
                      onSave={(d) => updateMutation.mutate({ id: p.id, data: d })}
                      onCancel={() => setEditId(null)}
                      saving={updateMutation.isPending}
                    />
                  ) : (
                    <div className="flex items-center gap-4 p-4 border rounded-xl bg-white">
                      <div className="text-2xl w-10 text-center">
                        {p.image.startsWith("http") ? "🖼" : p.image}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{p.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{p.category} · Stock: {p.stock}</p>
                      </div>
                      <span className="font-bold text-amber-700">${p.price.toFixed(2)}</span>
                      <Button variant="ghost" size="icon" onClick={() => setEditId(p.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500"
                        onClick={() => deleteMutation.mutate(p.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <h2 className="text-xl font-semibold mb-4">All Orders</h2>
          {loadingOrders ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
            </div>
          ) : (
            <div className="space-y-3">
              {orders?.map((order) => (
                <div key={order.id} className="flex items-center gap-4 p-4 border rounded-xl bg-white">
                  <div className="flex-1">
                    <p className="font-mono text-sm font-medium">#{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.user?.name} · {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-bold text-amber-700">${order.total.toFixed(2)}</span>
                  <Select value={order.status}
                    onValueChange={(v) => updateOrderStatus.mutate({ id: order.id, status: v })}>
                    <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
