"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/features/products/types";
import { getOneProduct } from "@/services/products";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function OneProductPage() {
  const params = useParams();
  const { id } = params as { id: string };

  const [product, setProduct] = React.useState<Product | null>(null);

  const router = useRouter();

  React.useEffect(() => {
    const fetchOneProduct = async () => {
      try {
        const res = await getOneProduct(id);
        setProduct(res);
      } catch (error) {
        console.error("Ошибка при получении продукта :", error);
      }
    };

    if (id) {
      fetchOneProduct();
    }
  }, [id]);

  if (!product) {
    return (
      <main className="mx-auto flex justify-center max-w-[1274px] min-h-screen bg-gray-50 py-8">
        <div className="text-center text-gray-600">Loading...</div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex justify-center max-w-[1274px] min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto max-h-96 object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <span className="text-sm text-gray-500 uppercase">
              {product.category}
            </span>

            <h1 className="text-2xl font-bold mt-2">{product.title}</h1>

            <p className="text-xl font-semibold text-gray-800 mt-4">
              ${product.price}
            </p>

            <p className="text-gray-600 mt-4">{product.description}</p>
          </div>

          <div className="mt-6 flex gap-4">
            <Button
              variant="primary"
              className="w-[50%]"
              onClick={() => router.push("/products")}
            >
              Back
            </Button>
            <Link href={`/edite/${product.id}`}>
              <Button variant="secondary" className="w-[100%]">
                Edite
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
