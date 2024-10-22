import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/sidebar.css";
import axios from "axios";
import Cookies from "js-cookie";

import { IoMdClose } from "react-icons/io";

const SideBar = ({ cart, setCart }) => {
  const username = Cookies.get("username");

  const location = useLocation();
  const navigate = useNavigate();

  // Fonction pour augmenter la quantité d'un article dans le panier
  const handleIncrease = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: cartItem.quantity + 1 } // Incrémente la quantité si l'article est le meme
        : cartItem
    );
    setCart(updatedCart); // Met à jour le panier avec les nouvelles quantités
  };

  // Fonction pour diminuer la quantité d'un article
  const handleDecrease = (item) => {
    const updatedCart = cart
      .map((cartItem) => {
        if (cartItem.name === item.name) {
          return { ...cartItem, quantity: cartItem.quantity - 1 }; // Décrémente la quantité si l'article est le meme
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity > 0); // Filtre pour retirer les articles dont la quantité est à 0

    setCart(updatedCart); // Met à jour le panier avec les nouvelles quantités
  };

  // Fonction pour supprimer complètement un article du panier
  const handleRemove = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.name !== item.name); // Filtre les articles pour supprimer celui qui correspond
    setCart(updatedCart); // Met à jour le panier
  };

  // Calculer le total du panier
  const totalPrice = cart.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  // Fonction pour valider la commande
  const handleValidationOrder = async () => {
    try {
      const orderDetails = {
        items: cart.map((item) => ({
          etat: item.etat,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: totalPrice.toFixed(2),
      };

      const response = await axios.post(
        "https://site--backend-lrdb--dnxhn8mdblq5.code.run/order",
        orderDetails
      );
      navigate(`/order/${response.data.id}`);
      setCart([]); // Vider la panier apres la validation de la commande
    } catch (error) {
      console.log("Erreur lors de l'envoi de la commande :", error);
    }
  };

  // Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    Cookies.remove("token"); // Supprimer le token des cookies
    Cookies.remove("username"); // Supprimer le nom d'utilisateur des cookies
    navigate("/menu"); // Rediriger vers la page de connexion
  };

  return (
    <div className="sidebar">
      <div className="username">
        <h2>
          Bienvenue,
          {username ? (
            <span>
              {username}
              <button onClick={handleLogout}>
                <IoMdClose />
              </button>
            </span>
          ) : (
            <button onClick={() => navigate("/connection")}>
              Connectez-vous
            </button>
          )}
        </h2>
        <h3>Prêt à vous régaler aujourd'hui ?</h3>
      </div>

      <h2>Votre Panier :</h2>
      <div className="scroll-container">
        {cart.length === 0 ? (
          <p>Votre panier est vide...</p>
        ) : (
          cart.map((item) => (
            <div key={item.name} className="cart-item">
              <p>
                {item.name} - {item.quantity} x {item.price.toFixed(2)} €
              </p>
              <div className="cart-controls">
                <button onClick={() => handleDecrease(item)}>-</button>
                <button onClick={() => handleIncrease(item)}>+</button>
                <button onClick={() => handleRemove(item)} className="button-x">
                  x
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="total">
        <h2>
          Total : <span>{totalPrice.toFixed(2)}</span>€
        </h2>
        {cart.length > 0 && (
          <button
            onClick={handleValidationOrder}
            className="button"
            aria-label="Valider la commande"
          >
            <span className="valider">VALIDER</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SideBar;
