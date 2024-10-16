import { useNavigate } from "react-router-dom";

// CSS
import "../App.css";

const ConsoleAdmin = () => {
  const navigate = useNavigate();

  return (
    <main className="console-admin">
      <h1>Bienvenue</h1>
      <div>
        <button className="btn-login" onClick={() => navigate("/signup")}>
          Inscription
        </button>
        <button className="btn-login" onClick={() => navigate("/login")}>
          Connexion
        </button>
      </div>
    </main>
  );
};

export default ConsoleAdmin;
