import { render } from '@testing-library/react';

import { AuthService } from './auth.service';
import { Typography } from '@mui/material';

describe('AuthService', () => {
  it('должен успешно отображаться', () => {
    const { baseElement } = render(
      <AuthService login={''}>
        <Typography>
          Пользователь "Администратор" успешно аутентифицирован
        </Typography>
      </AuthService>
    );
    expect(baseElement).toBeTruthy();
  });

  it('должен отображаться текст "Тестовая ошибка!"', () => {
    const { getByText } = render(
      <AuthService login={'Администратор'}>
        <Typography>
          Пользователь "Администратор" успешно аутентифицирован
        </Typography>
      </AuthService>
    );

    expect(
      getByText(/Пользователь "Администратор" успешно аутентифицирован/gi)
    ).toBeTruthy();
  });
});
