import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/DefaultLayout/AdminLayout";

const AdminDashboard = () => {
  const navigate = useNavigate();
  // Mock data (replace with actual API data in a real application)
  const dashboardData = {
    totalProducts: 1250,
    categories: [
      { name: "Electronics", productCount: 350 },
      { name: "Fashion", productCount: 280 },
      { name: "Home & Living", productCount: 220 },
      { name: "Books", productCount: 150 },
      { name: "Sports", productCount: 250 },
    ],
    topSellers: [
      { name: "TechTrendz", sales: 15000, products: 120 },
      { name: "StyleHub", sales: 12000, products: 95 },
      { name: "HomeHaven", sales: 9800, products: 80 },
    ],
    topProducts: [
      { name: "Smartphone X", sales: 500, price: 699 },
      { name: "Leather Jacket", sales: 320, price: 199 },
      { name: "Fitness Tracker", sales: 280, price: 99 },
    ],
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-base-content mb-6">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Products</div>
              <div className="stat-value text-secondary">
                {dashboardData.totalProducts.toLocaleString()}
              </div>
              <div className="stat-desc">Across all categories</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Categories</div>
              <div className="stat-value text-secondary">
                {dashboardData.categories.length}
              </div>
              <div className="stat-desc">Active categories</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Users</div>
              <div className="stat-value text-secondary">
                50
              </div>
              <div className="stat-desc">Total users</div>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">
              Categories Overview
            </h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Product Count</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.categories.map((category, index) => (
                    <tr key={index} className="hover">
                      <td>{category.name}</td>
                      <td>{category.productCount}</td>
                      <td>
                        <button className="btn btn-ghost btn-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Sellers and Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Sellers */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-xl font-semibold mb-4">
                Top Sellers
              </h2>
              <div className="space-y-4">
                {dashboardData.topSellers.map((seller, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-base-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-sm text-base-content/70">
                        {seller.products} products
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-success">
                        ${seller.sales.toLocaleString()}
                      </p>
                      <button className="btn btn-ghost btn-sm mt-1">
                        View Store
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-xl font-semibold mb-4">
                Top Products
              </h2>
              <div className="space-y-4">
                {dashboardData.topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-base-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-base-content/70">
                        ${product.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-info">
                        {product.sales} unit sold
                      </p>
                      <button className="btn btn-ghost btn-sm mt-1">
                        View Product
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Feature: Quick Actions */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="btn btn-primary" onClick={() => navigate("/admin/products")}>
                Add New Product
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/admin/users")}>
                Manage Users
              </button>
              <button className="btn btn-accent" onClick={() => navigate("/admin/feedback")}>
                Review Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;