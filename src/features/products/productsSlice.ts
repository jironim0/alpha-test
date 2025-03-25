import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./types";

interface ProductState {
    products: Product[],
    product: Product,
    allProducts: Product[]
  }

const initialState: ProductState = {
  products: [],
  product: {} as Product,
  allProducts: []
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    deleteOneProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(item => item.id !== action.payload)
    },
    setFavoriteStatus: (state, action: PayloadAction<{id: number, isFavorite: boolean}>) => {
      const product = state.products.find((item) => item.id === action.payload.id);
      if (product) {
        product.isFavorite = action.payload.isFavorite;
      }
    }
  },
});

export const { addProducts, deleteOneProduct, setFavoriteStatus, setAllProducts } = productsSlice.actions;
export default productsSlice.reducer;