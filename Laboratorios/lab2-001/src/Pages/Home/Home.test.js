import { render, screen } from '@testing-library/react';
import App from './App/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello world/i);
  expect(linkElement).toBeInTheDocument();
});