import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const PizzaDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: string;
  }>();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const res = await axios.get(
          `https://6322b272a624bced307cb4d9.mockapi.io/items/${id}`
        );
        setPizza(res.data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        navigate("/");
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza-logo" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};
