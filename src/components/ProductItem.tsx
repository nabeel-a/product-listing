import React from "react";
import styled from "styled-components";
import { Product } from "../types";

interface ProductItemProps {
  product: Product;
  addToCart: (product: Product) => void;
  decrementQty: (product: Product) => void;
  removeFromCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  addToCart,
  decrementQty,
  removeFromCart
}) => {
  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleDecrementQty = () => {
    decrementQty(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product);
  };

  return (
    <ProductCard>
      <img src={product.img} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Qty in bag: {product.quantity || 0}</p>
      <button onClick={handleAddToCart}>+</button>
      <button onClick={handleDecrementQty}>-</button>
      <button onClick={handleRemoveFromCart}>Remove</button>
    </ProductCard>
  );
};

const ProductCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  text-align: center;

  img {
    max-width: 100px;
    margin-bottom: 16px;
  }

  button {
    margin: 4px;
  }
`;

export default ProductItem;
