import { useNavigate } from "react-router-dom";
import background from "../assets/images/backgroundimg.jpg";
// Styles
import "../assets/styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main class="home">
      <div class="image-container">
        <img
          src={background}
          alt="Burger Background"
          class="background-image"
        />
        <div class="content-overlay">
          <h1>Bienvenue chez Le Roi du Burger !!!</h1>
          <p>pour passer votre commander</p>
          <button
            class="button-home"
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
