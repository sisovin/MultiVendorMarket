import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./product/ProductCard";
import ProductGrid from "./product/ProductGrid";

const HomePage = () => {
  // Mock data for categories
  const categories = [
    {
      id: 1,
      name: "Electronics",
      icon: "🔌",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80",
    },
    {
      id: 2,
      name: "Fashion",
      icon: "👕",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
    },
    {
      id: 3,
      name: "Home & Garden",
      icon: "🏡",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80",
    },
    {
      id: 4,
      name: "Beauty",
      icon: "💄",
      image:
        "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&q=80",
    },
    {
      id: 5,
      name: "Sports",
      icon: "⚽",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80",
    },
    {
      id: 6,
      name: "Toys",
      icon: "🧸",
      image:
        "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80",
    },
    {
      id: 7,
      name: "Automotive",
      icon: "🚗",
      image:
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&q=80",
    },
    {
      id: 8,
      name: "Books",
      icon: "📚",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80",
    },
  ];

  // Mock data for featured banners
  const featuredBanners = [
    {
      id: 1,
      title: "Summer Collection",
      description: "Discover the latest trends for the season",
      image:
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
      link: "/category/summer",
    },
    {
      id: 2,
      title: "Tech Gadgets",
      description: "Innovative products for modern living",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
      link: "/category/tech",
    },
    {
      id: 3,
      title: "Home Essentials",
      description: "Transform your living space",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
      link: "/category/home",
    },
  ];

  // Mock data for trending products
  const trendingProducts = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&q=80",
      rating: 4.5,
      vendor: "TechGadgets",
      discount: 10,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
      rating: 4.7,
      vendor: "SmartLife",
      discount: 15,
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
      rating: 4.2,
      vendor: "AudioPro",
      discount: 0,
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400&q=80",
      rating: 4.8,
      vendor: "ComfortZone",
      discount: 20,
    },
    {
      id: 5,
      name: "Fitness Tracker",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&q=80",
      rating: 4.4,
      vendor: "FitTech",
      discount: 5,
    },
    {
      id: 6,
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
      rating: 4.3,
      vendor: "EcoLife",
      discount: 0,
    },
    {
      id: 7,
      name: "Wireless Charging Pad",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1585338447937-7082f8fc763d?w=400&q=80",
      rating: 4.1,
      vendor: "PowerUp",
      discount: 0,
    },
    {
      id: 8,
      name: "Smart Home Security Camera",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1558000143-a78f8299c40b?w=400&q=80",
      rating: 4.6,
      vendor: "SafeGuard",
      discount: 10,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Promotion TopBar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm">
        <p>
          🎉 Summer Sale! Up to 50% off on selected items.{" "}
          <span className="font-bold underline cursor-pointer">Shop Now</span>
        </p>
      </div>

      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              PeanechStore
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-6 relative">
            <Input
              type="text"
              placeholder="Search products, brands, categories..."
              className="w-full pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/categories"
              className="text-sm font-medium hover:text-primary"
            >
              Categories
            </Link>
            <Link
              to="/deals"
              className="text-sm font-medium hover:text-primary"
            >
              Deals
            </Link>
            <Link
              to="/vendors"
              className="text-sm font-medium hover:text-primary"
            >
              Vendors
            </Link>
            <Link to="/help" className="text-sm font-medium hover:text-primary">
              Help
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                2
              </Badge>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Category Carousel */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="pl-4 md:basis-1/3 lg:basis-1/4"
                >
                  <Link to={`/category/${category.id}`}>
                    <Card className="overflow-hidden h-40 transition-transform hover:scale-105">
                      <div className="relative h-full">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                          <span className="text-3xl mb-2">{category.icon}</span>
                          <h3 className="font-medium text-lg">
                            {category.name}
                          </h3>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </section>

        {/* Featured Banners */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBanners.map((banner) => (
              <Link to={banner.link} key={banner.id}>
                <Card className="overflow-hidden h-64 transition-all hover:shadow-lg">
                  <div className="relative h-full">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-start justify-end p-6 text-white">
                      <h3 className="font-bold text-xl mb-1">{banner.title}</h3>
                      <p className="text-sm mb-3">{banner.description}</p>
                      <Button size="sm" variant="secondary" className="mt-2">
                        Explore <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Products */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Trending Products</h2>
            <Link
              to="/products/trending"
              className="text-primary text-sm font-medium flex items-center"
            >
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ProductGrid products={trendingProducts} />
        </section>

        {/* New Arrivals */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link
              to="/products/new"
              className="text-primary text-sm font-medium flex items-center"
            >
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Featured Vendors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Vendors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Link to={`/vendor/${index + 1}`} key={index}>
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=vendor${index}`}
                        alt="Vendor avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-lg mb-1">
                      Vendor {index + 1}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Premium Seller
                    </p>
                    <div className="flex items-center text-amber-500 text-sm">
                      {"★".repeat(4)}
                      {"☆".repeat(1)}
                      <span className="text-muted-foreground ml-1">(120)</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="mb-12 bg-muted rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Subscribe to our newsletter and be the first to know about new
            products and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">PeanechStore</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Your one-stop destination for all your shopping needs with
                multiple vendors offering quality products.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="hover:text-primary">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-primary">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/help-center" className="hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/track-order" className="hover:text-primary">
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="hover:text-primary">
                    Shipping Information
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="hover:text-primary">
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link to="/payment-methods" className="hover:text-primary">
                    Payment Methods
                  </Link>
                </li>
                <li>
                  <Link to="/loyalty-program" className="hover:text-primary">
                    Loyalty Program
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Vendor Information</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/become-vendor" className="hover:text-primary">
                    Become a Vendor
                  </Link>
                </li>
                <li>
                  <Link to="/vendor-login" className="hover:text-primary">
                    Vendor Login
                  </Link>
                </li>
                <li>
                  <Link to="/vendor-guidelines" className="hover:text-primary">
                    Vendor Guidelines
                  </Link>
                </li>
                <li>
                  <Link to="/success-stories" className="hover:text-primary">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link to="/vendor-faq" className="hover:text-primary">
                    Vendor FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2023 PeanechStore. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/40x25"
                alt="Visa"
                className="h-6"
              />
              <img
                src="https://via.placeholder.com/40x25"
                alt="Mastercard"
                className="h-6"
              />
              <img
                src="https://via.placeholder.com/40x25"
                alt="PayPal"
                className="h-6"
              />
              <img
                src="https://via.placeholder.com/40x25"
                alt="Apple Pay"
                className="h-6"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
