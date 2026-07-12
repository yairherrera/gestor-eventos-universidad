import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, participantsRes] = await Promise.all([
          api.get('/events'),
          api.get('/participants'),
        ]);
        setEvents(eventsRes.data);
        setParticipants(participantsRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addEvent = async (event) => {
    const res = await api.post('/events', event);
    setEvents([...events, res.data]);
    return res.data;
  };

  const updateEvent = async (id, updatedEvent) => {
    const res = await api.put(`/events/${id}`, updatedEvent);
    setEvents(events.map(e => (e.id === id ? res.data : e)));
    return res.data;
  };

  const deleteEvent = async (id) => {
    await api.delete(`/events/${id}`);
    setEvents(events.filter(e => e.id !== id));
    const participantsToRemove = participants.filter(p => p.eventId === id);
    for (const p of participantsToRemove) {
      await api.delete(`/participants/${p.id}`);
    }
    setParticipants(participants.filter(p => p.eventId !== id));
  };

  const addParticipant = async (participant) => {
    const res = await api.post('/participants', participant);
    setParticipants([...participants, res.data]);
    return res.data;
  };

  const deleteParticipant = async (id) => {
    await api.delete(`/participants/${id}`);
    setParticipants(participants.filter(p => p.id !== id));
  };

  const getParticipantsByEvent = (eventId) => {
    return participants.filter(p => p.eventId === eventId);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        participants,
        loading,
        addEvent,
        updateEvent,
        deleteEvent,
        addParticipant,
        deleteParticipant,
        getParticipantsByEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};