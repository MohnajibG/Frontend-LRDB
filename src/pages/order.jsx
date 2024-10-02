import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Styles
import "../assets/styles/order.css";

const Order = () => {
  const { id } = useParams();

  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/order/${id}`);

        setOrder(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Erreur lors de la récupération des commandes ===>", error);
        setIsLoading(false);
      }
    };

    fetchDataOrder();
  }, [id]);

  return isLoading ? (
    <main>
      <h1>Loading...</h1>
    </main>
  ) : (
    <main>
      {/* {order.items.map((item) => (
        <div key={item.id}>
          {!item.etat && (
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
      ))} */}
      <div className="order">
        <h3>
          Commande <span># {order.orderNumber}</span>
        </h3>
        <h4>Détails de la commande:</h4>
        {order.items.map((item) => {
          const totalItem = item.quantity * item.price;
          return (
            <div key={item.id}>
              <p key={item.id}>
                {item.name} - {item.quantity} x {item.price.toFixed(2)} €
                (Total: {totalItem.toFixed(2)} €)
              </p>
            </div>
          );
        })}

        <p className="order-total">Total: {order.totalPrice.toFixed(2)} €</p>
      </div>
    </main>
  );
};

export default Order;
