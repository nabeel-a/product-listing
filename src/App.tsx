import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Basket from "./components/Basket";
import { Product } from "./types";

const App: React.FC = () => {
  const [basket, setBasket] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addToCart = (product: Product) => {
    const existingProduct = basket.find(item => item.id === product.id);
    if (existingProduct) {
      setBasket(
        basket.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        )
      );
    } else {
      setBasket([...basket, { ...product, quantity: 1 }]);
    }
    setTotal(total + product.price);
  };

  const decrementQty = (product: Product) => {
    const existingProduct = basket.find(item => item.id === product.id);
    if (
      existingProduct &&
      existingProduct.quantity &&
      existingProduct.quantity > 1
    ) {
      setBasket(
        basket.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity && item.quantity - 1 }
            : item
        )
      );
      setTotal(total - product.price);
    } else if (existingProduct && existingProduct.quantity === 1) {
      removeFromCart(product);
    }
  };

  const removeFromCart = (product: Product) => {
    const existingProduct = basket.find(item => item.id === product.id);
    if (existingProduct && existingProduct.quantity) {
      setBasket(basket.filter(item => item.id !== product.id));
      setTotal(total - existingProduct.quantity * product.price);
    }
  };

  return (
    <div>
      <ProductList
        addToCart={addToCart}
        decrementQty={decrementQty}
        removeFromCart={removeFromCart}
        basket={basket}
      />
      <Basket basket={basket} total={total} />
    </div>
  );
};

export default App;
