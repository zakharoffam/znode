import React from "react";
import { ErrorAppPage } from "./pages/error-app.page";

interface ErrorInterceptorProps {
  children: any;
}

export class ErrorInterceptor extends React.Component<any, any> {
  constructor(props: ErrorInterceptorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.error(error);
    return { hasError: true };
  }

  override componentDidCatch(error: any, errorInfo: any) {
    // TODO: Реализовать логирование ошибок на сервере
  }

  override render() {
    if (this.state['hasError']) {
      // Отображаем страницу ошибки
      return <ErrorAppPage />;
    }

    return this.props.children;
  }
}
