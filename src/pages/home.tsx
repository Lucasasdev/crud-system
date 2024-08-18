import CreateForm from "@/components/createForm/CreateForm";
import Header from "@/components/header/Header";
import ProductTable from "@/components/productTable/ProductTable";

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Header />
      </div>
      <div className="mx-5">
        <CreateForm />
      </div>
      <ProductTable />
    </>
  );
};

export default Home;
