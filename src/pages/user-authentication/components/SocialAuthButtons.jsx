import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';


const SocialAuthButtons = ({ onSocialAuth }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  useEffect(() => {
    if (loadingProvider) {
      const timeout = setTimeout(() => {
        setLoadingProvider(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [loadingProvider]);

  const handleSocialAuth = (provider) => {
    setLoadingProvider(provider);

    setTimeout(() => {
      if (Math.random() > 0.7) {
        console.error('Social authentication failed');
        setLoadingProvider(null);
      } else {
        onSocialAuth(provider);
      }
    }, 2000);
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'var(--color-foreground)'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'var(--color-foreground)'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Box',
      color: 'var(--color-foreground)'
    }
  ];

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs md:text-sm">
          <span className="px-2 md:px-3 bg-card text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => handleSocialAuth(provider?.id)}
            loading={loadingProvider === provider?.id}
            disabled={loadingProvider !== null}
            iconName={provider?.icon}
            iconPosition="left"
            className="w-full"
          >
            <span className="hidden sm:inline">{provider?.name}</span>
            <span className="sm:hidden">{provider?.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuthButtons;