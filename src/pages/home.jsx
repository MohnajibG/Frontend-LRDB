import { useNavigate } from "react-router-dom";
import background from "../assets/images/backgroundimg.jpg";
import "../assets/styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="home">
      <div className="image-container">
        <img
          src={background}
          alt="Burger Background"
          className="background-image"
        />
        <div className="content-overlay">
          <h1>Bienvenue chez Le Roi du Burger !!!</h1>
          <p>Pour passer votre commande</p>
          <button
            className="button-home"
            onClick={() => {
              navigate("/menu");
            }}
          >
            C'est par ICI
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
