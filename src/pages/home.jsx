import { Link } from "react-router-dom";
// Styles
import "../assets/styles/home.css";
const Home = () => {
  return (
    <main className="home">
      <h1>Bienvenue au Roi 👑 du Burger 🍔 !!!</h1>
      <div>pour commander</div>
      <Link to="/menu" className="button">
        C'est par ICI
      </Link>
    </main>
  );
};

export default Home;
