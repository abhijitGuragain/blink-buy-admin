import { useState } from 'react';
import AdminLayout from "../../../components/DefaultLayout/AdminLayout";

// Define Product interface
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  seller: string;
  status: 'Active' | 'Inactive' | 'Out of Stock';
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Mock product data
  const initialProducts: Product[] = [
    { id: 1, name: 'Smartphone X', category: 'Electronics', price: 699, stock: 50, seller: 'TechTrendz', status: 'Active' },
    { id: 2, name: 'Leather Jacket', category: 'Fashion', price: 199, stock: 30, seller: 'StyleHub', status: 'Active' },
    { id: 3, name: 'Coffee Maker', category: 'Home', price: 89, stock: 0, seller: 'HomeHaven', status: 'Out of Stock' },
    { id: 4, name: 'Running Shoes', category: 'Sports', price: 129, stock: 15, seller: 'FitGear', status: 'Active' },
    { id: 5, name: 'Novel Book', category: 'Books', price: 19, stock: 100, seller: 'BookWorm', status: 'Inactive' },
  ];

  // Unique categories for filter
  const categories = ['All', ...new Set(initialProducts.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = initialProducts
    .filter(product =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === 'All' || product.category === filterCategory)
    )
    .sort((a, b) => {
      if (sortField === 'price' || sortField === 'stock') {
        // Handle numeric sorting
        const fieldA = a[sortField] as number;
        const fieldB = b[sortField] as number;
        return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      } else {
        // Handle string sorting
        const fieldA = a[sortField].toString().toLowerCase();
        const fieldB = b[sortField].toString().toLowerCase();
        return sortDirection === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
    });

  // Handle sorting
  const handleSort = (field: keyof Product) => {
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
        <h1 className="text-3xl font-bold text-base-content mb-6">Product Management</h1>

        {/* Search and Filters */}
        <div className="card bg-base-100 shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="form-control w-full sm:w-64">
              <label className="label">
                <span className="label-text">Search Products</span>
              </label>
              <input
                type="text"
                placeholder="Search by name or seller..."
                className="input input-bordered w-full focus:input-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="form-control w-full sm:w-48">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered w-full focus:select-primary"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary mt-4 sm:mt-0">
              Add New Product
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">Product List</h2>
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
                      onClick={() => handleSort('category')}
                    >
                      Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('price')}
                    >
                      Price {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('stock')}
                    >
                      Stock {sortField === 'stock' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort('seller')}
                    >
                      Seller {sortField === 'seller' && (sortDirection === 'asc' ? '↑' : '↓')}
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
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover">
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{product.stock}</td>
                        <td>{product.seller}</td>
                        <td>
                          <span
                            className={`badge ${product.status === 'Active'
                              ? 'badge-success'
                              : product.status === 'Inactive'
                                ? 'badge-error'
                                : 'badge-warning'
                              }`}
                          >
                            {product.status}
                          </span>
                        </td>
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
                      <td colSpan={7} className="text-center py-4">
                        No products found
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
              <div className="stat-title">Total Products</div>
              <div className="stat-value text-primary">{initialProducts.length}</div>
              <div className="stat-desc">In catalog</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Active Products</div>
              <div className="stat-value text-success">
                {initialProducts.filter((p) => p.status === 'Active').length}
              </div>
              <div className="stat-desc">Currently available</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Out of Stock</div>
              <div className="stat-value text-warning">
                {initialProducts.filter((p) => p.status === 'Out of Stock').length}
              </div>
              <div className="stat-desc">Need restocking</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Products;