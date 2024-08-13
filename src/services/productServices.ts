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
  const token = localStorage.getItem("@Auth:token");
  try {
    const response = await api.get("/api/products/get-all-products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  const token = localStorage.getItem("@Auth:token");
  try {
    const response = await api.post(
      import.meta.env.VITE_CREATE_URL,
      {
        name,
        description,
        price,
        stock,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Produto criado com sucesso!");

    return response.status;
  } catch (error) {
    if (error instanceof AxiosError) {
      alert("Error ao criar produto");
      console.log(error.response?.data);
    }
  }
};
