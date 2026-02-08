import { Component } from 'react';
import Icon from '@/components/AppIcon';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: 'unexpected'
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const isExpectedError = error?.message && (
      error?.message?.includes('assessment') ||
      error?.message?.includes('intentional') ||
      error?.message?.includes('architectural')
    );

    this.setState({
      error,
      errorInfo,
      errorType: isExpectedError ? 'expected' : 'unexpected'
    });

    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: 'unexpected'
    });
  };

  render() {
    if (this.state?.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-card border border-border rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className={`
                p-3 rounded-lg
                ${this.state?.errorType === 'expected' ?'bg-warning/20' :'bg-error/20'
                }
              `}>
                <Icon 
                  name={this.state?.errorType === 'expected' ? 'AlertTriangle' : 'AlertCircle'} 
                  size={24} 
                  color={this.state?.errorType === 'expected' ?'var(--color-warning)' :'var(--color-error)'
                  }
                />
              </div>
              <div className="flex-1">
                <h2 className="text-h3 text-foreground mb-2">
                  {this.state?.errorType === 'expected' ?'Assessment Error Detected' :'Unexpected Error Occurred'
                  }
                </h2>
                <p className="text-muted-foreground">
                  {this.state?.errorType === 'expected' ?'This error is part of the architectural assessment. Identify the root cause and implement a solution.' :'An unexpected error occurred. This may indicate an implementation issue outside the assessment scope.'
                  }
                </p>
              </div>
            </div>

            {this.state?.error && (
              <div className="bg-muted rounded-md p-4 mb-6">
                <div className="text-sm font-mono text-error mb-2">
                  {this.state?.error?.toString()}
                </div>
                {this.state?.errorInfo && (
                  <details className="mt-3">
                    <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                      View stack trace
                    </summary>
                    <pre className="mt-2 text-xs text-muted-foreground overflow-x-auto">
                      {this.state?.errorInfo?.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <button
              onClick={this.resetError}
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-md font-medium transition-all duration-250 hover:scale-[0.98] hover:shadow-lg"
            >
              Reset and Continue Assessment
            </button>
          </div>
        </div>
      );
    }

    return this.props?.children;
  }
}

const ErrorBoundaryStatusIndicator = ({ hasActiveErrors = false }) => {
  return (
    <div className="fixed top-[76px] right-[340px] z-[1050] hidden lg:block">
      <div 
        className={`
          flex items-center gap-2 px-3 py-2 rounded-md
          bg-card border shadow-sm
          transition-all duration-250
          ${hasActiveErrors 
            ? 'border-warning bg-warning/10' :'border-border'
          }
        `}
        title={hasActiveErrors 
          ? 'Assessment errors detected' :'No active errors'
        }
      >
        <Icon 
          name={hasActiveErrors ? 'AlertTriangle' : 'CheckCircle2'} 
          size={16} 
          color={hasActiveErrors 
            ? 'var(--color-warning)' 
            : 'var(--color-success)'
          }
        />
        <span className="text-xs font-medium text-foreground">
          {hasActiveErrors ? 'Errors Active' : 'No Errors'}
        </span>
      </div>
    </div>
  );
};

export { ErrorBoundary, ErrorBoundaryStatusIndicator };
export default ErrorBoundary;