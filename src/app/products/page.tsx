"use client";

import { addProducts } from "@/features/products/productsSlice";
import { Product } from "@/features/products/types";
import { getProducts } from "@/services/products";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/hooks";
import React from "react";
import { IProductFilter } from "./product.interface";
import { ProductFilter } from "./product.enum";
import { ProductCard } from "@/components/shared/product-card";
import { SearchBar } from "@/components/ui/SearchBar";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responce = await getProducts();
        dispatch(addProducts(responce));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    fetchProducts();
  }, [dispatch]);
  const { products } = useAppSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = React.useState("");

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  let filterType: IProductFilter = null;

  const [showFavorite, setShowFavorite] = React.useState(false);

  if (showFavorite) {
    filterType = ProductFilter.favorite;
  }

  const productList = (items: Product[]) => {
    return items.map((item) => <ProductCard key={item.id} product={item} />);
  };

  const showFavorites = (products: Product[]): Product[] => {
    return products.filter((item) => item.isFavorite);
  };

  const searchebleList = (products: Product[], value: string = "") => {
    return products.filter((items) =>
      items.title.toLowerCase().includes(value)
    );
  };

  const finalProductList = (
    products: Product[],
    filterType: IProductFilter,
    value: string,
    selectedCategory: string | null
  ) => {
    let filteredProducts = products;

    if (filterType === "favorite") {
      filteredProducts = showFavorites(filteredProducts);
    }

    if (selectedCategory) {
      filteredProducts = products.filter(
        (item) => item.category === selectedCategory
      );
    }

    filteredProducts = searchebleList(filteredProducts, value);
    return productList(filteredProducts);
  };

  const categoriesList = (products: Product[]) => {
    const sortedCategories = products
      .map((product) => product.category)
      .filter(
        (category, index, categories) => categories.indexOf(category) === index
      );
    return sortedCategories.map((category, index) => (
      <button
        onClick={() =>
          setSelectedCategory(category === selectedCategory ? null : category)
        }
        key={index}
        className={`
          px-4 py-2 rounded-full text-sm font-medium transition-colors
          ${
            category === selectedCategory
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }
        `}
      >
        {category}
      </button>
    ));
  };
  return (
    <main className="mx-auto flex justify-center max-w-[1274px] min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4">
        <nav className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setShowFavorite(false);
                setSelectedCategory(null);
              }}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  !showFavorite && !selectedCategory
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }
              `}
            >
              All Products
            </button>

            <button
              onClick={() => {
                setShowFavorite(!showFavorite);
                setSelectedCategory(null);
              }}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  showFavorite && !selectedCategory
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }
                flex items-center gap-1
              `}
            >
              Favorites
            </button>

            <div className="w-full border-b border-gray-200 my-2"></div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 self-center mr-2">
                Categories:
              </span>
              {categoriesList(products)}
            </div>
          </div>
        </nav>
        <SearchBar setValue={setSearchQuery} value={searchQuery} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {finalProductList(
            products,
            filterType,
            searchQuery,
            selectedCategory
          )}
        </div>
      </div>
    </main>
  );
}
