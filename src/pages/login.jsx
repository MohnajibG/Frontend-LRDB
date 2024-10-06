import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie"; // Assurez-vous d'importer Cookies

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
      console.log("Réponse complète: ", response.data);
      Cookies.set("token", response.data.token, { expires: 30 });
      console.log("isAdmin ==>", response.data.isAdmin);
      handleToken(response.data.token);
      if (response.data.isAdmin) {
        navigate("/adminPage");
      } else {
        navigate("/menu");
      }
    } catch (error) {
      if (error.response?.data?.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      } else if (error.response?.data?.message === "Invalid credentials") {
        setErrorMessage("E-mail ou mot de passe incorrect.");
      } else {
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
      setIsLoading(false);
    }
  };

  return (
    <main className="main-login">
      <h1>Log In</h1>
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
          {isLoading ? "Connexion..." : "Log In"}
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
