import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Gestor de Eventos/i);
  expect(headerElement).toBeInTheDocument();
});