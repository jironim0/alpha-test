import { NewProduct, Product } from "@/features/products/types";
import axiosInstance from "./axios-instance";


//Много багов при разработки пагинации, оставил этот вопросик до лучших времен, фильтры работают некорректно из-за урезанных возможностей mochAPI 
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get<Product[]>(`/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getOneProduct = async (id: string): Promise<Product> => {
  try {
    const response = await axiosInstance.get<Product[]>(`/products`, {
      params: { id },
    });

    return response.data[0];
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const createProduct = async (data: NewProduct) => {
  try {
    const response = await axiosInstance.post("/products", data);

    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
//Так и не разобрался, почему обычный put запрос не работает на mockAPI. Проще было бы написать бэк самомоу и настроить под свой лад контроллер
//Есть есть идеи то напишите кто-нибудь в личку, буду благодарен за помощь
export const updateProduct = async (id: string, body: NewProduct) => {
  try {
    const response = await axiosInstance.put(`/products?id=${id}`, {
      ...body,
      id: id
    });

    return response.data[0]; 
  } catch (error) {
    console.error("Error updating product:", error);
  }
};
