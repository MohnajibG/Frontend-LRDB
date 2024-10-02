import { useState, useEffect } from "react";
import axios from "axios";

// Styles
import "../assets/styles/home.css";

const adminPage = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataOrder = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        setDataOrder(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Erreur lors de la récupération des commandes ===>", error);
        setIsLoading(false);
      }
    };
    fetchDataOrder();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main className="home">
      <div>
        {dataOrder.map((order) => {
          return (
            <div key={order._id}>
              <h3>Commande #{order.orderNumber}</h3>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <h4>Détails de la commande:</h4>
              <div>
                {order.items.map((item, index) => (
                  <div key={index}>
                    <p>
                      {item.etat === false ? (
                        <div
                          style={{
                            backgroundColor: "red",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        ></div>
                      ) : (
                        <div
                          style={{
                            backgroundColor: "green",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        ></div>
                      )}
                    </p>
                    <p>
                      {item.name} - {item.quantity} x {item.price} €
                    </p>
                  </div>
                ))}
              </div>
              <p>Total: {order.totalPrice} €</p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default adminPage;
