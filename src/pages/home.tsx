import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import Header from "@/components/header/Header";

const Home = () => {
  const token = localStorage.getItem("@Auth:token");

  const handleClickProducts = async () => {
    try {
      const response = await api.get("/api/products/get-all-products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <Header />
        <h1>Página de produtos</h1>
        <div className="flex gap-4">
          <div>
            <Button onClick={handleClickProducts}>Listar</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
