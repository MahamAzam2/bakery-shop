"use client";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, Croissant } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Only read from store after mount to avoid hydration mismatch
  const itemCount = useCartStore((s) => s.itemCount)();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(18, 12, 8, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(251, 146, 60, 0.12)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(35 95% 55%), hsl(25 90% 45%))",
              boxShadow: "0 0 15px rgba(251,146,60,0.4)",
            }}
          >
            <Croissant className="h-4 w-4 text-gray-900" />
          </div>
          <span
            style={{
              background: "linear-gradient(90deg, #fbbf24, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            La Boulangerie
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {[
            ["Shop", "/products"],
            ["Bread", "/products?category=bread"],
            ["Pastries", "/products?category=pastries"],
            ["Cakes", "/products?category=cakes"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-muted-foreground hover:text-amber-400 transition-colors relative group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link href="/cart">
            <button
              className="relative p-2 rounded-lg text-muted-foreground hover:text-amber-400 transition-colors"
              style={{
                background: "rgba(251,146,60,0.05)",
                border: "1px solid rgba(251,146,60,0.1)",
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              {/* Only render badge after mount to avoid hydration mismatch */}
              {mounted && itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center font-bold text-gray-900"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24, #f97316)",
                    boxShadow: "0 0 8px rgba(251,146,60,0.6)",
                  }}
                >
                  {itemCount}
                </span>
              )}
            </button>
          </Link>

          {/* Auth */}
          {mounted && user ? (
            <div className="flex items-center gap-2">
              {user.role === "admin" && (
                <Link href="/admin">
                  <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 neon-border hover:bg-amber-400/10 transition-all">
                    Dashboard
                  </button>
                </Link>
              )}
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-amber-400 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth/login">
              <button
                className="p-2 rounded-lg text-muted-foreground hover:text-amber-400 transition-colors"
                style={{
                  background: "rgba(251,146,60,0.05)",
                  border: "1px solid rgba(251,146,60,0.1)",
                }}
              >
                <User className="h-5 w-5" />
              </button>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-amber-400 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 py-4 flex flex-col gap-3"
          style={{
            borderTop: "1px solid rgba(251,146,60,0.1)",
            background: "rgba(18,12,8,0.95)",
          }}
        >
          {[
            ["Shop All", "/products"],
            ["Bread", "/products?category=bread"],
            ["Pastries", "/products?category=pastries"],
            ["Cakes", "/products?category=cakes"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-muted-foreground hover:text-amber-400 transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
