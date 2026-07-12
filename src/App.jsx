import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/home/Home';
import EventList from './components/events/EventList';
import EventForm from './components/events/EventForm';
import EventDetails from './components/events/EventDetails';
import ParticipantList from './components/participants/ParticipantList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <EventProvider>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<EventList />} />
              <Route path="/events/new" element={<EventForm />} />
              <Route path="/events/edit/:id" element={<EventForm />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/participants" element={<ParticipantList />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </EventProvider>
    </BrowserRouter>
  );
}

export default App;