import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Share2,
  Star,
  Truck,
  Shield,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Create a simple product card component since we can't import it
const RelatedProductCard = ({
  id = "1",
  name = "Product Name",
  price = 99.99,
  discountPrice = null,
  rating = 4.5,
  reviewCount = 100,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  vendor = { name: "Vendor Name" },
}) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col bg-white">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex items-center mb-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            {reviewCount}
          </span>
        </div>
        <h3 className="font-medium line-clamp-2 mb-1 flex-grow">{name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{vendor.name}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            {discountPrice ? (
              <>
                <span className="font-bold">${discountPrice.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground line-through">
                  ${price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold">${price.toFixed(2)}</span>
            )}
          </div>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: id || "1",
    name: "Premium Wireless Noise-Cancelling Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones featuring advanced noise-cancellation technology, comfortable over-ear design, and 30+ hours of battery life.",
    price: 299.99,
    discountPrice: 249.99,
    rating: 4.8,
    reviewCount: 256,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&q=80",
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
      "https://images.unsplash.com/photo-1563627806368-f172ae9076bb?w=800&q=80",
    ],
    colors: ["Black", "White", "Blue"],
    specifications: [
      { name: "Connectivity", value: "Bluetooth 5.2" },
      { name: "Battery Life", value: "30 hours" },
      { name: "Noise Cancellation", value: "Active" },
      { name: "Weight", value: "250g" },
      { name: "Warranty", value: "2 years" },
    ],
    vendor: {
      id: "101",
      name: "AudioTech Pro",
      rating: 4.9,
      products: 128,
      responseRate: "98%",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AudioTech",
    },
  };

  // Mock related products
  const relatedProducts = [
    {
      id: "2",
      name: "Wireless Earbuds with Charging Case",
      price: 129.99,
      discountPrice: 99.99,
      rating: 4.6,
      reviewCount: 189,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80",
      vendor: { name: "AudioTech Pro" },
    },
    {
      id: "3",
      name: "Portable Bluetooth Speaker",
      price: 89.99,
      discountPrice: null,
      rating: 4.5,
      reviewCount: 142,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      vendor: { name: "SoundWave" },
    },
    {
      id: "4",
      name: "Premium Audio Cable Set",
      price: 49.99,
      discountPrice: 39.99,
      rating: 4.7,
      reviewCount: 98,
      image:
        "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=800&q=80",
      vendor: { name: "CableExperts" },
    },
    {
      id: "5",
      name: "Headphone Stand with USB Hub",
      price: 59.99,
      discountPrice: null,
      rating: 4.4,
      reviewCount: 76,
      image:
        "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?w=800&q=80",
      vendor: { name: "TechAccessories" },
    },
  ];

  // Mock reviews
  const reviews = [
    {
      id: "1",
      user: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      rating: 5,
      date: "2023-10-15",
      title: "Best headphones I've ever owned",
      comment:
        "The sound quality is exceptional and the noise cancellation works perfectly. Battery life is impressive too!",
    },
    {
      id: "2",
      user: "Sarah Miller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 4,
      date: "2023-09-28",
      title: "Great quality but a bit heavy",
      comment:
        "Sound is amazing and build quality is premium. My only complaint is they get a bit uncomfortable after several hours of use.",
    },
    {
      id: "3",
      user: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
      date: "2023-09-10",
      title: "Worth every penny",
      comment:
        "These headphones have transformed my listening experience. The app integration is seamless and the sound customization options are fantastic.",
    },
  ];

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleImageChange = (index: number) => {
    setMainImage(index);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-background">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6 text-muted-foreground">
        <span className="hover:text-primary cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="hover:text-primary cursor-pointer">Electronics</span>
        <span className="mx-2">/</span>
        <span className="hover:text-primary cursor-pointer">Audio</span>
        <span className="mx-2">/</span>
        <span className="text-foreground">Headphones</span>
      </div>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.images[mainImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${mainImage === index ? "border-primary" : "border-transparent"}`}
                onClick={() => handleImageChange(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} - view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">
                  {product.rating}
                </span>
              </div>
              <span className="mx-2 text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">
                {product.reviewCount} reviews
              </span>
              <span className="mx-2 text-muted-foreground">|</span>
              <span className="text-sm text-green-600">
                {product.stock} in stock
              </span>
            </div>
          </div>

          <div className="flex items-baseline">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-bold text-primary">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-xl text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
                <Badge className="ml-3 bg-red-500">
                  Save ${(product.price - product.discountPrice).toFixed(2)}
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div>
            <h3 className="font-medium mb-3">Color</h3>
            <div className="flex space-x-3">
              {product.colors.map((color, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  className="px-4"
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 gap-2" size="lg">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
            <Button className="flex-1" size="lg" variant="secondary">
              Buy Now
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">2-Year Warranty</p>
                <p className="text-xs text-muted-foreground">Full coverage</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-4">
            <img
              src={product.vendor.avatar}
              alt={product.vendor.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium">{product.vendor.name}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>
                  {product.vendor.rating} | {product.vendor.products} products |{" "}
                  {product.vendor.responseRate} response
                </span>
              </div>
            </div>
            <Button variant="outline" className="ml-auto">
              Visit Store
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="specifications">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger
              value="specifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
            >
              Reviews ({reviews.length})
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
            >
              Shipping & Returns
            </TabsTrigger>
          </TabsList>
          <TabsContent value="specifications" className="pt-6">
            <Card>
              <CardContent className="p-6">
                <table className="w-full">
                  <tbody>
                    {product.specifications.map((spec, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-muted/50" : ""}
                      >
                        <td className="py-3 px-4 font-medium">{spec.name}</td>
                        <td className="py-3 px-4">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="pb-6 border-b last:border-0"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{review.user}</p>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-xs text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-medium mb-1">{review.title}</h4>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shipping" className="pt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Shipping Information
                    </h3>
                    <p className="text-muted-foreground">
                      Orders are typically processed and shipped within 1-2
                      business days. Standard shipping takes 3-5 business days,
                      while express shipping options are available at checkout
                      for faster delivery.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Return Policy</h3>
                    <p className="text-muted-foreground">
                      We offer a 30-day return policy for most items. Products
                      must be returned in their original packaging and in unused
                      condition. Please contact our customer service team to
                      initiate a return.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Warranty</h3>
                    <p className="text-muted-foreground">
                      This product comes with a 2-year manufacturer's warranty
                      covering defects in materials and workmanship. Extended
                      warranty options may be available at checkout.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Related Products</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <RelatedProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              discountPrice={product.discountPrice}
              rating={product.rating}
              reviewCount={product.reviewCount}
              image={product.image}
              vendor={product.vendor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
