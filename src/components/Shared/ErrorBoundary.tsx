import React from 'react';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown, info: unknown) {
    console.error('Uncaught error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
          <p>Please refresh or try again later.</p>
        </div>
      );
    }
    return (this.props as React.PropsWithChildren<object>).children;
  }
}

export default ErrorBoundary;
