import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: {
    name: string;
    verified?: boolean;
  };
  rating: number;
  reviewCount: number;
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  onAddToCart?: (id: string) => void;
  onAddToFavorite?: (id: string) => void;
  className?: string;
}

const ProductCard = ({
  id = "1",
  name = "Premium Wireless Headphones",
  price = 129.99,
  originalPrice = 159.99,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
  vendor = { name: "AudioTech", verified: true },
  rating = 4.5,
  reviewCount = 128,
  discount = 20,
  isNew = false,
  isFeatured = false,
  onAddToCart = () => {},
  onAddToFavorite = () => {},
  className,
}: ProductCardProps) => {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-white",
        className,
      )}
    >
      {/* Discount badge */}
      {discount && (
        <Badge className="absolute top-2 left-2 z-10 bg-red-500 text-white">
          {discount}% OFF
        </Badge>
      )}

      {/* New badge */}
      {isNew && (
        <Badge className="absolute top-2 right-2 z-10 bg-blue-500 text-white">
          NEW
        </Badge>
      )}

      {/* Featured badge */}
      {isFeatured && (
        <Badge className="absolute top-10 right-2 z-10 bg-amber-500 text-white">
          FEATURED
        </Badge>
      )}

      {/* Product image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick action buttons */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/90 text-gray-800 hover:bg-white hover:text-primary"
            onClick={() => onAddToFavorite(id)}
          >
            <Heart className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/90 text-gray-800 hover:bg-white hover:text-primary"
            onClick={() => onAddToCart(id)}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Vendor info */}
        <div className="mb-1 flex items-center">
          <span className="text-xs text-gray-500">{vendor.name}</span>
          {vendor.verified && (
            <Badge
              variant="outline"
              className="ml-2 border-green-500 text-green-500 text-[10px] px-1 py-0"
            >
              Verified
            </Badge>
          )}
        </div>

        {/* Product name */}
        <h3 className="mb-1 line-clamp-2 font-medium text-gray-900 hover:text-primary">
          {name}
        </h3>

        {/* Rating */}
        <div className="mb-2 flex items-center">
          <div className="flex items-center">
            <Star className="mr-1 h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
          <span className="mx-1 text-xs text-gray-400">|</span>
          <span className="text-xs text-gray-500">{reviewCount} reviews</span>
        </div>

        {/* Price */}
        <div className="flex items-center">
          <span className="text-base font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to cart button (visible on mobile) */}
        <Button
          className="mt-3 w-full md:hidden"
          size="sm"
          onClick={() => onAddToCart(id)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
