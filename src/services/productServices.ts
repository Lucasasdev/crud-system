import { AxiosError } from "axios";
import { api } from "./api";

export interface ProductType {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const getProducts = async () => {
  try {
    const response = await api.get("/api/products/get-all-products");
    return response.data.data.products;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.request);
    }
  }
};

export const createProduct = async ({
  name,
  description,
  price,
  stock,
}: ProductType) => {
  try {
    const response = await api.post("/api/products/create-product", {
      name,
      description,
      price,
      stock,
    });

    console.log(response.status);
  } catch (error) {
    if (error instanceof AxiosError) {
      alert("Error ao criar produto");
      console.log(error.response?.data);
    }
  }
};
