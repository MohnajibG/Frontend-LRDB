import React from "react";
import data from "../assets/data/data.json";
import "../assets/styles/menu.css";
import logo from "../assets/images/burger.svg";

const Menu = ({ cart, setCart }) => {
  const handleAddToCart = (item) => {
    const addCartCopy = [...cart];
    const foundItem = addCartCopy.find(
      (cartItem) => cartItem.name === item.name
    );

    if (!foundItem) {
      addCartCopy.push({
        name: item.name,
        price: item.price,
        quantity: 1,
      });
    } else {
      foundItem.quantity++;
    }

    setCart(addCartCopy);
  };

  return (
    <main className="menu">
      <div>
        <h1>Faites votre choix :</h1>
        <div className="menu-items">
          {data.map((item) => (
            <div
              key={item.id}
              className="item"
              onClick={() => handleAddToCart(item)}
            >
              <p className="item-name">{item.name}</p>
              <img
                src={item.image.endsWith(".png") ? item.image : logo}
                alt={item.name}
              />
              <p className="item-price">{item.price.toFixed(2)} €</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Menu;
