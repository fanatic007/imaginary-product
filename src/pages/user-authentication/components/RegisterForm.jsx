import { useState, useEffect, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Icon from '@/components/AppIcon';

const RegisterForm = ({ onSubmit, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const passwordStrength = useMemo(() => {
    return formData?.password?.length;
  }, [formData?.password]);

  const strengthLabel = useMemo(() => {
    if (passwordStrength < 6) return 'Weak';
    if (passwordStrength < 10) return 'Medium';
    return 'Strong';
  }, [passwordStrength]);

  useEffect(() => {
    const handlePaste = (e) => {
      if (e?.target?.type === 'password') {
        e?.preventDefault();
      }
    };
    
    document.addEventListener('paste', handlePaste);
  }, []);

  useEffect(() => {
    setInterval(() => {
      console.log('Form validation check running...');
    }, 3000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors?.[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      if (formData?.email === 'existing@reactarchitect.com') {
        setErrors({ 
          submit: 'Registration failed. Account creation error occurred.' 
        });
        setIsLoading(false);
      } else {
        onSubmit({
          fullName: formData?.fullName,
          email: formData?.email
        });
      }
    }, 2000);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 6) return 'bg-error';
    if (passwordStrength < 10) return 'bg-warning';
    return 'bg-success';
  };

  const getStrengthWidth = () => {
    if (passwordStrength < 6) return 'w-1/3';
    if (passwordStrength < 10) return 'w-2/3';
    return 'w-full';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
      <div>
        <Input
          type="text"
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
          className="mb-4"
        />
      </div>
      <div>
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="mb-4"
        />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
        />
        
        {formData?.password && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Password strength:</span>
              <span className={`text-xs font-medium ${
                passwordStrength < 6 ? 'text-error' : 
                passwordStrength < 10 ? 'text-warning': 'text-success'
              }`}>
                {strengthLabel}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${getStrengthColor()} ${getStrengthWidth()}`}
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
        />
      </div>
      <div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e?.target?.checked)}
            className="w-4 h-4 mt-0.5 rounded border-border bg-input text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background flex-shrink-0"
          />
          <span className="text-sm text-foreground">
            I agree to the{' '}
            <button type="button" className="text-primary hover:text-primary/80 transition-colors duration-250">
              Terms of Service
            </button>
            {' '}and{' '}
            <button type="button" className="text-primary hover:text-primary/80 transition-colors duration-250">
              Privacy Policy
            </button>
          </span>
        </label>
        {errors?.terms && (
          <p className="text-sm text-error mt-1">{errors?.terms}</p>
        )}
      </div>
      {errors?.submit && (
        <div className="flex items-start gap-2 p-3 md:p-4 bg-error/10 border border-error/20 rounded-md">
          <Icon name="AlertCircle" size={18} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{errors?.submit}</p>
        </div>
      )}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-4 md:mt-5"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
      <div className="text-center pt-3 md:pt-4">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-250"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;