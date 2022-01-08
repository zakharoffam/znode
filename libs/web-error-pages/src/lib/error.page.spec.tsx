import { render } from '@testing-library/react';

import ErrorPage from "./error.page";

describe('ErrorPage', () => {
  it('должна успешно отображаться', () => {
    const { baseElement } = render(<ErrorPage />);
    expect(baseElement).toBeTruthy();
  });

  it('ошибка 401, должен отображаться текст "Ошибка 401"', () => {
    const { getByText } = render(<ErrorPage status={401}/>);
    expect(getByText(/Ошибка 401/ig)).toBeTruthy();
  });

  it('ошибка 403, должен отображаться текст "Ошибка 403"', () => {
    const { getByText } = render(<ErrorPage status={403}/>);
    expect(getByText(/Ошибка 403/ig)).toBeTruthy();
  });

  it('ошибка 404, должен отображаться текст "Ошибка 404"', () => {
    const { getByText } = render(<ErrorPage status={404}/>);
    expect(getByText(/Ошибка 404/ig)).toBeTruthy();
  });

  it('ошибка 500, должен отображаться текст "Ошибка 500"', () => {
    const { getByText } = render(<ErrorPage status={500}/>);
    expect(getByText(/Ошибка 500/ig)).toBeTruthy();
  });

  it('ошибка с сообщением, должен отображаться текст "Тестовая ошибка!"', () => {
    const { getByText } = render(<ErrorPage status={500} message={'Тестовая ошибка!'} />);
    expect(getByText(/Тестовая ошибка!/ig)).toBeTruthy();
  });

  it('неизвестная ошибка, должен отображаться текст "Что-то случилось!"', () => {
    const { getByText } = render(<ErrorPage />);
    expect(getByText(/Что-то случилось!/ig)).toBeTruthy();
  });
});
