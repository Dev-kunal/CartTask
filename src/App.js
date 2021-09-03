import { Products } from "./Products.jsx";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Basket } from "./features/cart/Basket";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/basket" element={<Basket />} />
    </Routes>
  );
}
