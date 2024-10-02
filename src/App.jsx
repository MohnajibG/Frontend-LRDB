import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

function App() {
  return (
    <Router>
      <Header />
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);
  const navigate = useNavigate();

  const handleValidation = () => {
    setOrderNumber(orderNumber + 1);
    navigate("/order");
  };
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminPage" element={<AdminPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
