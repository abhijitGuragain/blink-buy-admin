import { useForm } from 'react-hook-form';
import Button from '../components/Button';

const Signup = () => {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      storeName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      agreeTerms: false,
    },
  });

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      console.log('Seller Signup Data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API call
      alert('Signup successful! Welcome to BlinkBuy.');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const password = watch('password'); // Watch password for confirmation validation

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl hover:shadow-xl transition-shadow duration-300">
        <div className="card-body p-8">
          {/* Header */}
          <h2 className="card-title text-3xl font-bold text-center mb-2">
            <span>Join Blink<span className='text-primary'>Buy</span> as a <span className='text-primary'>Seller</span></span>
          </h2>
          <p className="text-center text-base-content/70 mb-8">
            Create your seller account and start selling today
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Store Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Store Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your store name"
                className={`input input-bordered w-full focus:input-primary focus:border-primary transition-colors duration-200 ${errors.storeName ? 'input-error' : ''
                  }`}
                {...register('storeName', {
                  required: 'Store name is required',
                  minLength: {
                    value: 3,
                    message: 'Store name must be at least 3 characters',
                  },
                })}
              />
              {errors.storeName && (
                <span className="text-error text-sm mt-1">
                  {errors.storeName.message}
                </span>
              )}
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className={`input input-bordered w-full focus:input-primary focus:border-primary transition-colors duration-200 ${errors.password ? 'input-error' : ''
                  }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
              />
              {errors.password && (
                <span className="text-error text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className={`input input-bordered w-full focus:input-primary focus:border-primary transition-colors duration-200 ${errors.confirmPassword ? 'input-error' : ''
                  }`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <span className="text-error text-sm mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Phone Number
                </span>
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className={`input input-bordered w-full focus:input-primary focus:border-primary transition-colors duration-200 ${errors.phone ? 'input-error' : ''
                  }`}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Enter a valid 10-digit phone number',
                  },
                })}
              />
              {errors.phone && (
                <span className="text-error text-sm mt-1">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary border-base-content/20 checked:border-accent"
                  {...register('agreeTerms', {
                    required: 'You must agree to the terms',
                  })}
                />
                <span className="label-text text-base-content/80">
                  I agree to BlinkBuy's{' '}
                  <a href="#" className="link link-primary">
                    Terms & Conditions
                  </a>
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="text-error text-sm mt-1">
                  {errors.agreeTerms.message}
                </span>
              )}
            </div>

            {/* Signup Button */}
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
              Already have an account?{' '}
              <a
                href="/"
                className="link link-secondary font-medium hover:text-secondary-focus transition-colors duration-200"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;