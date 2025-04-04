import { useForm } from 'react-hook-form';
import Button from '../components/Button';

const Login = () => {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Form submission handler
  const onSubmit = async (data: unknown) => {
    try {
      // Simulate API call
      console.log('Form Data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl hover:shadow-xl transition-shadow duration-300">
        <div className="card-body p-8">
          {/* Header */}
          <h2 className="card-title text-3xl font-bold text-center mb-2">
            <span>Blink<span className='text-primary'>Buy</span></span>
          </h2>
          <p className="text-center text-base-content/70 mb-8">
            Sign in to continue your journey
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full focus:input-primary focus:border-primary transition-colors duration-200 ${errors.email ? 'input-error' : ''
                  }`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <span className="text-error text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`input input-bordered w-full focus:input-primary focus:border-primary transition-colors duration-200 ${errors.password ? 'input-error' : ''
                  }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <span className="text-error text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
              <label className="label justify-end">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-accent hover:text-accent-focus transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Remember Me Checkbox */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary border-base-content/20 checked:border-accent"
                  {...register('rememberMe')}
                />
                <span className="label-text text-base-content/80">
                  Remember me
                </span>
              </label>
            </div>

            {/* Login Button */}
            <div className="form-control mt-8">
              <Button
                type="submit"
                variant="primary"
                className="w-full btn-lg hover:btn-primary-focus transition-all duration-300"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>

          {/* Additional Links */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-base-content/70">
              New here?{' '}
              <a
                href="/register"
                className="link link-secondary font-medium hover:text-secondary-focus transition-colors duration-200"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;