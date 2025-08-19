import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, RefreshCw, Bug, Info } from 'lucide-react';

interface Props {
  children: ReactNode;
  agentId?: string;
  onRetry?: () => void;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

export class AgentErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    retryCount: 0
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      retryCount: 0
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Agent Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Log error to monitoring service
    this.logError(error, errorInfo);
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    // In production, this would send to your error monitoring service
    // e.g., Sentry, LogRocket, etc.
    const errorData = {
      agentId: this.props.agentId,
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.error('Agent Error Log:', errorData);
    
    // You could send this to your backend
    // fetch('/api/errors/agent', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData)
    // });
  };

  private handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));

    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    });
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <CardTitle className="text-lg font-semibold text-red-900">
                Agent Error
              </CardTitle>
            </div>
            {this.props.agentId && (
              <Badge variant="outline" className="w-fit bg-red-100 text-red-700 border-red-200">
                Agent: {this.props.agentId}
              </Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <div className="flex items-start gap-3">
                <Bug className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-900 mb-2">What happened?</h4>
                  <p className="text-sm text-red-700 mb-3">
                    The SFDR agent encountered an unexpected error and couldn't complete its task.
                  </p>
                  {this.state.error && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-red-600 hover:text-red-700 mb-2">
                        Technical Details
                      </summary>
                      <div className="bg-gray-100 p-3 rounded text-gray-800 font-mono overflow-x-auto">
                        <div className="mb-2">
                          <strong>Error:</strong> {this.state.error.message}
                        </div>
                        {this.state.error.stack && (
                          <div>
                            <strong>Stack:</strong>
                            <pre className="whitespace-pre-wrap text-xs mt-1">
                              {this.state.error.stack}
                            </pre>
                          </div>
                        )}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900 mb-2">What you can do:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Try refreshing the agent to resolve temporary issues</li>
                    <li>• Check your internet connection</li>
                    <li>• Contact support if the problem persists</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                onClick={this.handleRetry}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Agent
                {this.state.retryCount > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                    {this.state.retryCount}
                  </Badge>
                )}
              </Button>
              <Button 
                variant="outline"
                onClick={this.handleReset}
              >
                Reset
              </Button>
            </div>

            {this.state.retryCount >= 3 && (
              <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-700">
                  Multiple retry attempts detected. Consider contacting support if the issue persists.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}