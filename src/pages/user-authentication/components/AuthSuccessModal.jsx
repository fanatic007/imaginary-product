import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';

const AuthSuccessModal = ({ user, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/product-assessment-dashboard');
    }, 3000);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-2xl max-w-md w-full p-6 md:p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-success/20 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle2" size={40} color="var(--color-success)" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              Welcome Back!
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Successfully authenticated as
            </p>
            <p className="text-base md:text-lg font-medium text-primary">
              {user?.email}
            </p>
          </div>

          <div className="w-full space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Redirecting to dashboard...</span>
            </div>

            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
            >
              Stay on this page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccessModal;