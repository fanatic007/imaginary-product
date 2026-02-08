import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const AssessmentProgressContext = createContext();

export const useAssessmentProgress = () => {
  const context = useContext(AssessmentProgressContext);
  if (!context) {
    throw new Error('useAssessmentProgress must be used within AssessmentProgressProvider');
  }
  return context;
};

export const AssessmentProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    '/product-assessment-dashboard': { identified: 0, resolved: 0, total: 8 },
    '/product-detail-view': { identified: 0, resolved: 0, total: 6 },
    '/shopping-cart-management': { identified: 0, resolved: 0, total: 7 },
    '/user-authentication': { identified: 0, resolved: 0, total: 5 }
  });

  const markProblemIdentified = (path, problemId) => {
    setProgress(prev => ({
      ...prev,
      [path]: {
        ...prev?.[path],
        identified: Math.min(prev?.[path]?.identified + 1, prev?.[path]?.total)
      }
    }));
  };

  const markProblemResolved = (path, problemId) => {
    setProgress(prev => ({
      ...prev,
      [path]: {
        ...prev?.[path],
        resolved: Math.min(prev?.[path]?.resolved + 1, prev?.[path]?.total)
      }
    }));
  };

  const getProgressPercentage = (path) => {
    const pathProgress = progress?.[path];
    if (!pathProgress) return 0;
    return Math.round((pathProgress?.resolved / pathProgress?.total) * 100);
  };

  const value = {
    progress,
    markProblemIdentified,
    markProblemResolved,
    getProgressPercentage
  };

  return (
    <AssessmentProgressContext.Provider value={value}>
      {children}
    </AssessmentProgressContext.Provider>
  );
};

const AssessmentProgressIndicator = () => {
  const location = useLocation();
  const { progress, getProgressPercentage } = useAssessmentProgress();

  const navigationItems = [
    { path: '/product-assessment-dashboard', label: 'Dashboard' },
    { path: '/product-detail-view', label: 'Products' },
    { path: '/shopping-cart-management', label: 'Cart' },
    { path: '/user-authentication', label: 'Account' }
  ];

  return (
    <div className="hidden md:flex items-center gap-1 px-4">
      {navigationItems?.map((item) => {
        const itemProgress = progress?.[item?.path];
        const percentage = getProgressPercentage(item?.path);
        const isActive = location?.pathname === item?.path;

        return (
          <div
            key={item?.path}
            className="relative group"
            title={`${item?.label}: ${itemProgress?.resolved}/${itemProgress?.total} resolved`}
          >
            <div
              className={`
                w-2 h-2 rounded-full transition-all duration-250
                ${isActive ? 'scale-125' : 'scale-100'}
                ${percentage === 100 
                  ? 'bg-success' 
                  : percentage > 0 
                    ? 'bg-warning' :'bg-muted'
                }
              `}
            />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none">
              <div className="bg-popover border border-border rounded px-2 py-1 text-xs whitespace-nowrap shadow-md">
                <div className="text-popover-foreground font-medium">{item?.label}</div>
                <div className="text-muted-foreground font-mono text-[10px]">
                  {itemProgress?.resolved}/{itemProgress?.total} resolved
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssessmentProgressIndicator;