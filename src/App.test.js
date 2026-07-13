import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import api from './api/api';

jest.mock('./api/api');

test('renders header correctly', async () => {
  // Mock de API para evitar Network Error
  api.get.mockImplementation((url) => {
    if (url === '/events') return Promise.resolve({ data: [] });
    if (url === '/participants') return Promise.resolve({ data: [] });
    return Promise.reject(new Error('Not found'));
  });

  render(<App />);

  // Esperar a que el componente se renderice (desaparezca el spinner)
  await waitFor(() => {
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  // Verificar que el header existe y contiene texto
  const brand = document.querySelector('.navbar-brand');
  expect(brand).toBeInTheDocument();
  expect(brand).toHaveTextContent('GestorEventos');
});