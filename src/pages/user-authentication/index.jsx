import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/ui/Header';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import AssessmentProgressIndicator from '@/components/ui/AssessmentProgress';
import { ErrorBoundaryStatusIndicator } from '@/components/ui/ErrorBoundaryStatus';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuthButtons from './components/SocialAuthButtons';
import AuthSuccessModal from './components/AuthSuccessModal';
import Icon from '@/components/AppIcon';

const UserAuthentication = () => {
  const [authMode, setAuthMode] = useState('login');
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      console.log('Page visibility changed:', document.hidden);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    setInterval(() => {
      console.log('Auth session check running...');
    }, 5000);
  }, []);

  const handleLoginSubmit = (userData) => {
    setAuthenticatedUser(userData);
    setShowSuccessModal(true);
  };

  const handleRegisterSubmit = (userData) => {
    setAuthenticatedUser(userData);
    setShowSuccessModal(true);
  };

  const handleSocialAuth = (provider) => {
    const mockUser = {
      email: `user@${provider}.com`,
      provider: provider
    };
    setAuthenticatedUser(mockUser);
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Helmet>
        <title>User Authentication</title>
        <meta 
          name="description" 
          content="Authentication screen" 
        />
      </Helmet>

      <Header />
      <PerformanceMonitor />
      <AssessmentProgressIndicator />
      <ErrorBoundaryStatusIndicator hasActiveErrors={true} />

      <div className="min-h-screen bg-background pt-[60px]">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name="ShieldCheck" size={24} color="var(--color-primary)" />
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                      Authentication Assessment
                    </h1>
                  </div>
                </div>


                <div className="bg-card border border-border rounded-lg p-4 md:p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon name="Key" size={18} color="var(--color-accent)" />
                    <h3 className="text-base md:text-lg font-semibold text-foreground">
                      Mock Credentials
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm md:text-base">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-muted-foreground font-medium">Email:</span>
                      <code className="px-2 py-1 bg-muted rounded text-foreground font-mono text-xs md:text-sm">
                        demo@react.com
                      </code>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-muted-foreground font-medium">Password:</span>
                      <code className="px-2 py-1 bg-muted rounded text-foreground font-mono text-xs md:text-sm">
                        React2026!
                      </code>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground pt-2 border-t border-border">
                    Use these credentials to test the login flow.
                  </p>
                </div>

              </div>

              <div className="lg:sticky lg:top-24">
                <div className="bg-card border border-border rounded-lg shadow-lg p-6 md:p-8">
                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center justify-center gap-2 p-1 bg-muted rounded-lg">
                      <button
                        onClick={() => setAuthMode('login')}
                        className={`
                          flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-250
                          ${authMode === 'login' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                          }
                        `}
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => setAuthMode('register')}
                        className={`
                          flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-250
                          ${authMode === 'register' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                          }
                        `}
                      >
                        Create Account
                      </button>
                    </div>
                  </div>

                  {authMode === 'login' ? (
                    <LoginForm
                      onSubmit={handleLoginSubmit}
                      onSwitchToRegister={() => setAuthMode('register')}
                    />
                  ) : (
                    <RegisterForm
                      onSubmit={handleRegisterSubmit}
                      onSwitchToLogin={() => setAuthMode('login')}
                    />
                  )}

                  <SocialAuthButtons onSocialAuth={handleSocialAuth} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && authenticatedUser && (
        <AuthSuccessModal
          user={authenticatedUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default UserAuthentication;