import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../assets/styles/order.css";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataOrder = async () => {
    try {
      const response = await axios.get(
        `https://site--backend-lrdb--dnxhn8mdblq5.code.run/order/${id}`
      );
      setOrder(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Erreur lors de la récupération des commandes ===>", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataOrder();

    // Re-fetch every 5 seconds
    const intervalId = setInterval(fetchDataOrder, 5000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [id]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main className="order">
      <div className="header-order">
        <h3>Commande #{order.orderNumber}</h3>
        <p>{new Date(order.createdAt).toLocaleString()}</p>
        {order.etat ? (
          <div
            style={{
              backgroundColor: "green",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
            }}
          ></div>
        ) : (
          <div
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
        <h4>Détails de la commande:</h4>
        {order.items && order.items.length > 0 ? (
          order.items.map((item) => {
            const totalItem = item.quantity * item.price;
            return (
              <div key={item.name}>
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
      <p className="order-total">Total: {order.totalPrice?.toFixed(2)} €</p>
    </main>
  );
};

export default Order;
