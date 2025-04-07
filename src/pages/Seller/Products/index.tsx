import { useState } from 'react';
// import SellerLayout from "../../components/DefaultLayout/SellerLayout";
import { useForm, SubmitHandler } from 'react-hook-form';
import SellerLayout from '../../../components/DefaultLayout/SellerLayout';

// Define Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  stock: number;
  image: string;
  category: string;
  rating: number;
}

// Define Form Data for adding/editing products
interface ProductFormData {
  name: string;
  price: number;
  originalPrice: number;
  stock: number;
  image: string;
  category: string;
}

const SellerProducts = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Smartphone X", price: 699.99, originalPrice: 799.99, stock: 50, image: "https://via.placeholder.com/50x50", category: "Electronics", rating: 4.5 },
    { id: 2, name: "Leather Jacket", price: 199.99, originalPrice: 249.99, stock: 30, image: "https://via.placeholder.com/50x50", category: "Fashion", rating: 4.0 },
    { id: 3, name: "Coffee Maker", price: 89.99, originalPrice: 99.99, stock: 0, image: "https://via.placeholder.com/50x50", category: "Home", rating: 4.8 },
    { id: 4, name: "Running Shoes", price: 129.99, originalPrice: 149.99, stock: 40, image: "https://via.placeholder.com/50x50", category: "Sports", rating: 4.2 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // React Hook Form for product form
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      price: 0,
      originalPrice: 0,
      stock: 0,
      image: "",
      category: "",
    },
  });

  // Open modal for adding or editing
  const openModal = (product: Product | null = null) => {
    setEditingProduct(product);
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("originalPrice", product.originalPrice);
      setValue("stock", product.stock);
      setValue("image", product.image);
      setValue("category", product.category);
    } else {
      reset();
    }
    setIsModalOpen(true);
  };

  // Handle form submission
  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, ...data } : p)));
    } else {
      // Add new product
      const newProduct: Product = {
        id: products.length + 1,
        ...data,
        rating: 0, // Default rating for new products
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
    reset();
  };

  // Delete product
  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || product.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "stock-desc") return b.stock - a.stock;
      if (sortBy === "stock-asc") return a.stock - b.stock;
      return 0;
    });

  // Calculate stats
  const totalProducts = products.length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);

  return (
    <SellerLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-base-content mb-6">Products</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Products</div>
              <div className="stat-value text-secondary">{totalProducts}</div>
              <div className="stat-desc">In your catalog</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Out of Stock</div>
              <div className="stat-value text-secondary">{outOfStock}</div>
              <div className="stat-desc">Need restocking</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Total Stock</div>
              <div className="stat-value text-secondary">{totalStock}</div>
              <div className="stat-desc">Units available</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="stat">
              <div className="stat-title">Inventory Value</div>
              <div className="stat-value text-secondary">${totalValue.toLocaleString()}</div>
              <div className="stat-desc">Based on current prices</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">Filter Products</h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="form-control w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Search by product name..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="form-control w-full sm:w-1/4">
                <select
                  className="select select-bordered w-full"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
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
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="stock-desc">Stock: High to Low</option>
                  <option value="stock-asc">Stock: Low to High</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title text-xl font-semibold">All Products</h2>
              <button className="btn btn-primary" onClick={() => openModal()}>
                Add Product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Original Price</th>
                    <th>Stock</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover">
                        <td>#{product.id}</td>
                        <td>
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded" />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>${product.originalPrice.toFixed(2)}</td>
                        <td>
                          <span className={product.stock === 0 ? "text-error" : "text-success"}>
                            {product.stock}
                          </span>
                        </td>
                        <td>{product.rating}/5</td>
                        <td>
                          <div className="flex gap-2">
                            <button className="btn btn-ghost btn-sm" onClick={() => openModal(product)}>
                              Edit
                            </button>
                            <button className="btn btn-error btn-sm" onClick={() => deleteProduct(product.id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-12">
                        <p className="text-base-content/70">No products found. Add a product to get started!</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal for Add/Edit Product */}
        <input type="checkbox" id="product-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(!isModalOpen)} />
        <div className="modal">
          <div className="modal-box relative">
            <label htmlFor="product-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">{editingProduct ? "Edit Product" : "Add Product"}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                  {...register("name", { required: "Product name is required" })}
                />
                {errors.name && <span className="text-error text-sm mt-2">{errors.name.message}</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className={`input input-bordered w-full ${errors.price ? 'input-error' : ''}`}
                  {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be positive" } })}
                />
                {errors.price && <span className="text-error text-sm mt-2">{errors.price.message}</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Original Price</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className={`input input-bordered w-full ${errors.originalPrice ? 'input-error' : ''}`}
                  {...register("originalPrice", { required: "Original price is required", min: { value: 0, message: "Original price must be positive" } })}
                />
                {errors.originalPrice && <span className="text-error text-sm mt-2">{errors.originalPrice.message}</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Stock</span>
                </label>
                <input
                  type="number"
                  className={`input input-bordered w-full ${errors.stock ? 'input-error' : ''}`}
                  {...register("stock", { required: "Stock quantity is required", min: { value: 0, message: "Stock must be positive" } })}
                />
                {errors.stock && <span className="text-error text-sm mt-2">{errors.stock.message}</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${errors.image ? 'input-error' : ''}`}
                  {...register("image", { required: "Image URL is required" })}
                />
                {errors.image && <span className="text-error text-sm mt-2">{errors.image.message}</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.category ? 'select-error' : ''}`}
                  {...register("category", { required: "Category is required" })}
                >
                  <option value="">Select a category</option>
                  {categories.filter(cat => cat !== "All").map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <span className="text-error text-sm mt-2">{errors.category.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary w-full">
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerProducts;