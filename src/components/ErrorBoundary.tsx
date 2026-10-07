import { Component, type ErrorInfo, type ReactNode } from "react";
import LoadError from "./LoadError";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-6 bg-brand-softmist">
                    <LoadError
                        message={this.state.error?.message || "Terjadi kesalahan saat memuat halaman."}
                        onRetry={() => window.location.reload()}
                    />
                </div>
            );
        }
        return this.props.children;
    }
}
