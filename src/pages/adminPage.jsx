import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

// Styles
import "../assets/styles/pageAdmin.css";

const AdminPage = ({ token }) => {
  const [dataOrder, setDataOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteData, setDeleteData] = useState("");
  const [changeState, setChangeState] = useState("");

  const handleDelete = async (orderId) => {
    try {
      const response = await axios.delete(
        `site--backend-lrdb--dnxhn8mdblq5.code.run/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeleteData(response.data);
      setDataOrder((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.log("Erreur lors de la suppression");
    }
  };

  const handleChangeStateOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `site--backend-lrdb--dnxhn8mdblq5.code.run/order/${orderId}`,
        { etat: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChangeState(response.data);
      setDataOrder((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, etat: true } : order
        )
      );
    } catch (error) {
      console.log("Erreur lors du changement de statut");
    }
  };

  const fetchDataOrder = async () => {
    try {
      const response = await axios.get(
        "site--backend-lrdb--dnxhn8mdblq5.code.run/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataOrder(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Erreur lors de la récupération des commandes ===>", error);
      setIsLoading(false);
    }
  };

  // Utilisation du useEffect pour charger les données de commande et mettre à jour régulièrement
  useEffect(() => {
    fetchDataOrder(); // Charger une première fois les données

    // Mettre à jour les commandes toutes les 3 secondes
    const intervalId = setInterval(() => {
      fetchDataOrder();
    }, 3000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main className="admin-page">
      {dataOrder.map((order) => (
        <div key={order._id} className="commande">
          <div className="header-commande">
            <button
              className="button-check"
              onClick={() => handleChangeStateOrder(order._id)}
            >
              <FaCheck />
            </button>
            <button
              className="button-delete"
              onClick={() => handleDelete(order._id)}
            >
              <IoMdClose />
            </button>
            <h3>Commande #{order.orderNumber}</h3>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
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
      ))}
    </main>
  );
};

export default AdminPage;
