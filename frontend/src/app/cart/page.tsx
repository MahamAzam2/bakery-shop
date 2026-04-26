"use client";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const cartTotal = total();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some delicious items to get started.</p>
        <Link href="/products">
          <Button className="bg-amber-700 hover:bg-amber-800">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-xl bg-white">
              <div className="w-20 h-20 bg-amber-50 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                {item.image.startsWith("http") ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span>{item.image}</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-amber-700 font-bold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-right min-w-[60px]">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => removeItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button variant="ghost" className="text-red-500" onClick={clearCart}>
            <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
          </Button>
        </div>

        {/* Summary */}
        <div className="border rounded-xl p-6 bg-white h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span className="text-amber-700">${cartTotal.toFixed(2)}</span>
          </div>
          <Link href="/checkout">
            <Button className="w-full bg-amber-700 hover:bg-amber-800" size="lg">
              Proceed to Checkout
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="w-full mt-3">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
