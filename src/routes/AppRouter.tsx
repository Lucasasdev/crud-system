import Login from "@/pages/login";
import Register from "@/pages/register";
import { Home } from "lucide-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
