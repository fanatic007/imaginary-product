import { useState, useEffect } from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';

const APIUsecaseDemo = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [callCount, setCallCount] = useState(0);
  const [abortCount, setAbortCount] = useState(0);
  const [autoFetch, setAutoFetch] = useState(true);

  useEffect(() => {
    if (!autoFetch) return;

    // Track API call attempts
    setCallCount(prev => prev + 1);
    setLoading(true);
    setError(null);

    fetch('https://jsonplaceholder.typicode.com/users')?.then(response => {
        if (!response?.ok) throw new Error('API request failed');
        return response?.json();
      })?.then(data => {
        setUsers(data);
        setLoading(false);
      })?.catch(err => {
        setError(err?.message);
        setLoading(false);
      });

  }, [autoFetch]);

  const handleManualFetch = () => {
    setCallCount(prev => prev + 1);
    setLoading(true);
    setError(null);

    fetch('https://jsonplaceholder.typicode.com/users')?.then(response => {
        if (!response?.ok) throw new Error('API request failed');
        return response?.json();
      })?.then(data => {
        setUsers(data);
        setLoading(false);
      })?.catch(err => {
        setError(err?.message);
        setLoading(false);
      });
  };

  const handleReset = () => {
    setUsers([]);
    setError(null);
    setCallCount(0);
    setAbortCount(0);
    setAutoFetch(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-start gap-3 mb-4">
        <Icon 
          name="Wifi" 
          size={24} 
          color="var(--color-primary)" 
          className="flex-shrink-0 mt-0.5" 
        />
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
            Demo API integration
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4">
            This component fetches user data from JSONPlaceholder API.
          </p>
        </div>
      </div>

    

      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleManualFetch}
            disabled={loading}
            iconName="RefreshCw"
            iconPosition="left"
            size="sm"
          >
            Manual Fetch
          </Button>
          
          <Button
            onClick={() => setAutoFetch(!autoFetch)}
            variant={autoFetch ? "destructive" : "default"}
            iconName={autoFetch ? "StopCircle" : "PlayCircle"}
            iconPosition="left"
            size="sm"
          >
            {autoFetch ? 'Stop Auto Fetch' : 'Start Auto Fetch'}
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            size="sm"
          >
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-background border border-border rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">API Calls Made</div>
            <div className="text-xl md:text-2xl font-bold text-foreground">{callCount}</div>
          </div>
          <div className="bg-background border border-border rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Aborted Calls</div>
            <div className="text-xl md:text-2xl font-bold text-warning">{abortCount}</div>
          </div>
          <div className="bg-background border border-border rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Users Loaded</div>
            <div className="text-xl md:text-2xl font-bold text-success">{users?.length || 0}</div>
          </div>
          <div className="bg-background border border-border rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Status</div>
            <div className="text-sm font-semibold">
              {loading ? (
                <span className="text-primary">Loading...</span>
              ) : error ? (
                <span className="text-error">Error</span>
              ) : users?.length > 0 ? (
                <span className="text-success">Success</span>
              ) : (
                <span className="text-muted-foreground">Idle</span>
              )}
            </div>
          </div>
        </div>

        {loading && (
          <div className="bg-primary/10 border border-primary rounded-lg p-3 md:p-4">
            <div className="flex items-center gap-2">
              <Icon name="Loader" size={20} color="var(--color-primary)" className="animate-spin" />
              <span className="text-sm text-foreground">Fetching users from API...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-error/10 border border-error rounded-lg p-3 md:p-4">
            <div className="flex items-center gap-2">
              <Icon name="XCircle" size={20} color="var(--color-error)" />
              <span className="text-sm text-foreground">Error: {error}</span>
            </div>
          </div>
        )}

        {users?.length > 0 && (
          <div className="bg-background border border-border rounded-lg p-3 md:p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Fetched Users:</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {users?.slice(0, 5)?.map((user) => (
                <div 
                  key={user?.id} 
                  className="flex items-center gap-3 p-2 bg-card border border-border rounded"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-primary">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {user?.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </div>
                  </div>
                </div>
              ))}
              {users?.length > 5 && (
                <div className="text-xs text-muted-foreground text-center pt-2">
                  + {users?.length - 5} more users
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default APIUsecaseDemo;