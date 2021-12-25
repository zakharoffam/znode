import { render } from '@testing-library/react';

import AuthWeb from './auth-web';

describe('AuthWeb', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthWeb login={'test'}><>Ok</></AuthWeb>);
    expect(baseElement).toBeTruthy();
  });
});
