import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EventContext } from '../../context/EventContext';
import EventList from './EventList';
import { BrowserRouter } from 'react-router-dom';

const mockEvents = [
  { id: 1, title: 'Conferencia IA', date: '2026-07-20', capacity: 50 },
  { id: 2, title: 'Taller React', date: '2026-07-25', capacity: 30 },
];
const mockDelete = jest.fn();

test('renders event list', () => {
  render(
    <BrowserRouter>
      <EventContext.Provider value={{ events: mockEvents, deleteEvent: mockDelete, loading: false }}>
        <EventList />
      </EventContext.Provider>
    </BrowserRouter>
  );
  expect(screen.getByText('Conferencia IA')).toBeInTheDocument();
  expect(screen.getByText('Taller React')).toBeInTheDocument();
});

test('filters events by search term', () => {
  render(
    <BrowserRouter>
      <EventContext.Provider value={{ events: mockEvents, deleteEvent: mockDelete, loading: false }}>
        <EventList />
      </EventContext.Provider>
    </BrowserRouter>
  );
  const searchInput = screen.getByPlaceholderText('Buscar eventos por título...');
  fireEvent.change(searchInput, { target: { value: 'IA' } });
  expect(screen.getByText('Conferencia IA')).toBeInTheDocument();
  expect(screen.queryByText('Taller React')).not.toBeInTheDocument();
});

test('calls deleteEvent when delete button is clicked', async () => {
  window.confirm = jest.fn(() => true);
  render(
    <BrowserRouter>
      <EventContext.Provider value={{ events: mockEvents, deleteEvent: mockDelete, loading: false }}>
        <EventList />
      </EventContext.Provider>
    </BrowserRouter>
  );

  // Esperar a que los botones estén en el DOM
  const deleteButtons = await screen.findAllByRole('button', { name: /Eliminar/i });
  fireEvent.click(deleteButtons[0]);
  expect(mockDelete).toHaveBeenCalledWith(1);
});