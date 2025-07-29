import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Heart,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layout/MainLayout";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: {
    name: string;
    verified?: boolean;
  };
  quantity: number;
  inStock: boolean;
  maxQuantity: number;
  discount?: number;
}

const CartPage = () => {
  // Mock cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 129.99,
      originalPrice: 159.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
      vendor: { name: "AudioTech", verified: true },
      quantity: 1,
      inStock: true,
      maxQuantity: 5,
      discount: 20,
    },
    {
      id: "2",
      name: "Smart Watch Series 5",
      price: 299.99,
      originalPrice: 349.99,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
      vendor: { name: "SmartLife", verified: true },
      quantity: 2,
      inStock: true,
      maxQuantity: 3,
      discount: 15,
    },
    {
      id: "3",
      name: "Ergonomic Office Chair",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=300&q=80",
      vendor: { name: "ComfortZone", verified: false },
      quantity: 1,
      inStock: false,
      maxQuantity: 2,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const moveToWishlist = (id: string) => {
    // Mock function - would integrate with wishlist functionality
    removeItem(id);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo("SAVE10");
      setPromoCode("");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  const inStockItems = cartItems.filter((item) => item.inStock);
  const outOfStockItems = cartItems.filter((item) => !item.inStock);

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 bg-background">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link to="/">
              <Button size="lg" className="px-8">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 bg-background">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in
                your cart
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* In Stock Items */}
            {inStockItems.length > 0 && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Available Items ({inStockItems.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {inStockItems.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg border"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <Link
                                to={`/product/${item.id}`}
                                className="font-medium text-gray-900 hover:text-primary line-clamp-2"
                              >
                                {item.name}
                              </Link>
                              <div className="flex items-center mt-1">
                                <span className="text-sm text-gray-500">
                                  Sold by {item.vendor.name}
                                </span>
                                {item.vendor.verified && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 border-green-500 text-green-500 text-xs px-1 py-0"
                                  >
                                    Verified
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Price and Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {/* Price */}
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-lg">
                                  ${item.price.toFixed(2)}
                                </span>
                                {item.originalPrice &&
                                  item.originalPrice > item.price && (
                                    <span className="text-sm text-gray-500 line-through">
                                      ${item.originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                {item.discount && (
                                  <Badge className="bg-red-500 text-white text-xs">
                                    {item.discount}% OFF
                                  </Badge>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  disabled={item.quantity >= item.maxQuantity}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveToWishlist(item.id)}
                                className="text-gray-500 hover:text-primary"
                              >
                                <Heart className="h-4 w-4 mr-1" />
                                Save for Later
                              </Button>
                            </div>
                          </div>

                          {/* Stock Warning */}
                          {item.quantity >= item.maxQuantity && (
                            <p className="text-sm text-amber-600 mt-2">
                              Only {item.maxQuantity} left in stock
                            </p>
                          )}
                        </div>
                      </div>
                      {index < inStockItems.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Out of Stock Items */}
            {outOfStockItems.length > 0 && (
              <Card className="bg-white border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <span>⚠</span>
                    Out of Stock Items ({outOfStockItems.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {outOfStockItems.map((item, index) => (
                    <div key={item.id} className="opacity-60">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg border grayscale"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-medium bg-red-500 px-2 py-1 rounded">
                              Out of Stock
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium text-gray-900 line-clamp-2">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Sold by {item.vendor.name}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-bold text-lg">
                              ${item.price.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => moveToWishlist(item.id)}
                              >
                                <Heart className="h-4 w-4 mr-1" />
                                Move to Wishlist
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < outOfStockItems.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Promo Code */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                      <div>
                        <span className="font-medium text-green-800">
                          {appliedPromo}
                        </span>
                        <p className="text-sm text-green-600">
                          10% discount applied
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removePromoCode}
                        className="text-green-600 hover:text-green-800"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={applyPromoCode}
                        disabled={!promoCode.trim()}
                        size="sm"
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Try "SAVE10" for 10% off
                  </p>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({inStockItems.length} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over $50
                      </p>
                    )}
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <div className="space-y-3">
                <Link to="/checkout" className="w-full">
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={inStockItems.length === 0}
                  >
                    Proceed to Checkout
                    {inStockItems.length > 0 && (
                      <span className="ml-2">
                        ($
                        {inStockItems
                          .reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0,
                          )
                          .toFixed(2)}
                        )
                      </span>
                    )}
                  </Button>
                </Link>
                {outOfStockItems.length > 0 && (
                  <p className="text-xs text-muted-foreground text-center">
                    Out of stock items will not be included in checkout
                  </p>
                )}
              </div>

              {/* Security Badge */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span>🔒</span>
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
