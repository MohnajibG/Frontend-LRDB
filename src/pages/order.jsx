import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "../assets/styles/order.css";

const Order = () => {
  const { id } = useParams(); // Récupère l'ID de la commande à partir de l'URL
  const [order, setOrder] = useState(null); // Initialise avec null pour éviter un objet vide par défaut
  const [isLoading, setIsLoading] = useState(true); // Gestion de l'état de chargement
  const username = Cookies.get("username");
  const navigate = useNavigate(); // Ajout de la fonction navigate pour rediriger après paiement

  const handleLogout = () => {
    Cookies.remove("token"); // Suppression du cookie token
    Cookies.remove("username");
    navigate("/"); // Redirection vers la page d'accueil après déconnexion
  };

  const fetchDataOrder = async () => {
    try {
      const response = await axios.get(
        `https://site--backend-lrdb--dnxhn8mdblq5.code.run/order/${id}`
      );
      setOrder(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataOrder();

    // Actualisation toutes les 5 secondes
    const intervalId = setInterval(fetchDataOrder, 5000);

    return () => clearInterval(intervalId); // Nettoyage de l'intervalle lors du démontage
  }, [id]);

  return isLoading ? (
    <div>Chargement...</div>
  ) : (
    order && (
      <main className="order">
        <div className="header-order">
          <h3>Commande #{order.orderNumber}</h3>
          <p>{new Date(order.createdAt).toLocaleString()}</p>
          {/* Indicateur visuel du statut de la commande */}
          {order.etat ? (
            <div
              className="status-indicator"
              style={{
                backgroundColor: "green",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
            ></div>
          ) : (
            <div
              className="status-indicator"
              style={{
                backgroundColor: "red",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
            ></div>
          )}
        </div>

        <div className="order-details">
          <h4>Détails de la commande :</h4>
          {order.items && order.items.length > 0 ? (
            order.items.map((item) => {
              const totalItem = item.quantity * item.price;
              return (
                <div key={item.id}>
                  <p>
                    {item.name} - {item.quantity} x {item.price.toFixed(2)} €
                    (Total: {totalItem.toFixed(2)} €)
                  </p>
                </div>
              );
            })
          ) : (
            <p>Aucun article dans cette commande.</p>
          )}
        </div>

        <p className="order-total">Total : {order.totalPrice?.toFixed(2)} €</p>
        <p>
          Après votre paiement, merci de vous diriger au comptoir pour récupérer
          votre commande.
        </p>
        <p>Bon appétit {username} !</p>

        <Link to="/">
          <button className="logout-button" onClick={handleLogout}>
            Payer
          </button>
        </Link>
      </main>
    )
  );
};

export default Order;
