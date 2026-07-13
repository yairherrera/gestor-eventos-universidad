import { render, screen, waitFor } from '@testing-library/react';
import { EventProvider, EventContext } from './EventContext';
import api from '../api/api';
import { useContext } from 'react';

jest.mock('../api/api');

const TestComponent = () => {
  const { events, loading } = useContext(EventContext);
  if (loading) return <div>Cargando...</div>;
  return <div>{events.length > 0 ? events[0].title : 'Sin eventos'}</div>;
};

test('carga eventos al montar', async () => {
  api.get.mockImplementation((url) => {
    if (url === '/events') return Promise.resolve({ data: [{ id: 1, title: 'Evento de prueba' }] });
    if (url === '/participants') return Promise.resolve({ data: [] });
    return Promise.reject(new Error('Not found'));
  });

  render(
    <EventProvider>
      <TestComponent />
    </EventProvider>
  );

  expect(screen.getByText('Cargando...')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('Evento de prueba')).toBeInTheDocument());
});