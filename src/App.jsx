import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

// Style
import "./App.css";

// Composants
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Menu from "./pages/menu";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AdminPage from "./pages/adminPage";

// Pages
import Home from "./pages/home";
import Order from "./pages/order";
import ConsoleAdmin from "./pages/consoleAdmin";

function App() {
  return (
    <Router>
      <Header />
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  const [token, setToken] = useState(Cookies.get("token"));
  const [cart, setCart] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 30 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleValidation = () => {
    setOrderNumber(orderNumber + 1);
    // Logique pour la validation de commande
  };

  const location = useLocation();

  return (
    <div>
      {location.pathname === "/menu" && (
        <SideBar
          cart={cart}
          setCart={setCart}
          handleValidation={handleValidation}
          orderNumber={orderNumber}
          setOrderNumber={setOrderNumber}
        />
      )}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/menu"
            element={<Menu cart={cart} setCart={setCart} />}
          />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/consoleAdmin" element={<ConsoleAdmin />} />
          <Route
            path="/adminPage"
            element={
              token ? (
                <AdminPage token={token} handleToken={handleToken} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
