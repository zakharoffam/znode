import { render } from '@testing-library/react';

import HomeWebPage from './home-web-page';

describe('HomeWebPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomeWebPage />);
    expect(baseElement).toBeTruthy();
  });
});
