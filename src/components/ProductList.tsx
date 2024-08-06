import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../types";
import ProductItem from "./ProductItem";

interface ProductListProps {
  addToCart: (product: Product) => void;
  decrementQty: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  basket: Product[];
}

const ProductList: React.FC<ProductListProps> = ({
  addToCart,
  decrementQty,
  removeFromCart,
  basket
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "https://my-json-server.typicode.com/benirvingplt/products/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = filter
    ? products.filter(product => product.colour === filter)
    : products;

  return (
    <div>
      <h1>Product Listings</h1>
      <button onClick={() => setFilter("black")}>Show Black Items</button>
      <button onClick={() => setFilter("")}>Show All Items</button>
      <div>
        {filteredProducts.map(product => {
          const productInBasket = basket.find(item => item.id === product.id);
          const quantityInBasket = productInBasket
            ? productInBasket.quantity
            : 0;
          return (
            <ProductItem
              key={product.id}
              product={{ ...product, quantity: quantityInBasket }}
              addToCart={addToCart}
              decrementQty={decrementQty}
              removeFromCart={removeFromCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
