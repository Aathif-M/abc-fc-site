import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-brand-navy text-white p-8">
                    <div className="max-w-2xl w-full bg-black/50 backdrop-blur-md border border-red-500/50 rounded-xl p-8">
                        <h1 className="text-3xl font-anton text-red-500 mb-4">Something went wrong.</h1>
                        <h2 className="text-xl font-bold mb-2">Error:</h2>
                        <pre className="bg-black/80 p-4 rounded text-red-300 overflow-auto text-sm mb-4">
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <h2 className="text-xl font-bold mb-2">Component Stack:</h2>
                        <pre className="bg-black/80 p-4 rounded text-gray-400 overflow-auto text-xs whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 px-6 py-2 bg-brand-blue hover:bg-brand-red transition-colors text-white font-bold uppercase tracking-widest rounded"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
