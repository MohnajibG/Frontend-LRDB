import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

import { useLocation } from "react-router-dom";

// Styles
import "../assets/styles/pageAdmin.css";

const AdminPage = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const { token, isAdmin } = location.state || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      // Redirige l'utilisateur s'il n'est pas admin
      navigate("/menu");
    }
  }, [isAdmin, navigate]);

  const handleDelete = async (orderId) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await axios.delete(
        `https://site--backend-lrdb--dnxhn8mdblq5.code.run/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataOrder((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.log("Erreur lors de la suppression");
      setErrorMessage("Impossible de supprimer la commande.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeStateOrder = async (orderId) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await axios.put(
        `https://site--backend-lrdb--dnxhn8mdblq5.code.run/order/${orderId}`,
        { etat: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataOrder((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, etat: true } : order
        )
      );
    } catch (error) {
      console.log("Erreur lors du changement de statut");
      setErrorMessage("Impossible de changer le statut de la commande.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataOrder = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://site--backend-lrdb--dnxhn8mdblq5.code.run/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataOrder(response.data);
    } catch (error) {
      console.log("Erreur lors de la récupération des commandes ===>", error);
      setErrorMessage("Erreur lors de la récupération des commandes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchDataOrder();
      const intervalId = setInterval(() => {
        fetchDataOrder();
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [isAdmin]);

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
