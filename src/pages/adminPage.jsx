import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

// Styles
import "../assets/styles/pageAdmin.css";

import burger from "../assets/images/burger.gif";

const AdminPage = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteData, setDeleteData] = useState("");
  const [changeState, setChangeState] = useState("");
  const navigate = useNavigate();

  // Fonction pour supprimer une commande
  const handleDelete = async (orderId) => {
    try {
      const response = await axios.delete(
        `https://site--backend-lrdb--dnxhn8mdblq5.code.run/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`, // Centraliser l'utilisation du token
          },
        }
      );
      setDeleteData(response.data);
      setDataOrder((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  // Fonction pour changer l'état d'une commande
  const handleChangeStateOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `https://site--backend-lrdb--dnxhn8mdblq5.code.run/order/${orderId}`,
        { etat: true },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`, // Centraliser l'utilisation du token
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
      console.error("Erreur lors du changement de statut", error);
    }
  };

  // Récupérer les commandes au chargement de la page
  useEffect(() => {
    const fetchDataOrder = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-lrdb--dnxhn8mdblq5.code.run/orders",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`, // Centraliser l'utilisation du token
            },
          }
        );
        setDataOrder(response.data);
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.data.message === "Unauthorized") {
          navigate("/"); // Rediriger en cas d'erreur d'authentification
        }
        setIsLoading(false);
      }
    };

    fetchDataOrder();
    const intervalId = setInterval(fetchDataOrder, 1000);

    return () => clearInterval(intervalId); // Nettoyage de l'intervalle lors du démontage
  }, []); // [] signifie que l'effet ne se déclenche qu'une fois au montage

  return isLoading ? (
    <div>Loading...</div>
  ) : dataOrder.length === 0 ? (
    <main className="admin-page0">
      <h1>Aucune commande en cours de préparation</h1>
      <img src={burger} alt="" />
    </main>
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
