import React from "react";
import data from "../assets/data/data.json";
import "../assets/styles/menu.css";
import logo from "../assets/images/burger.svg";

const Menu = ({ cart, setCart }) => {
  const handleAddToCart = (item) => {
    const addCartCopy = [...cart]; // Copie du panier
    const foundItem = addCartCopy.find(
      (cartItem) => cartItem.name === item.name // Recherche si l'article est déjà dans le panier
    );

    if (!foundItem) {
      addCartCopy.push({
        name: item.name,
        price: item.price,
        quantity: 1,
      });
    } else {
      foundItem.quantity = foundItem.quantity + 1;
    }

    setCart(addCartCopy); // Mise à jour du panier avec la copie modifiée
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
