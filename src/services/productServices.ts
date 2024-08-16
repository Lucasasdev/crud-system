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
    const response = await api.get(import.meta.env.VITE_GET_ALL_URI, {
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
      import.meta.env.VITE_CREATE_URI,
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

export const updateProduct = async ({
  id,
  name,
  description,
  price,
  stock,
}: ProductType) => {
  const token = localStorage.getItem("@Auth:token");
  try {
    const response = await api.patch(
      `${import.meta.env.VITE_UPDATE_URI}${id}`,
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
    alert("Produto atualizado com sucesso!");

    console.log(response.status);

    return response.status;
  } catch (error) {
    if (error instanceof AxiosError) {
      alert("Error ao atualizar o produto!");
      console.error(error.response?.data);
    }
  }
};

export const deleteProduct = async (id: number | undefined) => {
  const token = localStorage.getItem("@Auth:token");
  try {
    const response = await api.delete(
      `${import.meta.env.VITE_DELETE_URI}${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Produto excluído!");
    return response.status;
  } catch (error) {
    if (error instanceof AxiosError) {
      alert("Error ao excluir produto!");
      console.error(error.response?.data);
    }
  }
};
