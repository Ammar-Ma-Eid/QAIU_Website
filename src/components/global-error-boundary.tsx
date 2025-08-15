"use client";
import React from "react";

export default class GlobalErrorBoundary extends React.Component<{
    children: React.ReactNode
}, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // Log error to an error reporting service if needed
        // console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                    <h1 className="font-headline text-3xl mb-4 text-destructive">Something went wrong</h1>
                    <p className="text-muted-foreground mb-6">An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.</p>
                    <button className="bg-primary text-primary-foreground px-6 py-2 rounded shadow" onClick={() => window.location.reload()}>Reload Page</button>
                </div>
            );
        }
        return this.props.children;
    }
}
