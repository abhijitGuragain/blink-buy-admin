import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import PageNotFound from "./components/PageNotFound"
import Signup from "./pages/Signup"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import Users from "./pages/Admin/Users/Users"
import Products from "./pages/Admin/Products/Products"
import Feedback from "./pages/Admin/Feedback"
import SellerDashboard from "./pages/Seller/SellerDashboard"
import Orders from "./pages/Seller/Orders"
import SellerProducts from "./pages/Seller/Products"
import Customers from "./pages/Seller/Customers"
import CustomerFeedback from "./pages/Seller/CustomerFeedback"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/feedbacks" element={<Feedback />} />

          {/* Seller Routes */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/orders" element={<Orders />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/seller/customer" element={<Customers />} />
          <Route path="/seller/customer-feedbacks" element={<CustomerFeedback />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App