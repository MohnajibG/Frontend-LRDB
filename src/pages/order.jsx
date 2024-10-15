import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../assets/styles/order.css";

const Order = () => {
  const { id } = useParams(); // Récupère l'ID de la commande à partir de l'URL
  const [order, setOrder] = useState(null); // Initialise avec null pour éviter un objet vide par défaut
  const [isLoading, setIsLoading] = useState(true); // Gestion de l'état de chargement
  const [errorMessage, setErrorMessage] = useState(""); // État pour les erreurs

  const fetchDataOrder = async () => {
    try {
      const response = await axios.get(
        `https://site--backend-lrdb--dnxhn8mdblq5.code.run/order/${id}`
      );
      setOrder(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        // Réponse du serveur avec un code autre que 2xx
        if (error.response.status === 404) {
          setErrorMessage("Commande non trouvée.");
        } else {
          setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
        }
      } else {
        // Erreur réseau ou autre
        setErrorMessage(
          "Impossible de récupérer la commande. Problème de réseau."
        );
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataOrder();

    // Re-fetch every 5 seconds
    const intervalId = setInterval(fetchDataOrder, 5000);

    return () => clearInterval(intervalId); // Nettoyage de l'intervalle lors du démontage
  }, [id]);

  return isLoading ? (
    <div>Loading...</div>
  ) : errorMessage ? (
    <div className="error">{errorMessage}</div>
  ) : (
    order && (
      <main className="order">
        <div className="header-order">
          <h3>Commande #{order.orderNumber}</h3>
          <p>{new Date(order.createdAt).toLocaleString()}</p>
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
        <p>Merci de vous diriger au comptoir pour récupérer votre commande.</p>
        <p>Bon appétit !</p>
      </main>
    )
  );
};

export default Order;
