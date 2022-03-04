import React from "react";
import axios from 'axios';
import { ErrorAppPage } from "./pages/error-app.page";

interface ErrorInterceptorProps {
  appName: string;
  children: any;
}

export class ErrorInterceptor extends React.Component<any, any> {
  private readonly appName: string;

  constructor(props: ErrorInterceptorProps) {
    super(props);
    this.appName = props.appName;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.error(error);
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  override componentDidCatch(error: any, errorInfo: any) {
    // const data: EventLogDto = {
    //   type: 'error',
    //   message: `В клиентском приложении "${this.name}" возникла ошибка: ${error.message}`,
    // };

    // Отправляем данные о возникшей ошибке в "Журнал событий" сервера
    // axios
    //   .post('/api/event-log', data)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
  }

  override render() {
    if (this.state['hasError']) {
      // Отображаем страницу ошибки
      return <ErrorAppPage appName={this.appName} />;
    }

    return this.props.children;
  }
}
