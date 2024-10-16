import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
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
        "https://site--backend-lrdb--dnxhn8mdblq5.code.run/user/signup",
        {
          username,
          email,
          password,
        }
      );
      Cookies.set("token", response.data.token, { expires: 30 });

      // Envoie le token reçu pour l'authentification après inscription
      handleToken(response.data.token);
      navigate("/login");
    } catch (error) {
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      } else if (error.response.data.message === "Email already in database") {
        setErrorMessage("Cet email est déjà enregistré.");
      } else if (
        error.response.data.message ===
        "Password must be at least 8 characters long"
      ) {
        setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
      } else {
        setErrorMessage("Une erreur s'est produite, veuillez réessayer.");
      }
      setIsLoading(false);
    }
  };

  return (
    <main className="main-login">
      <h1>S'inscrire</h1>
      <form onSubmit={handleSubmit} className="sign-up">
        <input
          className="inpt-login"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="inpt-login"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
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
          disabled={isLoading || !username || !email || !password}
        >
          {isLoading ? "Inscription..." : "Envoyer"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Link to="/login">
          <p className="p-login">Tu as déjà un compte ? Connecte-toi!</p>
        </Link>
      </form>
    </main>
  );
};

export default Signup;
