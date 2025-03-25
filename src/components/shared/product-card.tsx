"use client";

import {
  deleteOneProduct,
  setFavoriteStatus,
} from "@/features/products/productsSlice";
import { Product } from "@/features/products/types";
import { useAppDispatch } from "@/utils/hooks/hooks";
import Link from "next/link";
import React from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = React.memo(({ product }) => {
  const [liked, setLiked] = React.useState(product.isFavorite);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setLiked(product.isFavorite);
  }, [product.isFavorite]);

  const toggleLike = () => {
    const newFavoriteStatus = !product.isFavorite;
    dispatch(
      setFavoriteStatus({ id: product.id, isFavorite: newFavoriteStatus })
    );
  };

  const handleDelete = (id: number) => {
    dispatch(deleteOneProduct(id));
  };

  return (
    <div
      key={product.id}
      className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
    >
      <Link href={`/products/${product.id}`}>
        <div>
          <div className="relative w-full h-48 flex items-center justify-center bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-4"
              loading="lazy"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <p className="font-medium text-lg mb-2 line-clamp-2">
              {product.title}
            </p>
            <span className="text-xl font-semibold text-gray-800 mb-4">
              ${product.price}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex justify-between items-center mt-auto p-4">
        <button
          onClick={(e) => {
            e.stopPropagation(), toggleLike();
          }}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          {liked ? (
            <FcLike className="text-3xl text-red-500" />
          ) : (
            <FcLikePlaceholder className="text-3xl text-gray-400" />
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation(), handleDelete(product.id);
          }}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
});
