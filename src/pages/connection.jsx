import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Importer le gestionnaire de cookies

// CSS
import "../App.css";

const ConsoleAdmin = () => {
  const navigate = useNavigate();

  // Vérifier si un token existe dans les cookies
  const token = Cookies.get("token");

  const handleLogout = () => {
    Cookies.remove("token"); // Supprimer le cookie token
    navigate("/"); // Redirection vers la page d'accueil ou de connexion après la déconnexion
  };

  return (
    <main className="console-admin">
      <h1>Bienvenue</h1>
      <div>
        {token ? (
          // Si un token est présent, afficher un bouton de déconnexion
          <button className="btn-login" onClick={handleLogout}>
            Déconnexion
          </button>
        ) : (
          // Si aucun token, afficher les boutons d'inscription et de connexion
          <>
            <button className="btn-login" onClick={() => navigate("/signup")}>
              Inscription
            </button>
            <button className="btn-login" onClick={() => navigate("/login")}>
              Connexion
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default ConsoleAdmin;
