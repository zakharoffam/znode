import { render } from '@testing-library/react';

import UsersUsersWeb from './users-users-web';

describe('UsersUsersWeb', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UsersUsersWeb />);
    expect(baseElement).toBeTruthy();
  });
});
