import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import api from '../api/api';

jest.mock('../api/api');

beforeEach(() => {
  // Mock de las llamadas a la API
  api.get.mockImplementation((url) => {
    if (url === '/events') return Promise.resolve({ data: [] });
    if (url === '/participants') return Promise.resolve({ data: [] });
  });
  api.post.mockImplementation((url, data) => {
    if (url === '/events') return Promise.resolve({ data: { ...data, id: 99 } });
    if (url === '/participants') return Promise.resolve({ data: { ...data, id: 999 } });
  });
});

test('flujo completo: crear evento y luego verlo en la lista', async () => {
  render(<App />);
  
  // Navegar a eventos
  fireEvent.click(screen.getByText(/Eventos/i));
  await waitFor(() => screen.getByText(/Gestionar Eventos/i));
  
  // Hacer clic en "Nuevo Evento"
  fireEvent.click(screen.getByText(/Nuevo Evento/i));
  await waitFor(() => screen.getByLabelText(/Título del evento/i));
  
  // Rellenar formulario
  fireEvent.change(screen.getByLabelText(/Título del evento/i), { target: { value: 'Integración Test' } });
  fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Descripción de prueba' } });
  fireEvent.change(screen.getByLabelText(/Fecha/i), { target: { value: '2026-08-15' } });
  fireEvent.change(screen.getByLabelText(/Capacidad/i), { target: { value: '20' } });
  
  // Enviar
  fireEvent.click(screen.getByRole('button', { name: /Crear Evento/i }));
  
  // Verificar que se llama a la API
  await waitFor(() => expect(api.post).toHaveBeenCalledWith('/events', {
    title: 'Integración Test',
    description: 'Descripción de prueba',
    date: '2026-08-15',
    capacity: 20,
  }));
  
  // Redirige a la lista y muestra el nuevo evento (mockeado)
  // Como el mock devuelve el evento, podemos comprobar que aparece
  await waitFor(() => expect(screen.getByText('Integración Test')).toBeInTheDocument());
});