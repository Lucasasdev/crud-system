import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRouter />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
