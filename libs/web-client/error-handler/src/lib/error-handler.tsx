import React from "react";
import { ErrorPage } from "./error.page";

interface ErrorBoundaryProps {
  name: string;
  children: any;
}

export class ErrorHandler extends React.Component<any, any> {
  private readonly name: string;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.name = props.name;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.log(error);
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  override componentDidCatch(error: any, errorInfo: any) {
    console.log(`На странице ${this.name} произошла ошибка!`);
    // TODO: Реализовать журнал ошибок
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    console.log(error);
    console.log(errorInfo);
    // logErrorToMyService(error, errorInfo);
  }

  override render() {
    if (this.state["hasError"]) {
      // Можно отрендерить запасной UI произвольного вида
      return <ErrorPage />;
    }

    return this.props.children;
  }
}
