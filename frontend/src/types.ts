// src/types.ts

// -----------------------------
// Tipo principal de Producto
// -----------------------------
export type Product = {
  id: string;           // Coincide con la API
  name: string;
  price: number;
  image: string;        // Mapeo de photo → image
  category?: string;
  description?: string;
};

// -----------------------------
// Props de ProductCard
// -----------------------------
export type ProductCardProps = {
  product: Product;
};

// -----------------------------
// Props de ProductGrid
// -----------------------------
export type ProductGridProps = {
  products: Product[];
  setSelectedCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
};

// -----------------------------
// Props de ProductsList
// -----------------------------
export type ProductsListProps = {
  searchTerm: string;
  selectedCategory: string;
  setCategories: (categories: string[]) => void;
  setSelectedCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
};

// -----------------------------
// Props de Sidebar
// -----------------------------
export type SidebarItem = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
};

export type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

// -----------------------------
// Props de Header
// -----------------------------
export type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  cartItemCount?: number;
};

// -----------------------------
// Props de Layout
// -----------------------------
export type LayoutProps = {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};
