import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({
  children = <div>Page content</div>,
}: MainLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(3); // Example cart count

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Toys",
    "Automotive",
    "Books",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Promotion TopBar */}
      <div className="bg-primary px-4 py-2 text-center text-sm text-primary-foreground">
        <p>🔥 Summer Sale: Up to 70% off on selected items! Shop Now</p>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">MarketHub</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex md:w-1/3 lg:w-1/2">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search products, brands, categories..."
                className="w-full pr-10"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden items-center space-x-4 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <User className="h-4 w-4" />
                  <span>Account</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/login" className="w-full">
                    Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/register" className="w-full">
                    Register
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/orders" className="w-full">
                    My Orders
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </Button>

            <Link to="/cart" className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
              </Button>
              {cartCount > 0 && (
                <Badge
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0"
                  variant="destructive"
                >
                  {cartCount}
                </Badge>
              )}
            </Link>

            <Button variant="outline" size="sm">
              <Link to="/vendor/login">Sell on MarketHub</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0"
                  variant="destructive"
                >
                  {cartCount}
                </Badge>
              )}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search - Visible on mobile only */}
        <div className="border-t p-2 md:hidden">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pr-10"
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="hidden border-t px-4 py-2 md:block">
          <div className="container flex items-center justify-between overflow-x-auto">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="whitespace-nowrap px-3 py-1 text-sm hover:text-primary"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[112px] z-30 bg-background md:hidden">
          <nav className="flex flex-col divide-y">
            <Link to="/login" className="p-4 hover:bg-muted">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Account</span>
              </div>
            </Link>
            <Link to="/wishlist" className="p-4 hover:bg-muted">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </div>
            </Link>
            <Link to="/orders" className="p-4 hover:bg-muted">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <span>My Orders</span>
              </div>
            </Link>
            <Link to="/vendor/login" className="p-4 hover:bg-muted">
              <span>Sell on MarketHub</span>
            </Link>

            <div className="p-4">
              <h3 className="mb-2 font-medium">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-md p-2 text-sm hover:bg-muted"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container grid gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">MarketHub</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for all your shopping needs with
              thousands of products across multiple categories.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase">Shop</h4>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 4).map((category, index) => (
                <li key={index}>
                  <Link
                    to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase">
              Customer Service
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/help"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MarketHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
