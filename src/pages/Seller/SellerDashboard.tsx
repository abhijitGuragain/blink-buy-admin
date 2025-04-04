import SellerLayout from "../../components/DefaultLayout/SellerLayout";

const SellerDashboard = () => {
  // Mock data for seller dashboard (replace with API data in production)
  const sellerData = {
    totalSales: 24500,
    totalOrders: 320,
    totalProducts: 45,
    pendingOrders: 15,
    recentOrders: [
      { id: 'ORD001', customer: 'John Doe', product: 'Smartphone X', amount: 699, status: 'Shipped', date: '2024-04-03' },
      { id: 'ORD002', customer: 'Jane Smith', product: 'Leather Jacket', amount: 199, status: 'Pending', date: '2024-04-02' },
      { id: 'ORD003', customer: 'Bob Johnson', product: 'Coffee Maker', amount: 89, status: 'Delivered', date: '2024-04-01' },
    ],
    topProducts: [
      { name: 'Smartphone X', sales: 150, revenue: 104850 },
      { name: 'Leather Jacket', sales: 85, revenue: 16915 },
      { name: 'Running Shoes', sales: 60, revenue: 7740 },
    ],
    performanceMetrics: {
      averageRating: 4.2,
      onTimeDelivery: 92,
      customerSatisfaction: 88,
    },
  };

  return (
    <SellerLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-base-content mb-6">Seller Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Sales</div>
              <div className="stat-value text-secondary">${sellerData.totalSales.toLocaleString()}</div>
              <div className="stat-desc">All-time revenue</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Orders</div>
              <div className="stat-value text-secondary">{sellerData.totalOrders}</div>
              <div className="stat-desc">Processed orders</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Products</div>
              <div className="stat-value text-secondary">{sellerData.totalProducts}</div>
              <div className="stat-desc">In your catalog</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Pending Orders</div>
              <div className="stat-value text-secondary">{sellerData.pendingOrders}</div>
              <div className="stat-desc">Awaiting action</div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerData.recentOrders.map((order) => (
                    <tr key={order.id} className="hover">
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td>${order.amount.toFixed(2)}</td>
                      <td>
                        <span
                          className={`badge ${order.status === 'Shipped'
                            ? 'badge-info'
                            : order.status === 'Pending'
                              ? 'badge-warning'
                              : 'badge-success'
                            }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-ghost btn-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products and Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-xl font-semibold mb-4">Top Products</h2>
              <div className="space-y-4">
                {sellerData.topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-base-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-base-content/70">{product.sales} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-success">${product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-xl font-semibold mb-4">Performance Metrics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Average Rating</span>
                  <span className="text-lg text-info">{sellerData.performanceMetrics.averageRating}/5</span>
                </div>
                <progress
                  className="progress progress-info w-full"
                  value={sellerData.performanceMetrics.averageRating * 20}
                  max="100"
                />
                <div className="flex justify-between items-center">
                  <span className="font-medium">On-Time Delivery</span>
                  <span className="text-lg text-secondary">{sellerData.performanceMetrics.onTimeDelivery}%</span>
                </div>
                <progress
                  className="progress progress-secondary w-full"
                  value={sellerData.performanceMetrics.onTimeDelivery}
                  max="100"
                />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Customer Satisfaction</span>
                  <span className="text-lg text-secondary">{sellerData.performanceMetrics.customerSatisfaction}%</span>
                </div>
                <progress
                  className="progress progress-secondary w-full"
                  value={sellerData.performanceMetrics.customerSatisfaction}
                  max="100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="btn btn-primary">Add Product</button>
              <button className="btn btn-secondary">View Orders</button>
              <button className="btn btn-accent">Check Feedback</button>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerDashboard;