import { useState } from 'react';
import AdminLayout from "../../../components/DefaultLayout/AdminLayout";

// Define the Users interface
interface Users {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Users>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock user data
  const initialUsers: Users[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', status: 'Active', joinDate: '2023-11-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer', status: 'Inactive', joinDate: '2024-03-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Seller', status: 'Pending', joinDate: '2024-02-28' },
    { id: 5, name: 'Mike Wilson', email: 'mike@example.com', role: 'Customer', status: 'Active', joinDate: '2023-12-05' },
  ];

  // Filter and sort users
  const filteredUsers = initialUsers
    .filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const fieldA = a[sortField].toString().toLowerCase();
      const fieldB = b[sortField].toString().toLowerCase();
      return sortDirection === 'asc'
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    });

  // Handle sorting with proper typing
  const handleSort = (field: keyof Users) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-base-content mb-6">Users Management</h1>

        {/* Search and Filters */}
        <div className="card bg-base-100 shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="form-control w-full sm:w-64">
              <label className="label">
                <span className="label-text">Search Users</span>
              </label>
              <input
                type="text"
                placeholder="Search by name or email..."
                className="input input-bordered w-full focus:input-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-primary mt-4 sm:mt-0">
              Add New Users
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">Users List</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('email')}
                    >
                      Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('role')}
                    >
                      Role {sortField === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('joinDate')}
                    >
                      Join Date {sortField === 'joinDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover">
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <span
                            className={`badge ${user.status === 'Active'
                              ? 'badge-success'
                              : user.status === 'Inactive'
                                ? 'badge-error'
                                : 'badge-warning'
                              }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                        <td>
                          <div className="flex gap-2">
                            <button className="btn btn-ghost btn-sm">Edit</button>
                            <button className="btn btn-ghost btn-sm text-error">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-primary">{initialUsers.length}</div>
              <div className="stat-desc">Registered on BlinkBuy</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Active Users</div>
              <div className="stat-value text-success">
                {initialUsers.filter((u) => u.status === 'Active').length}
              </div>
              <div className="stat-desc">Currently active</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Users;