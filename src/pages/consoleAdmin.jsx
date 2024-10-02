import { useNavigate } from "react-router-dom";

//CSS
import "../App.css";
const ConsoleAdmin = () => {
  const navigate = useNavigate();

  return (
    <main>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
      <button onClick={() => navigate("/login")}>Log In</button>
    </main>
  );
};

export default ConsoleAdmin;
