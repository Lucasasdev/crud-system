import "./App.css";
import AuthProvider from "./context/AuthProvider";
import ProductProvider from "./context/productContext/productProvider";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <ProductProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ProductProvider>
    </>
  );
}

export default App;
