import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

import "../assets/styles/sign.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      // Requête de connexion vers l'API
      const response = await axios.post(
        "https://site--backend-lrdb--dnxhn8mdblq5.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );

      // Stocker le token dans les cookies pour une durée de 30 jours
      Cookies.set("token", response.data.token);
      Cookies.set("username", response.data.username);

      // Rediriger vers la page admin après succès
      navigate("/adminPage");
    } catch (error) {
      // Gérer les erreurs en affichant un message d'erreur
      setErrorMessage(
        error.response
          ? error.response.data.message
          : "Une erreur s'est produite"
      );
      setIsLoading(false); // Arrêter le chargement après la réponse
    }
  };

  return (
    <main className="main-login">
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="inpt-login"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <div className="inpt-login-pw">
          <input
            className="inpt-login"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
          <button
            className="btn-eye"
            type="button"
            onClick={togglePasswordVisibility}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          className="btn-login"
          type="submit"
          disabled={isLoading || !email || !password}
        >
          {isLoading ? "Connexion..." : "Connexion"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Link to="/signup">
          <p className="p-login">Tu n'as pas un compte ? Inscris-toi!</p>
        </Link>
      </form>
    </main>
  );
};

export default Login;
