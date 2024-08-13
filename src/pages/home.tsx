import Header from "@/components/header/Header";
import ProductTable from "@/components/productTable/ProductTable";

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Header />
      </div>
      <ProductTable />
    </>
  );
};

export default Home;
