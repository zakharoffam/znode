import React from 'react';
import axios from 'axios';
import { ErrorPage } from './error.page';
import { EventLogDto } from '@uparm-automation/event-log-module';

interface ErrorBoundaryProps {
  name: string;
  children: any;
}

export class ErrorInterceptor extends React.Component<any, any> {
  private readonly name: string;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.name = props.name;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.error(error);
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  override componentDidCatch(error: any, errorInfo: any) {
    const data: EventLogDto = {
      type: 'error',
      message: `В клиентском приложении "${this.name}" возникла ошибка: ${error.message}`,
    };

    // Отправляем данные о возникшей ошибке в "Журнал событий" сервера
    axios
      .post('/api/event-log', data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  override render() {
    if (this.state['hasError']) {
      // Отображаем страницу ошибки
      return <ErrorPage component={this.name} />;
    }

    return this.props.children;
  }
}
