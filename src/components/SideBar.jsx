import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/sidebar.css";
import axios from "axios";

const SideBar = ({ cart, setCart }) => {
  const location = useLocation();

  const navigate = useNavigate();
  if (
    location.pathname === "/order" ||
    location.pathname.startsWith("/order/")
  ) {
    return null;
  }

  const handleIncrease = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCart(updatedCart);
  };

  const handleDecrease = (item) => {
    const updatedCart = cart
      .map((cartItem) => {
        if (cartItem.name === item.name) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity > 0);

    setCart(updatedCart);
  };

  const handleRemove = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.name !== item.name);
    setCart(updatedCart);
  };

  // Calculer le total du panier
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Fonction pour valider la commande
  const handleValidationOrder = async () => {
    try {
      // Création de l'objet de la commande
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
        `https://site--backend-lrdb--dnxhn8mdblq5.code.run/order`,
        orderDetails
      );
      navigate(`/order/${response.data.id}`);
      // console.log("Commande envoyée avec ID ==>", response.data.id);
      setCart([]);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la commande :", error);
    }
  };

  return (
    <div className="sidebar">
      <h2>Votre Panier : </h2>

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
        <h2>Total: {totalPrice.toFixed(2)}€</h2>
        {cart.length > 0 && (
          <button
            onClick={handleValidationOrder}
            className="button"
            aria-label="Valider la commande"
          >
            VALIDER
          </button>
        )}
      </div>
    </div>
  );
};

export default SideBar;
