import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import PageNotFound from "../components/PageNotFound"
import Unauthorized from "../pages/Unauthorized"
import ProtectedRoutes from "./ProtectedRoutes"
import AdminLayout from "../components/DefaultLayout/AdminLayout"
import TermsAndConditions from "../pages/TermsAndConditions"

const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"))
const SignupDashboard = lazy(() => import("../pages/Seller/SellerDashboard"))

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
          {/* Admin Routes */}

          <Route
            path="/admin"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<AdminDashboard />} />
          </Route>
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default AppRoutes