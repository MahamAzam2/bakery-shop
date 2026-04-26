"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const STEPS = ["Delivery", "Payment", "Review"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [delivery, setDelivery] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/orders", {
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity, price: i.price })),
        delivery,
        total: total(),
      });
      setOrderId(data.id);
      clearCart();
      setStep(3);
    } catch {
      alert("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
        <p className="text-muted-foreground mb-2">Thank you for your order.</p>
        {orderId && <p className="text-sm font-mono bg-gray-100 rounded px-3 py-1 inline-block mb-6">Order #{orderId}</p>}
        <div className="flex gap-3 justify-center">
          <Link href="/orders"><Button variant="outline">View Orders</Button></Link>
          <Link href="/products"><Button className="bg-amber-700 hover:bg-amber-800">Continue Shopping</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${i <= step ? "bg-amber-700 text-white" : "bg-gray-200 text-gray-500"}`}>
              {i + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${i === step ? "text-amber-700" : "text-muted-foreground"}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`h-px w-12 mx-3 ${i < step ? "bg-amber-700" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 0: Delivery */}
          {step === 0 && (
            <Card>
              <CardHeader><CardTitle>Delivery Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input value={delivery.name} onChange={(e) => setDelivery({ ...delivery, name: e.target.value })} placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" value={delivery.email} onChange={(e) => setDelivery({ ...delivery, email: e.target.value })} placeholder="jane@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Street Address</Label>
                  <Input value={delivery.address} onChange={(e) => setDelivery({ ...delivery, address: e.target.value })} placeholder="123 Baker St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input value={delivery.city} onChange={(e) => setDelivery({ ...delivery, city: e.target.value })} placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP Code</Label>
                    <Input value={delivery.zip} onChange={(e) => setDelivery({ ...delivery, zip: e.target.value })} placeholder="10001" />
                  </div>
                </div>
                <Button className="w-full bg-amber-700 hover:bg-amber-800" onClick={() => setStep(1)}
                  disabled={!delivery.name || !delivery.email || !delivery.address || !delivery.city || !delivery.zip}>
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <Card>
              <CardHeader><CardTitle>Payment Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} placeholder="4242 4242 4242 4242" maxLength={19} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} placeholder="123" maxLength={3} type="password" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">🔒 This is a demo — no real payment is processed.</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                  <Button className="flex-1 bg-amber-700 hover:bg-amber-800" onClick={() => setStep(2)}
                    disabled={!payment.cardNumber || !payment.expiry || !payment.cvv}>
                    Review Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <Card>
              <CardHeader><CardTitle>Review Your Order</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Delivering to:</p>
                  <p className="text-sm text-muted-foreground">{delivery.name} · {delivery.address}, {delivery.city} {delivery.zip}</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-amber-700">${total().toFixed(2)}</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button className="flex-1 bg-amber-700 hover:bg-amber-800" onClick={handlePlaceOrder} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Place Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="border rounded-xl p-5 bg-white h-fit">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-amber-700">${total().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
