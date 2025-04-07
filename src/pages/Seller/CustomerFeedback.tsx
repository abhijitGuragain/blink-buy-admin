import { useState } from 'react';
import SellerLayout from "../../components/DefaultLayout/SellerLayout";

// Define Feedback interface
interface Feedback {
  id: number;
  customer: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  responded: boolean;
}

const CustomerFeedback = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  // Mock feedback data
  const feedbackList: Feedback[] = [
    {
      id: 1,
      customer: "John Doe",
      product: "Smartphone X",
      rating: 5,
      comment: "Amazing phone! Great camera and battery life.",
      date: "2024-04-01",
      responded: false,
    },
    {
      id: 2,
      customer: "Jane Smith",
      product: "Leather Jacket",
      rating: 4,
      comment: "Good quality, but the size was a bit off.",
      date: "2024-03-28",
      responded: true,
    },
    {
      id: 3,
      customer: "Alice Johnson",
      product: "Coffee Maker",
      rating: 3,
      comment: "Works fine, but the instructions were unclear.",
      date: "2024-03-25",
      responded: false,
    },
    {
      id: 4,
      customer: "Bob Williams",
      product: "Running Shoes",
      rating: 5,
      comment: "Super comfortable and stylish!",
      date: "2024-03-20",
      responded: true,
    },
  ];

  // Calculate stats
  const totalFeedback = feedbackList.length;
  const averageRating = feedbackList.length > 0
    ? feedbackList.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbackList.length
    : 0;
  const positiveFeedback = feedbackList.filter(f => f.rating >= 4).length;
  const responseRate = feedbackList.length > 0
    ? (feedbackList.filter(f => f.responded).length / feedbackList.length) * 100
    : 0;

  // Filter and sort feedback
  const filteredFeedback = feedbackList
    .filter(
      (feedback) =>
        (feedback.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.product.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedRating === "All" || feedback.rating === parseInt(selectedRating))
    )
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "date-asc") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "rating-desc") return b.rating - a.rating;
      if (sortBy === "rating-asc") return a.rating - b.rating;
      return 0;
    });

  // Open reply modal
  const openReplyModal = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsReplyModalOpen(true);
  };

  // Handle reply submission (mock)
  const handleReplySubmit = (feedbackId: number, reply: string) => {
    console.log(`Replying to feedback ${feedbackId}: ${reply}`);
    // In a real app, this would make an API call to save the reply
    setIsReplyModalOpen(false);
  };

  return (
    <SellerLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-base-content mb-6">Customer Feedback</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Feedback</div>
              <div className="stat-value text-secondary">{totalFeedback}</div>
              <div className="stat-desc">Received</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Average Rating</div>
              <div className="stat-value text-secondary">{averageRating.toFixed(1)}/5</div>
              <div className="stat-desc">Across all feedback</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Positive Feedback</div>
              <div className="stat-value text-secondary">{positiveFeedback}</div>
              <div className="stat-desc">4+ stars</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Response Rate</div>
              <div className="stat-value text-secondary">{responseRate.toFixed(1)}%</div>
              <div className="stat-desc">Feedback responded to</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">Filter Feedback</h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="form-control w-full sm:w-1/2">
                <input
                  type="text"
                  placeholder="Search by customer or product..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Rating Filter */}
              <div className="form-control w-full sm:w-1/4">
                <select
                  className="select select-bordered w-full"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                >
                  <option value="All">All Ratings</option>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>{rating} Star{rating > 1 ? "s" : ""}</option>
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
                  <option value="rating-desc">Rating: High to Low</option>
                  <option value="rating-asc">Rating: Low to High</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">All Feedback</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeedback.length > 0 ? (
                    filteredFeedback.map((feedback) => (
                      <tr key={feedback.id} className="hover">
                        <td>#{feedback.id}</td>
                        <td>{feedback.customer}</td>
                        <td>{feedback.product}</td>
                        <td>
                          <div className="rating rating-sm">
                            {[...Array(5)].map((_, i) => (
                              <input
                                key={i}
                                type="radio"
                                name={`rating-${feedback.id}`}
                                className={`mask mask-star-2 ${i < feedback.rating ? 'bg-orange-400' : ''}`}
                                disabled
                                checked={i === feedback.rating - 1}
                              />
                            ))}
                          </div>
                        </td>
                        <td>{feedback.comment}</td>
                        <td>{new Date(feedback.date).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${feedback.responded ? 'badge-success' : 'badge-warning'}`}>
                            {feedback.responded ? "Responded" : "Pending"}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost btn-sm">
                              Actions
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                              <li>
                                <button onClick={() => openReplyModal(feedback)}>
                                  {feedback.responded ? "View Reply" : "Reply"}
                                </button>
                              </li>
                              <li>
                                <button>View Customer</button>
                              </li>
                              <li>
                                <button>View Product</button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-12">
                        <p className="text-base-content/70">No feedback found. Encourage customers to leave reviews!</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="btn btn-primary">Add Product</button>
              <button className="btn btn-secondary">View Orders</button>
              <button className="btn btn-accent">View Customers</button>
            </div>
          </div>
        </div> */}

        {/* Reply Modal */}
        <input type="checkbox" id="reply-modal" className="modal-toggle" checked={isReplyModalOpen} onChange={() => setIsReplyModalOpen(!isReplyModalOpen)} />
        <div className="modal">
          <div className="modal-box relative">
            <label htmlFor="reply-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">{selectedFeedback?.responded ? "View Reply" : "Reply to Feedback"}</h3>
            <div className="space-y-4 mt-4">
              <div className="border-b border-base-300 pb-4">
                <p><strong>Customer:</strong> {selectedFeedback?.customer}</p>
                <p><strong>Product:</strong> {selectedFeedback?.product}</p>
                <p><strong>Rating:</strong> {selectedFeedback?.rating}/5</p>
                <p><strong>Comment:</strong> {selectedFeedback?.comment}</p>
              </div>
              {selectedFeedback?.responded ? (
                <div>
                  <p><strong>Your Reply:</strong> Thank you for your feedback! We're glad you liked the product.</p>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const reply = (e.target as any).reply.value;
                  if (reply && selectedFeedback) {
                    handleReplySubmit(selectedFeedback.id, reply);
                  }
                }}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Reply</span>
                    </label>
                    <textarea
                      name="reply"
                      className="textarea textarea-bordered h-24"
                      placeholder="Write your reply here..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-full mt-4">Send Reply</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default CustomerFeedback;