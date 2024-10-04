import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [codeVisible, setCodeVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const toggleCodeVisibility = () => {
    setCodeVisible((avant) => !avant);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "site--backend-lrdb--dnxhn8mdblq5.code.run/user/login",
        {
          username,
          code,
        }
      );

      handleToken(response.data.token, response.data.username);
      navigate("/adminPage");
    } catch (error) {
      setErrorMessage("Veuillez réessayer");
      setIsLoading(false);
    }
  };

  return (
    <main className="main-login">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="inpt-login"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username} // Correction ici
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <div className="inpt-login-pw">
          <input
            className="inpt-login"
            type={codeVisible ? "number" : "password"}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Votre code utilisateur de 6 chiffres"
            maxLength="6"
            required
          />
          <button
            className="btn-eye"
            type="button"
            onClick={toggleCodeVisibility}
            style={{ border: "none", background: "none" }}
          >
            {codeVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          className="btn-login"
          type="submit"
          disabled={isLoading || !username || !code}
        >
          {isLoading ? "Connexion..." : "Log In"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </main>
  );
};

export default Login;
