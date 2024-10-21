import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

// Style
import "./App.css";

// Composants
import Header from "./components/Header";
import SideBar from "./components/SideBar";

// Pages
import Menu from "./pages/menu";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AdminPage from "./pages/adminPage";
import Home from "./pages/home";
import Order from "./pages/order";
import Connection from "./pages/connection";

function App() {
  return (
    <Router>
      <Header />
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  const [cart, setCart] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);

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
          // username={username}
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/adminPage" element={<AdminPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
