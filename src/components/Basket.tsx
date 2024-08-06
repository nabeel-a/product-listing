import React from "react";
import styled from "styled-components";
import { Product } from "../types";

interface BasketProps {
  basket: Product[];
  total: number;
}

const Basket: React.FC<BasketProps> = ({ basket, total }) => {
  return (
    <BasketContainer>
      <h2>Basket</h2>
      {basket.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        basket.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      )}
      <h3>Total: ${total}</h3>
    </BasketContainer>
  );
};

const BasketContainer = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  text-align: center;
`;

export default Basket;
