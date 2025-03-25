"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@/components/ui/Button";
import { createProduct } from "@/services/products";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.string().url("Invalid URL").required("Image URL is required"),
  isFavorite: Yup.boolean().required("Favorite status is required"),
});

export default function CreateProductForm() {
  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      isFavorite: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createProduct(values)
        alert("Продукт создан")
      } catch (error){
        alert("Ошибка при создании продукта")
        console.log(error)
      }
    },
  });

  return (
    <main className="mx-auto flex justify-center max-w-[1274px] min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Create Product</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Название
            </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="w-full p-2 border rounded"
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Цена
            </label>
            <input
              id="price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className="w-full p-2 border rounded"
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500 text-sm">{formik.errors.price}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Описание
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="w-full p-2 border rounded"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm">{formik.errors.description}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Категория
            </label>
            <input
              id="category"
              name="category"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className="w-full p-2 border rounded"
            />
            {formik.touched.category && formik.errors.category ? (
              <div className="text-red-500 text-sm">{formik.errors.category}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              URL картинки
            </label>
            <input
              id="image"
              name="image"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.image}
              className="w-full p-2 border rounded"
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="text-red-500 text-sm">{formik.errors.image}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="isFavorite" className="block text-sm font-medium text-gray-700">
              В избранное
            </label>
            <input
              id="isFavorite"
              name="isFavorite"
              type="checkbox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.isFavorite}
              className="p-2 border rounded"
            />
            {formik.touched.isFavorite && formik.errors.isFavorite ? (
              <div className="text-red-500 text-sm">{formik.errors.isFavorite}</div>
            ) : null}
          </div>

          <Button type="submit">Создать продукт</Button>
        </form>
      </div>
    </main>
  );
}
