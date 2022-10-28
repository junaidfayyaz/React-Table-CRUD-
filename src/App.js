import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Edit from "./components/Edit";
import Table from "./components/Table";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios(
          "https://api.escuelajs.co/api/v1/products"
        );
        console.log("api data", data);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setProducts([]);
        console.log(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table data={products} />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
