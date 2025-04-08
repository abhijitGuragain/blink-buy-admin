const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-300 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl">
        <div className="card-body text-center">
          <div className="flex justify-center mb-6">
            <svg
              className="w-20 h-20 text-error"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-error mb-4">Unauthorized Access</h1>

          <p className="text-base-content/70 mb-6">
            Oops! It seems you don't have permission to access this page.
            Please check your credentials or contact support if you believe this is an error.
          </p>

          <div className="stats shadow mb-6">
            <div className="stat">
              <div className="stat-title">Error Code</div>
              <div className="stat-value text-error">401</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button className="btn btn-primary" onClick={() => window.history.back()}>
              Go Back
            </button>
            <a href="/" className="btn btn-secondary">
              Login
            </a>
          </div>

          <div className="mt-6">
            <p className="text-sm text-base-content/60">
              Need help?{' '}
              <a href="/support" className="link link-primary">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;