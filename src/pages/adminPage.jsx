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

  // Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    Cookies.remove("token"); // Suppression du cookie token
    navigate("/"); // Redirection vers la page de connexion
  };
  // Fonction pour supprimer une commande avec son ID
  const handleDelete = async (orderId) => {
    try {
      const response = await axios.delete(
        `https://site--backend-lrdb--dnxhn8mdblq5.code.run/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`, // Utilisation du token pour authentification
          },
        }
      );
      setDeleteData(response.data); // Fonction pour supprimer une commande

      // Met à jour la liste des commandes après la suppression avec filter
      setDataOrder((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.log("Erreur lors de la suppression", error);
    }
  };

  // Fonction pour changer l'état d'une commande
  const handleChangeStateOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `https://site--backend-lrdb--dnxhn8mdblq5.code.run/order/${orderId}`,
        { etat: true }, // Envoi d'un état modifié à "true"
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`, // Utilisation du token pour authentification
          },
        }
      );
      setChangeState(response.data); // Mettre à jour l'état après le changement

      // Mettre a jour l'etat de la commande
      setDataOrder((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, etat: true } : order
        )
      );
    } catch (error) {
      console.log("Erreur lors du changement de statut", error);
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
              Authorization: `Bearer ${Cookies.get("token")}`, // Utilisation du token pour authentification de la requete
            },
          }
        );
        setDataOrder(response.data); // Met à jour l'état après le changement
        setIsLoading(false);
        navigate("/adminPage");
      } catch (error) {
        // Si le backend renvoie une erreur  401 Unauthorized
        if (error.response.status === 401) {
          navigate("/menu"); // Rediriger vers la page menu
        }
        setIsLoading(false);
      }
    };

    fetchDataOrder();
    const intervalId = setInterval(fetchDataOrder, 1000);

    return () => clearInterval(intervalId); // Nettoyage de l'intervalle lors du démontage
  }, [navigate]); // [] signifie que l'effet ne se déclenche qu'une fois au montage

  return isLoading ? (
    <div>Loading...</div>
  ) : dataOrder.length === 0 ? (
    <main className="admin-page0">
      <button className="logout-button" onClick={handleLogout}>
        Déconnexion
      </button>
      <h1>Aucune commande en cours de préparation</h1>
      <img src={burger} alt="" />
    </main>
  ) : (
    <main>
      <button className="logout-button" onClick={handleLogout}>
        Déconnexion
      </button>
      <div className="admin-page">
        {dataOrder.map((order) => (
          <div key={order._id} className="commande">
            <div className="header-commande">
              <button
                className="button-check"
                onClick={() => handleChangeStateOrder(order._id)}
                disabled={order.etat === true} // Désactiver si la commande est déjà validée
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
      </div>
    </main>
  );
};

export default AdminPage;
