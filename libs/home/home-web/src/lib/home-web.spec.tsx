import { render } from '@testing-library/react';

import HomeWeb from './home-web';

describe('HomeWeb', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomeWeb />);
    expect(baseElement).toBeTruthy();
  });
});
