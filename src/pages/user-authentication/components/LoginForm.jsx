import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Icon from '@/components/AppIcon';

const LoginForm = ({ onSubmit, onSwitchToRegister }) => {
  const [email, setEmail] = useState('demo@reactarchitect.com');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.key === 'Enter' && email && password) {
        handleSubmit(e);
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
  }, [email, password]);

  useEffect(() => {
    if (Object.keys(errors)?.length > 0) {
      const timeout = setTimeout(() => {
        setErrors({});
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [errors]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      if (email === 'demo@reactarchitect.com' && password === 'React2026!') {
        onSubmit({ email, rememberMe });
      } else {
        setErrors({ 
          submit: 'Authentication failed. Invalid credentials provided.' 
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const emailValue = email === undefined ? '' : email;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 lg:space-y-6">
      <div>
        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={emailValue}
          onChange={(e) => setEmail(e?.target?.value)}
          error={errors?.email}
          required
          className="mb-4"
        />
      </div>
      <div>
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e?.target?.value)}
          error={errors?.password}
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e?.target?.checked)}
            className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          />
          <span className="text-sm text-foreground">Remember me</span>
        </label>

        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-250 text-left sm:text-right"
        >
          Forgot password?
        </button>
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
        className="mt-4 md:mt-5 lg:mt-6"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
      <div className="text-center pt-3 md:pt-4">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-250"
          >
            Create account
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;