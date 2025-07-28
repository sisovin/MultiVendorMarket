import React, { useState } from "react";
import {
  ChevronDown,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  vendor: string;
  rating: number;
  reviewCount: number;
  discount?: number;
  isFavorite?: boolean;
}

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  vendor: string;
  rating: number;
  reviewCount: number;
  discount?: number;
  isFavorite?: boolean;
  layout?: "vertical" | "horizontal";
}

// ProductCard component implementation
const ProductCard = ({
  id = "1",
  name = "Product Name",
  price = 99.99,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  vendor = "Vendor Name",
  rating = 4.5,
  reviewCount = 100,
  discount,
  isFavorite = false,
  layout = "vertical",
}: ProductCardProps) => {
  return (
    <div
      className={`group relative border rounded-lg overflow-hidden transition-all hover:shadow-md bg-card ${layout === "horizontal" ? "flex" : ""}`}
    >
      <div
        className={`relative ${layout === "horizontal" ? "w-1/3" : "w-full aspect-square"}`}
      >
        <img src={image} alt={name} className="w-full h-full object-cover" />
        {discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
        <button
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white ${isFavorite ? "text-red-500" : "text-gray-400"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div className={`p-4 ${layout === "horizontal" ? "w-2/3" : ""}`}>
        <p className="text-sm text-muted-foreground">{vendor}</p>
        <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        <div className="flex items-center mt-1">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(rating))}
            {rating % 1 > 0 ? "½" : ""}
            {"☆".repeat(5 - Math.ceil(rating))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({reviewCount})
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div>
            {discount ? (
              <div className="flex items-center gap-1.5">
                <span className="font-bold">
                  ${(price * (1 - discount / 100)).toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="font-bold">${price.toFixed(2)}</span>
            )}
          </div>

          <Button
            size="sm"
            variant="outline"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ProductGridProps {
  products?: Product[];
  title?: string;
  showFilters?: boolean;
}

const ProductGrid = ({
  products = defaultProducts,
  title = "Products",
  showFilters = true,
}: ProductGridProps) => {
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-4 py-8">
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}

        {showFilters && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              {/* Mobile Filter Drawer */}
              <div className="block md:hidden">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Filter size={16} />
                      Filters
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Filter Products</DrawerTitle>
                    </DrawerHeader>
                    <div className="px-4">
                      <FilterOptions
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                      />
                    </div>
                    <DrawerFooter>
                      <Button>Apply Filters</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <SlidersHorizontal size={16} />
                <span className="hidden md:inline">Sort By</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[120px] md:w-[180px] border-0 p-0 h-auto shadow-none">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </Button>

              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                  </svg>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" x2="21" y1="6" y2="6" />
                    <line x1="3" x2="21" y1="12" y2="12" />
                    <line x1="3" x2="21" y1="18" y2="18" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {products.length} results
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar Filters */}
          {showFilters && (
            <div className="hidden md:block w-64 shrink-0">
              <div className="sticky top-4 border rounded-lg p-4 bg-card">
                <h3 className="font-medium mb-4 flex items-center justify-between">
                  Filters
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-primary"
                  >
                    Reset
                  </Button>
                </h3>
                <FilterOptions
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div
              className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-4 md:gap-6`}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  vendor={product.vendor}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  discount={product.discount}
                  isFavorite={product.isFavorite}
                  layout={viewMode === "list" ? "horizontal" : "vertical"}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                  />
                </PaginationItem>
                {[1, 2, 3].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterOptions = ({
  priceRange,
  setPriceRange,
}: {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {["Electronics", "Clothing", "Home & Garden", "Sports", "Toys"].map(
            (category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={`category-${category}`} />
                <label htmlFor={`category-${category}`} className="text-sm">
                  {category}
                </label>
              </div>
            ),
          )}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider
          defaultValue={priceRange}
          max={1000}
          step={10}
          onValueChange={setPriceRange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm">${priceRange[0]}</span>
          <span className="text-sm">${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Ratings</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm flex items-center"
              >
                {rating}+
                <span className="ml-1 text-yellow-400">
                  {"★".repeat(rating)}
                  {"☆".repeat(5 - rating)}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Vendor</h4>
        <div className="space-y-2">
          {[
            "TechGiant",
            "FashionHub",
            "HomeEssentials",
            "SportsMaster",
            "KidsToys",
          ].map((vendor) => (
            <div key={vendor} className="flex items-center space-x-2">
              <Checkbox id={`vendor-${vendor}`} />
              <label htmlFor={`vendor-${vendor}`} className="text-sm">
                {vendor}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mock data for default products
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    vendor: "TechGiant",
    rating: 4.5,
    reviewCount: 128,
    discount: 15,
    isFavorite: false,
  },
  {
    id: "2",
    name: "Smart Watch with Fitness Tracking",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    vendor: "TechGiant",
    rating: 4.2,
    reviewCount: 95,
    isFavorite: true,
  },
  {
    id: "3",
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    vendor: "FashionHub",
    rating: 4.0,
    reviewCount: 210,
    discount: 10,
    isFavorite: false,
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80",
    vendor: "HomeEssentials",
    rating: 4.7,
    reviewCount: 67,
    isFavorite: false,
  },
  {
    id: "5",
    name: "Professional Basketball",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1518908336710-4e1cf821d3d1?w=500&q=80",
    vendor: "SportsMaster",
    rating: 4.3,
    reviewCount: 42,
    discount: 5,
    isFavorite: true,
  },
  {
    id: "6",
    name: "Educational Building Blocks Set",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&q=80",
    vendor: "KidsToys",
    rating: 4.8,
    reviewCount: 156,
    isFavorite: false,
  },
  {
    id: "7",
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    vendor: "HomeEssentials",
    rating: 4.1,
    reviewCount: 89,
    isFavorite: false,
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=500&q=80",
    vendor: "TechGiant",
    rating: 4.4,
    reviewCount: 112,
    discount: 20,
    isFavorite: true,
  },
];

export default ProductGrid;
