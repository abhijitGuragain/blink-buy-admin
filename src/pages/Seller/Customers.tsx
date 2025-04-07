import { useState } from 'react';
import SellerLayout from "../../components/DefaultLayout/SellerLayout";

// Define Customer interface
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  joinDate: string;
}

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  // Mock customer data
  const customers: Customer[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@blinkbuy.com",
      phone: "+1 (800) 555-0123",
      totalOrders: 5,
      totalSpent: 1499.95,
      lastOrderDate: "2024-04-01",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@blinkbuy.com",
      phone: "+1 (800) 555-0124",
      totalOrders: 3,
      totalSpent: 599.97,
      lastOrderDate: "2024-03-28",
      joinDate: "2023-03-10",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@blinkbuy.com",
      phone: "+1 (800) 555-0125",
      totalOrders: 8,
      totalSpent: 2399.92,
      lastOrderDate: "2024-03-25",
      joinDate: "2022-11-05",
    },
    {
      id: 4,
      name: "Bob Williams",
      email: "bob.williams@blinkbuy.com",
      phone: "+1 (800) 555-0126",
      totalOrders: 1,
      totalSpent: 89.99,
      lastOrderDate: "2024-02-15",
      joinDate: "2024-01-20",
    },
  ];

  // Calculate stats
  const totalCustomers = customers.length;
  const totalOrdersFromCustomers = customers.reduce((sum, customer) => sum + customer.totalOrders, 0);
  const totalRevenueFromCustomers = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const avgSpendPerCustomer = totalCustomers > 0 ? totalRevenueFromCustomers / totalCustomers : 0;

  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "orders-desc") return b.totalOrders - a.totalOrders;
      if (sortBy === "orders-asc") return a.totalOrders - b.totalOrders;
      if (sortBy === "spent-desc") return b.totalSpent - a.totalSpent;
      if (sortBy === "spent-asc") return a.totalSpent - b.totalSpent;
      if (sortBy === "last-order-desc") return new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime();
      if (sortBy === "last-order-asc") return new Date(a.lastOrderDate).getTime() - new Date(b.lastOrderDate).getTime();
      return 0;
    });

  return (
    <SellerLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-base-content mb-6">Customers</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Customers</div>
              <div className="stat-value text-secondary">{totalCustomers}</div>
              <div className="stat-desc">In your base</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Orders</div>
              <div className="stat-value text-secondary">{totalOrdersFromCustomers}</div>
              <div className="stat-desc">From all customers</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Revenue</div>
              <div className="stat-value text-secondary">${totalRevenueFromCustomers.toLocaleString()}</div>
              <div className="stat-desc">From customers</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Avg. Spend/Customer</div>
              <div className="stat-value text-secondary">${avgSpendPerCustomer.toFixed(2)}</div>
              <div className="stat-desc">Per customer</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">Filter Customers</h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="form-control w-full sm:w-1/2">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Sort */}
              <div className="form-control w-full sm:w-1/4">
                <select
                  className="select select-bordered w-full"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                  <option value="orders-desc">Orders: High to Low</option>
                  <option value="orders-asc">Orders: Low to High</option>
                  <option value="spent-desc">Spent: High to Low</option>
                  <option value="spent-asc">Spent: Low to High</option>
                  <option value="last-order-desc">Last Order: Newest First</option>
                  <option value="last-order-asc">Last Order: Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">All Customers</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Total Orders</th>
                    <th>Total Spent</th>
                    <th>Last Order</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="hover">
                        <td>#{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.totalOrders}</td>
                        <td>${customer.totalSpent.toLocaleString()}</td>
                        <td>{new Date(customer.lastOrderDate).toLocaleDateString()}</td>
                        <td>{new Date(customer.joinDate).toLocaleDateString()}</td>
                        <td>
                          <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost btn-sm">
                              Actions
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                              <li>
                                <button>View Orders</button>
                              </li>
                              <li>
                                <button>Send Message</button>
                              </li>
                              <li>
                                <button>View Profile</button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-12">
                        <p className="text-base-content/70">No customers found. Start selling to build your customer base!</p>
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

export default Customers;