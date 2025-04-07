import { useState } from 'react';
import SellerLayout from "../../components/DefaultLayout/SellerLayout";

// Define Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Define Order interface
interface Order {
  id: number;
  customer: string;
  products: Product[];
  total: number;
  orderDate: string;
  status: string;
  shippingAddress: string;
}

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");

  // Mock order data
  const orders: Order[] = [
    {
      id: 1,
      customer: "John Doe",
      products: [
        { id: 1, name: "Smartphone X", price: 699.99, image: "https://via.placeholder.com/50x50" },
      ],
      total: 699.99,
      orderDate: "2024-04-01",
      status: "Pending",
      shippingAddress: "123 BlinkBuy Street, Commerce City, CC 45678",
    },
    {
      id: 2,
      customer: "Jane Smith",
      products: [
        { id: 2, name: "Leather Jacket", price: 199.99, image: "https://via.placeholder.com/50x50" },
        { id: 3, name: "Wireless Earbuds", price: 59.99, image: "https://via.placeholder.com/50x50" },
      ],
      total: 259.98,
      orderDate: "2024-04-02",
      status: "Shipped",
      shippingAddress: "456 Tech Park, Innovation Drive, Tech City, TC 12345",
    },
    {
      id: 3,
      customer: "Alice Johnson",
      products: [
        { id: 4, name: "Coffee Maker", price: 89.99, image: "https://via.placeholder.com/50x50" },
      ],
      total: 89.99,
      orderDate: "2024-04-03",
      status: "Delivered",
      shippingAddress: "789 Main St, Downtown, DC 67890",
    },
  ];

  const statuses = ["All", "Pending", "Shipped", "Delivered", "Cancelled"];

  // Calculate stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const shippedOrders = orders.filter(o => o.status === "Shipped").length;

  // Filter and sort orders
  const filteredOrders = orders
    .filter(
      (order) =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedStatus === "All" || order.status === selectedStatus)
    )
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      if (sortBy === "date-asc") return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
      if (sortBy === "total-desc") return b.total - a.total;
      if (sortBy === "total-asc") return a.total - b.total;
      return 0;
    });

  // Function to update order status (mock)
  const updateOrderStatus = (orderId: number, newStatus: string) => {
    // In a real app, this would make an API call to update the status
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  return (
    <SellerLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-base-content mb-6">Orders</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Orders</div>
              <div className="stat-value text-secondary">{totalOrders}</div>
              <div className="stat-desc">All orders received</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Pending Orders</div>
              <div className="stat-value text-secondary">{pendingOrders}</div>
              <div className="stat-desc">Awaiting action</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Shipped Orders</div>
              <div className="stat-value text-secondary">{shippedOrders}</div>
              <div className="stat-desc">In transit</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Revenue</div>
              <div className="stat-value text-secondary">${totalRevenue.toLocaleString()}</div>
              <div className="stat-desc">From orders</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">Filter Orders</h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="form-control w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Search by customer name..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="form-control w-full sm:w-1/4">
                <select
                  className="select select-bordered w-full"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="form-control w-full sm:w-1/4">
                <select
                  className="select select-bordered w-full"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date-desc">Date: Newest First</option>
                  <option value="date-asc">Date: Oldest First</option>
                  <option value="total-desc">Total: High to Low</option>
                  <option value="total-asc">Total: Low to High</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">All Orders</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Shipping Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover">
                        <td>#{order.id}</td>
                        <td>{order.customer}</td>
                        <td>
                          <div className="flex flex-wrap gap-2">
                            {order.products.map((product) => (
                              <div key={product.id} className="flex items-center gap-2">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-10 h-10 rounded"
                                />
                                <span>{product.name}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>
                          <span
                            className={`badge ${order.status === 'Shipped'
                              ? 'badge-info'
                              : order.status === 'Pending'
                                ? 'badge-warning'
                                : order.status === 'Delivered'
                                  ? 'badge-success'
                                  : 'badge-error'
                              }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>{order.shippingAddress}</td>
                        <td>
                          <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost btn-sm">
                              Actions
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                              {order.status !== "Shipped" && order.status !== "Delivered" && (
                                <li>
                                  <button onClick={() => updateOrderStatus(order.id, "Shipped")}>
                                    Mark as Shipped
                                  </button>
                                </li>
                              )}
                              {order.status !== "Delivered" && (
                                <li>
                                  <button onClick={() => updateOrderStatus(order.id, "Delivered")}>
                                    Mark as Delivered
                                  </button>
                                </li>
                              )}
                              {order.status !== "Cancelled" && (
                                <li>
                                  <button onClick={() => updateOrderStatus(order.id, "Cancelled")}>
                                    Cancel Order
                                  </button>
                                </li>
                              )}
                              <li>
                                <button>View Details</button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-12">
                        <p className="text-base-content/70">No orders found. Start selling to receive orders!</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>


      </div>
    </SellerLayout>
  );
};

export default Orders;