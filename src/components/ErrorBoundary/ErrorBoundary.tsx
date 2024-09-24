/* Framework imports -------------------------------------------------------- */
import React from 'react'

/* Component declaration ---------------------------------------------------- */
interface Props {
  children: React.ReactNode;
  errorMessage: React.ReactNode;
  pathname: string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
    }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo)
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.pathname !== this.props.pathname) {
      this.setState({ hasError: false })
    }
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (this.props.errorMessage)
    }

    return this.props.children
  }
}

export default ErrorBoundary
