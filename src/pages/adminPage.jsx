import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

// Styles
import "../assets/styles/pageAdmin.css";

const AdminPage = () => {
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
    <main className="admin-page">
      {dataOrder.map((order) => {
        return (
          <div key={order._id} className="commande">
            <div className="header-commande">
              <button className="button-check">
                <FaCheck />
              </button>
              <button className="button-delete">
                <IoMdClose />
              </button>
              <h3>Commande #{order.orderNumber}</h3>
              <p> {new Date(order.createdAt).toLocaleString()}</p>
              {order.etat === false ? (
                <div
                  className="etat-order"
                  style={{
                    backgroundColor: "red",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                ></div>
              ) : (
                <div
                  className="etat-order"
                  style={{
                    backgroundColor: "green",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                ></div>
              )}
            </div>
            <h4>Détails de la commande:</h4>

            {order.items.map((item) => (
              <div key={item.name} className="commande-details">
                <p>{item.name}</p>
                <p>{item.quantity}</p>x<p>{item.price}€</p>
              </div>
            ))}

            <p className="total-commande">
              Total: {order.totalPrice?.toFixed(2)} €
            </p>
          </div>
        );
      })}
    </main>
  );
};

export default AdminPage;
