import { useEffect } from "react";
import Icon from "@/components/AppIcon";

const LiveDataStreamingSvc = () => {

  const persistentArray = [];
  
  useEffect(() => {
    const interval = setInterval(() => {
      for (let i = 0; i < 1000; i++) {
        persistentArray?.push({
          id: Math.random(),
          data: new Array(500)?.fill('✨ some dynamic data over from streaming service'),
          timestamp: Date.now()
        });
      }

    }, 2000);

    return () => {
      clearInterval(interval);
    }

  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Activity" size={20} color="var(--color-accent)" />
          Live data from streaming service
        </h3>
      </div>
      <div>
        {persistentArray?.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Initializing data stream...
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Streaming {persistentArray?.length} data packets...
          </p>
        )}
      </div>
    </div>
  );
};

export default LiveDataStreamingSvc;