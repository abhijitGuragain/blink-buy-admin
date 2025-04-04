import { useState } from 'react';
import AdminLayout from "../../components/DefaultLayout/AdminLayout";

// Define Feedback interface
interface Feedback {
  id: number;
  user: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Pending' | 'Reviewed' | 'Resolved';
}

const Feedback = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Feedback>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Mock feedback data
  const initialFeedback: Feedback[] = [
    { id: 1, user: 'John Doe', product: 'Smartphone X', rating: 4, comment: 'Great phone, fast delivery!', date: '2024-04-01', status: 'Reviewed' },
    { id: 2, user: 'Jane Smith', product: 'Leather Jacket', rating: 3, comment: 'Good quality but sizing issue', date: '2024-03-28', status: 'Pending' },
    { id: 3, user: 'Bob Johnson', product: 'Coffee Maker', rating: 5, comment: 'Best coffee ever!', date: '2024-04-02', status: 'Resolved' },
    { id: 4, user: 'Alice Brown', product: 'Running Shoes', rating: 2, comment: 'Wore out quickly', date: '2024-03-30', status: 'Pending' },
    { id: 5, user: 'Mike Wilson', product: 'Novel Book', rating: 4, comment: 'Engaging read', date: '2024-04-03', status: 'Reviewed' },
  ];

  // Unique statuses for filter
  const statuses = ['All', 'Pending', 'Reviewed', 'Resolved'];

  // Filter and sort feedback
  const filteredFeedback = initialFeedback
    .filter(feedback =>
      (feedback.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.comment.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === 'All' || feedback.status === filterStatus)
    )
    .sort((a, b) => {
      if (sortField === 'rating') {
        const fieldA = a.rating;
        const fieldB = b.rating;
        return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      } else {
        const fieldA = a[sortField].toString().toLowerCase();
        const fieldB = b[sortField].toString().toLowerCase();
        return sortDirection === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
    });

  // Handle sorting
  const handleSort = (field: keyof Feedback) => {
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
        <h1 className="text-3xl font-bold text-base-content mb-6">Feedback Management</h1>

        {/* Search and Filters */}
        <div className="card bg-base-100 shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="form-control w-full sm:w-64">
              <label className="label">
                <span className="label-text">Search Feedback</span>
              </label>
              <input
                type="text"
                placeholder="Search by user, product, or comment..."
                className="input input-bordered w-full focus:input-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="form-control w-full sm:w-48">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className="select select-bordered w-full focus:select-primary"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">Feedback List</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('user')}
                    >
                      User {sortField === 'user' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('product')}
                    >
                      Product {sortField === 'product' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('rating')}
                    >
                      Rating {sortField === 'rating' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('comment')}
                    >
                      Comment {sortField === 'comment' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeedback.length > 0 ? (
                    filteredFeedback.map((feedback) => (
                      <tr key={feedback.id} className="hover">
                        <td>{feedback.user}</td>
                        <td>{feedback.product}</td>
                        <td>
                          <div className="rating rating-sm">
                            {[...Array(5)].map((_, i) => (
                              <input
                                key={i}
                                type="radio"
                                name={`rating-${feedback.id}`}
                                className="mask mask-star-2 bg-orange-400"
                                checked={i + 1 === feedback.rating}
                                readOnly
                              />
                            ))}
                          </div>
                        </td>
                        <td className="max-w-xs truncate">{feedback.comment}</td>
                        <td>{new Date(feedback.date).toLocaleDateString()}</td>
                        <td>
                          <span
                            className={`badge ${feedback.status === 'Pending'
                              ? 'badge-warning'
                              : feedback.status === 'Reviewed'
                                ? 'badge-info'
                                : 'badge-success'
                              }`}
                          >
                            {feedback.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button className="btn btn-ghost btn-sm">Review</button>
                            <button className="btn btn-ghost btn-sm text-error">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        No feedback found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Feedback</div>
              <div className="stat-value text-primary">{initialFeedback.length}</div>
              <div className="stat-desc">Received</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Average Rating</div>
              <div className="stat-value text-success">
                {(initialFeedback.reduce((sum, f) => sum + f.rating, 0) / initialFeedback.length || 0).toFixed(1)}
              </div>
              <div className="stat-desc">Across all feedback</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Pending Reviews</div>
              <div className="stat-value text-warning">
                {initialFeedback.filter((f) => f.status === 'Pending').length}
              </div>
              <div className="stat-desc">Awaiting action</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Feedback;