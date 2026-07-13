import React, { useContext, useState } from 'react';
import { EventContext } from '../../context/EventContext';
import { Table, Button, Form, Row, Col, Spinner, InputGroup, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EventList = () => {
  const { events, deleteEvent, loading } = useContext(EventContext);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredEvents = events.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleDelete = (id) => { if(window.confirm('¿Estás seguro de eliminar este evento?')) deleteEvent(id); };
  if (loading) return <div className="text-center mt-5 pt-5"><div className="spinner-border spinner-custom" role="status"><span className="visually-hidden">Cargando...</span></div></div>;
  return (
    <Container className="mt-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <h2 className="fw-bold"><i className="bi bi-calendar2-event me-2"></i>Gestión de Eventos</h2>
        <Button as={Link} to="/events/new" variant="success" className="btn-gradient-success"><i className="bi bi-plus-circle me-1"></i> Nuevo Evento</Button>
      </div>
      <Row className="mb-4">
        <Col md={6} lg={5}>
          <InputGroup>
            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
            <Form.Control type="text" placeholder="Buscar eventos por título..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control-modern" />
            {searchTerm && <Button variant="outline-secondary" onClick={() => setSearchTerm('')}><i className="bi bi-x"></i></Button>}
          </InputGroup>
        </Col>
        <Col md={6} lg={7} className="text-md-end mt-3 mt-md-0">
          <span className="text-muted me-3"><i className="bi bi-funnel me-1"></i> {filteredEvents.length} eventos</span>
        </Col>
      </Row>
      <div className="table-responsive">
        <Table className="table-modern">
          <thead><tr><th>ID</th><th>Título</th><th>Fecha</th><th>Capacidad</th><th className="text-center">Acciones</th></tr></thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr><td colSpan="5" className="text-center text-muted py-4"><i className="bi bi-inbox fs-3 d-block mb-2"></i>No se encontraron eventos.</td></tr>
            ) : (
              filteredEvents.map(event => (
                <tr key={event.id}>
                  <td><span className="badge bg-light text-dark">{event.id}</span></td>
                  <td><strong>{event.title}</strong></td>
                  <td>{new Date(event.date).toLocaleDateString('es-ES')}</td>
                  <td>{event.capacity}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      <Button as={Link} to={`/events/${event.id}`} variant="info" size="sm" className="btn-gradient-primary"><i className="bi bi-eye"></i></Button>
                      <Button as={Link} to={`/events/edit/${event.id}`} variant="warning" size="sm" className="btn-outline-custom"><i className="bi bi-pencil"></i></Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(event.id)} className="btn-gradient-danger" aria-label="Eliminar" ><i className="bi bi-trash"></i></Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
export default EventList;