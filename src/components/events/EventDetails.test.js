import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EventContext } from '../../context/EventContext';
import EventDetails from './EventDetails';
import { BrowserRouter, Route, Routes, MemoryRouter } from 'react-router-dom';

const mockEvent = { id: 1, title: 'Conferencia', description: 'Desc', date: '2026-07-20', capacity: 10 };
const mockParticipants = [{ id: 1, name: 'Ana', email: 'ana@test.com', eventId: 1 }];
const mockAddParticipant = jest.fn();

const renderWithContext = (eventId = '1') => {
  return render(
    <MemoryRouter initialEntries={[`/events/${eventId}`]}>
      <EventContext.Provider value={{
        events: [mockEvent],
        participants: mockParticipants,
        addParticipant: mockAddParticipant,
        getParticipantsByEvent: () => mockParticipants,
      }}>
        <Routes>
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </EventContext.Provider>
    </MemoryRouter>
  );
};

test('muestra detalles del evento', () => {
  renderWithContext();
  expect(screen.getByText('Conferencia')).toBeInTheDocument();
  expect(screen.getByText('Ana - ana@test.com')).toBeInTheDocument();
});

test('inscribe un participante', async () => {
  renderWithContext();
  fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: 'Carlos' } });
  fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'carlos@test.com' } });
  fireEvent.click(screen.getByRole('button', { name: /Inscribir/i }));
  await waitFor(() => expect(mockAddParticipant).toHaveBeenCalled());
});