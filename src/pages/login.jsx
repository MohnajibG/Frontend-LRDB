import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://site--backend-lrdb--dnxhn8mdblq5.code.run/user/login",
        {
          email,
          password,
        }
      );

      Cookies.set("token", response.data.token, { expires: 30 });

      // Envoie le token reçu pour l'authentification après connexion
      handleToken(response.data.token);
      navigate("/"); // Redirection vers la page d'accueil après connexion
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage("Identifiants incorrects.");
      } else {
        setErrorMessage("Une erreur s'est produite, veuillez réessayer.");
      }
      setIsLoading(false);
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
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Link to="/signup">
          <p className="p-login">Pas encore de compte ? Inscris-toi!</p>
        </Link>
      </form>
    </main>
  );
};

export default Login;
