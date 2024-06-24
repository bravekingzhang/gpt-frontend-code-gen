import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 以便下一次渲染可以显示降级 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你也可以将错误日志上报给服务器
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级 UI
      return <h2>Something went wrong,please let copilot fix it </h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;