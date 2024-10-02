import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ({ handleToken }) => {
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
      const response = await axios.post("http://localhost:3000/user/signup", {
        username,
        code,
      });
      handleToken(response.data.token, response.data.username);
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 409) {
        setErrorMessage("Cet email est déjà utilisé");
      } else if (error.response?.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      } else {
        setErrorMessage("Veuillez réessayer");
        setIsLoading(false);
      }
    }

    return (
      <main className="main-signup">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="inpt-signup"
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <div className="inpt-signup-pw ">
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
              className="btn-signup"
              type="button"
              onClick={toggleCodeVisibility}
              style={{ border: "none", background: "none", cursor: "pointer" }}
            >
              {codeVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            className="btn-signup"
            type="submit"
            disabled={isLoading || !username || !code}
          >
            {isLoading ? "Inscription..." : "Sign Up"}
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <Link to="/login">
            <p className="p-signup">Tu as déjà un compte ? Connecte-toi!</p>
          </Link>
        </form>
      </main>
    );
  };
};
export default Signup;
