import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/product/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Product {
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
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface FilterState {
  categories: string[];
  priceRange: number[];
  ratings: number[];
  vendors: string[];
}

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    ratings: [],
    vendors: [],
  });

  // Mock search results data
  const allProducts: Product[] = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 129.99,
      originalPrice: 159.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      vendor: { name: "AudioTech", verified: true },
      rating: 4.5,
      reviewCount: 128,
      discount: 20,
      category: "Electronics",
      isFeatured: true,
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      vendor: { name: "TechGiant", verified: true },
      rating: 4.2,
      reviewCount: 95,
      category: "Electronics",
      isNew: true,
    },
    {
      id: "3",
      name: "Cotton Premium T-Shirt",
      price: 24.99,
      originalPrice: 34.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      vendor: { name: "FashionHub", verified: false },
      rating: 4.0,
      reviewCount: 210,
      discount: 10,
      category: "Fashion",
    },
    {
      id: "4",
      name: "Ergonomic Office Chair",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80",
      vendor: { name: "HomeEssentials", verified: true },
      rating: 4.7,
      reviewCount: 67,
      category: "Home & Garden",
    },
    {
      id: "5",
      name: "Professional Basketball",
      price: 49.99,
      originalPrice: 59.99,
      image:
        "https://images.unsplash.com/photo-1518908336710-4e1cf821d3d1?w=400&q=80",
      vendor: { name: "SportsMaster", verified: true },
      rating: 4.3,
      reviewCount: 42,
      discount: 5,
      category: "Sports",
    },
    {
      id: "6",
      name: "Educational Building Blocks",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80",
      vendor: { name: "KidsToys", verified: false },
      rating: 4.8,
      reviewCount: 156,
      category: "Toys",
    },
    {
      id: "7",
      name: "Stainless Steel Water Bottle",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
      vendor: { name: "EcoLife", verified: true },
      rating: 4.1,
      reviewCount: 89,
      category: "Home & Garden",
    },
    {
      id: "8",
      name: "Wireless Charging Pad",
      price: 29.99,
      originalPrice: 39.99,
      image:
        "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=400&q=80",
      vendor: { name: "TechGiant", verified: true },
      rating: 4.4,
      reviewCount: 112,
      discount: 20,
      category: "Electronics",
    },
  ];

  // Filter and sort products based on current state
  const filteredProducts = allProducts.filter((product) => {
    // Search query filter
    if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    // Category filter
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }

    // Price range filter
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false;
    }

    // Rating filter
    if (
      filters.ratings.length > 0 &&
      !filters.ratings.some((rating) => product.rating >= rating)
    ) {
      return false;
    }

    // Vendor filter
    if (
      filters.vendors.length > 0 &&
      !filters.vendors.includes(product.vendor.name)
    ) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case "relevance":
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000],
      ratings: [],
      vendors: [],
    });
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.ratings.length +
    filters.vendors.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Toys",
  ];
  const vendors = [
    "AudioTech",
    "TechGiant",
    "FashionHub",
    "HomeEssentials",
    "SportsMaster",
    "KidsToys",
    "EcoLife",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>

            <form onSubmit={handleSearch} className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search Results Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {query ? `Search results for "${query}"` : "All Products"}
          </h1>
          <p className="text-muted-foreground">
            {sortedProducts.length} products found
          </p>
        </div>

        {/* Filters and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-2 flex-wrap">
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
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Filter Products</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 max-h-96 overflow-y-auto">
                    <FilterOptions
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      categories={categories}
                      vendors={vendors}
                    />
                  </div>
                  <DrawerFooter>
                    <Button onClick={clearFilters} variant="outline">
                      Clear All Filters
                    </Button>
                    <DrawerClose asChild>
                      <Button>Apply Filters</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
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

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {filters.categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {category}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() =>
                      handleFilterChange(
                        "categories",
                        filters.categories.filter((c) => c !== category),
                      )
                    }
                  />
                </Badge>
              ))}
              {filters.vendors.map((vendor) => (
                <Badge
                  key={vendor}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {vendor}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() =>
                      handleFilterChange(
                        "vendors",
                        filters.vendors.filter((v) => v !== vendor),
                      )
                    }
                  />
                </Badge>
              ))}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleFilterChange("priceRange", [0, 1000])}
                  />
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-6 px-2 text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 border rounded-lg p-4 bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-auto p-0 text-xs text-primary"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <FilterOptions
                filters={filters}
                onFilterChange={handleFilterChange}
                categories={categories}
                vendors={vendors}
              />
            </div>
          </div>

          {/* Product Results */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-4 md:gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1"
                  }`}
                >
                  {sortedProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        image={product.image}
                        vendor={product.vendor}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        discount={product.discount}
                        isNew={product.isNew}
                        isFeatured={product.isFeatured}
                        className={viewMode === "list" ? "flex-row" : ""}
                      />
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {sortedProducts.length > 12 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1)
                              setCurrentPage(currentPage - 1);
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
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface FilterOptionsProps {
  filters: FilterState;
  onFilterChange: (filterType: keyof FilterState, value: any) => void;
  categories: string[];
  vendors: string[];
}

const FilterOptions = ({
  filters,
  onFilterChange,
  categories,
  vendors,
}: FilterOptionsProps) => {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFilterChange("categories", [
                      ...filters.categories,
                      category,
                    ]);
                  } else {
                    onFilterChange(
                      "categories",
                      filters.categories.filter((c) => c !== category),
                    );
                  }
                }}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => onFilterChange("priceRange", value)}
          max={1000}
          step={10}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      {/* Ratings */}
      <div>
        <h4 className="font-medium mb-3">Customer Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.ratings.includes(rating)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFilterChange("ratings", [...filters.ratings, rating]);
                  } else {
                    onFilterChange(
                      "ratings",
                      filters.ratings.filter((r) => r !== rating),
                    );
                  }
                }}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm flex items-center cursor-pointer"
              >
                <span className="text-yellow-400 mr-1">
                  {"★".repeat(rating)}
                  {"☆".repeat(5 - rating)}
                </span>
                & up
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Vendors */}
      <div>
        <h4 className="font-medium mb-3">Vendors</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {vendors.map((vendor) => (
            <div key={vendor} className="flex items-center space-x-2">
              <Checkbox
                id={`vendor-${vendor}`}
                checked={filters.vendors.includes(vendor)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFilterChange("vendors", [...filters.vendors, vendor]);
                  } else {
                    onFilterChange(
                      "vendors",
                      filters.vendors.filter((v) => v !== vendor),
                    );
                  }
                }}
              />
              <label
                htmlFor={`vendor-${vendor}`}
                className="text-sm cursor-pointer"
              >
                {vendor}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
