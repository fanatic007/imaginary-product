import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/AppIcon';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/product-assessment-dashboard',
      icon: 'LayoutDashboard',
    },
    {
      label: 'Products',
      path: '/product-detail-view',
      icon: 'Package',
    },
    {
      label: 'Cart',
      path: '/shopping-cart-management',
      icon: 'ShoppingCart',
    },
    {
      label: 'Account',
      path: '/user-authentication',
      icon: 'User',
    },
    {
      label: 'E Book',
      path: '/e-book',
      icon: 'Book',
    },
    {
      label: 'Library',
      path: '/library',
      icon: 'LibraryBig',
    },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-card shadow-md z-[1000] border-b border-border">
        <div className="h-full flex items-center justify-between px-6">
          <Link 
            to="/product-assessment-dashboard" 
            className="flex items-center gap-3 transition-opacity duration-250 hover:opacity-80"
          >
            <div className="w-10 h-10 bg-primary/20 rounded-md flex items-center justify-center">
              <Icon name="Code2" size={24} color="var(--color-primary)" />
            </div>
            <span className="font-mono text-lg font-semibold text-foreground">
              Imaginary
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-md
                  transition-all duration-250 ease-smooth
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  color={isActivePath(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'}
                />
                <span className="font-medium text-sm">{item?.label}</span>
                {isActivePath(item?.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors duration-250"
            aria-label="Toggle mobile menu"
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </header>
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background z-[1200] md:hidden"
          style={{ top: '60px' }}
        >
          <nav className="flex flex-col p-6 gap-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center justify-between px-4 py-3 rounded-md
                  transition-all duration-250 ease-smooth
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    color={isActivePath(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'}
                  />
                  <span className="font-medium">{item?.label}</span>
                </div>
                {item?.problemCount > 0 && (
                  <span 
                    className={`
                      px-2 py-1 rounded text-xs font-mono
                      ${isActivePath(item?.path)
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-warning/20 text-warning'
                      }
                    `}
                  >
                    {item?.problemCount} issues
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;