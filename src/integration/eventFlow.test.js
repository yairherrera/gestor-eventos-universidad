import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import api from '../api/api';

jest.mock('../api/api');

jest.setTimeout(15000);

beforeEach(() => {
  api.get.mockImplementation((url) => {
    if (url === '/events') return Promise.resolve({ data: [] });
    if (url === '/participants') return Promise.resolve({ data: [] });
    return Promise.reject(new Error('Not found'));
  });

  api.post.mockImplementation((url, data) => {
    if (url === '/events') {
      return Promise.resolve({ data: { ...data, id: 99 } });
    }
    if (url === '/participants') {
      return Promise.resolve({ data: { ...data, id: 999 } });
    }
  });
});

test('flujo completo: crear evento y luego verlo en la lista', async () => {
  render(<App />);

  // Esperar a que el spinner desaparezca
  await waitFor(() => {
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  }, { timeout: 5000 });

  // Navegar a Eventos
  const eventLinks = await screen.findAllByText(/Eventos/i);
  fireEvent.click(eventLinks[1]);

  // Verificar que estamos en la página de gestión
  const heading = await screen.findByRole('heading', { name: /Gestión de Eventos/i });
  expect(heading).toBeInTheDocument();

  // Click en "Nuevo Evento"
  const newEventBtn = await screen.findByText(/Nuevo Evento/i);
  fireEvent.click(newEventBtn);

  // Esperar a que el formulario esté disponible
  const titleInput = await screen.findByLabelText(/Título del evento/i);
  const descriptionInput = screen.getByLabelText(/Descripción/i);
  const dateInput = screen.getByLabelText(/Fecha/i);
  const capacityInput = screen.getByLabelText(/Capacidad/i);

  // Rellenar formulario
  fireEvent.change(titleInput, { target: { value: 'Integración Test' } });
  fireEvent.change(descriptionInput, { target: { value: 'Descripción de prueba' } });
  fireEvent.change(dateInput, { target: { value: '2026-08-15' } });
  fireEvent.change(capacityInput, { target: { value: '20' } });

  // Enviar formulario
  const submitBtn = screen.getByRole('button', { name: /Crear Evento/i });
  fireEvent.click(submitBtn);

  // Verificar llamada a la API
  await waitFor(() => {
    expect(api.post).toHaveBeenCalledWith('/events', {
      title: 'Integración Test',
      description: 'Descripción de prueba',
      date: '2026-08-15',
      capacity: 20,
    });
  }, { timeout: 5000 });

  // Verificar que el nuevo evento aparece en la lista
  await waitFor(() => {
    expect(screen.getByText('Integración Test')).toBeInTheDocument();
  }, { timeout: 5000 });
});