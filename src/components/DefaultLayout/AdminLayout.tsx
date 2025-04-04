import { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Assuming you're using React Router

const AdminLayout = ({ children }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Feedbacks', path: '/admin/feedbacks' },
  ];

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-base-100 shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-20 px-6 ">
          <h1 className="text-2xl font-bold text-white">
            <span>

              Blink<span className='text-primary'>Buy</span>
            </span>
          </h1>
          <button
            className="lg:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${isActive
                  ? 'bg-primary text-white'
                  : 'text-base-content hover:bg-base-200'
                }`
              }
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile after click
            >
              <span className="text-lg font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 btn btn-ghost btn-circle"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;