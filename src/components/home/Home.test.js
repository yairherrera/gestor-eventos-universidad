import { render, screen } from '@testing-library/react';
import { EventContext } from '../../context/EventContext';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

const mockEvents = [
  { id: 1, title: 'Evento Test', description: 'Descripción', date: '2026-07-20', capacity: 30 },
];

const renderWithContext = (events = mockEvents, loading = false) => {
  return render(
    <BrowserRouter>
      <EventContext.Provider value={{ events, loading }}>
        <Home />
      </EventContext.Provider>
    </BrowserRouter>
  );
};

test('muestra spinner cuando loading es true', () => {
  renderWithContext([], true);
  expect(screen.getByRole('status')).toBeInTheDocument();
});

test('muestra eventos cuando loading es false', () => {
  renderWithContext(mockEvents, false);
  expect(screen.getByText('Evento Test')).toBeInTheDocument();
});

test('muestra mensaje cuando no hay eventos', () => {
  renderWithContext([], false);
  expect(screen.getByText('No hay eventos disponibles.')).toBeInTheDocument();
});