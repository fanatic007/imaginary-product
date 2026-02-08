import { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const PerformanceMonitor = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [metrics, setMetrics] = useState({
    ttfb: 0,
    tfp: 0,
    timestamp: Date.now()
  });

  useEffect(() => {
    const measurePerformance = () => {
      if (window.performance && window.performance?.timing) {
        const timing = window.performance?.timing;
        const ttfb = timing?.responseStart - timing?.requestStart;
        
        if (window.performance?.getEntriesByType) {
          const paintEntries = window.performance?.getEntriesByType('paint');
          const tfpEntry = paintEntries?.find(entry => entry?.name === 'first-paint');
          const tfp = tfpEntry ? tfpEntry?.startTime : 0;
          
          setMetrics({
            ttfb: Math.round(ttfb),
            tfp: Math.round(tfp),
            timestamp: Date.now()
          });
        }
      }
    };

    measurePerformance();
    const interval = setInterval(measurePerformance, 5000);

    return () => clearInterval(interval);
  }, []);

  const getMetricStatus = (value, thresholds) => {
    if (value <= thresholds?.good) return 'success';
    if (value <= thresholds?.moderate) return 'warning';
    return 'error';
  };

  const ttfbStatus = getMetricStatus(metrics?.ttfb, { good: 100, moderate: 300 });
  const tfpStatus = getMetricStatus(metrics?.tfp, { good: 1000, moderate: 2500 });

  return (
    <>
      <div className="fixed top-[76px] right-6 z-[1100]">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-md
            bg-card border border-border shadow-md
            transition-all duration-250 ease-smooth
            hover:shadow-lg hover:scale-[0.98]
            ${isExpanded ? 'bg-muted' : ''}
          `}
          aria-label="Toggle performance monitor"
        >
          <Icon 
            name="Activity" 
            size={18} 
            color="var(--color-accent)" 
          />
          <span className="hidden sm:inline text-sm font-medium text-foreground">
            Performance
          </span>
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
            color="var(--color-muted-foreground)" 
          />
        </button>

        {isExpanded && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-card border border-border rounded-md shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground font-mono">
                Performance Metrics
              </h3>
              <span className="text-xs text-muted-foreground font-caption">
                Live
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${ttfbStatus}`} />
                  <span className="text-sm text-foreground font-medium">TTFB</span>
                </div>
                <span className="text-sm font-mono text-foreground">
                  {metrics?.ttfb}ms
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${tfpStatus}`} />
                  <span className="text-sm text-foreground font-medium">TFP</span>
                </div>
                <span className="text-sm font-mono text-foreground">
                  {metrics?.tfp}ms
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Info" size={14} />
                <span className="font-caption">
                  Metrics update every 5 seconds
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PerformanceMonitor;