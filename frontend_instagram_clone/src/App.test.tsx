import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Instagram Clone heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Instagram Clone/i);
  expect(headingElement).toBeInTheDocument();
});
