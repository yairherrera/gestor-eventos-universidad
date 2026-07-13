import { render, screen, fireEvent } from '@testing-library/react';
import { EventContext } from '../../context/EventContext';
import ParticipantList from './ParticipantList';

const mockParticipants = [{ id: 1, name: 'Ana', email: 'ana@test.com', eventId: 1 }];
const mockDelete = jest.fn();

test('muestra lista de participantes', () => {
  render(
    <EventContext.Provider
      value={{
        participants: mockParticipants,
        deleteParticipant: mockDelete,
        loading: false,
      }}
    >
      <ParticipantList />
    </EventContext.Provider>
  );
  expect(screen.getByText('Ana')).toBeInTheDocument();
});

test('elimina participante', () => {
  window.confirm = jest.fn(() => true);
  render(
    <EventContext.Provider
      value={{
        participants: mockParticipants,
        deleteParticipant: mockDelete,
        loading: false,
      }}
    >
      <ParticipantList />
    </EventContext.Provider>
  );

  // Ahora el botón tiene aria-label="Eliminar"
  const deleteButton = screen.getByRole('button', { name: /Eliminar/i });
  fireEvent.click(deleteButton);
  expect(mockDelete).toHaveBeenCalledWith(1);
});