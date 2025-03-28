import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useSelector } from "react-redux";
import PaymentPage from "./pages/PaymentPage";
import AdminUser from "./pages/AdminUser"
import ResturantOrders from "./pages/ResturantOrders";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import OrderForm from "./pages/OrderForm";
import Orders from "./pages/Orders";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={
          user?.role === 'admin' ? (
            <AdminDashboard />
          ) : user?.role === 'restaurant' ? (  // Ensure correct role name here
            <RestaurantDashboard />
          ) : (
            <Home />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orderform" element={<OrderForm />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route
        path="/admin-dashboard"
        element={user?.role === 'admin' ? <AdminDashboard /> : <Login />}
      />
      <Route
        path="/admin/users"
        element={user?.role === 'admin' ? <AdminUser /> : <Login />}
      />
      <Route
        path="/restaurant-dashboard"
        element={user?.role === 'restaurant' ? <RestaurantDashboard /> : <Login />}
      />
      <Route
        path="/restaurant-orders/:id"
        element={user?.role === 'restaurant' ? <ResturantOrders /> : <Login />}
      />
    </Routes>
  );
}

export default App;


