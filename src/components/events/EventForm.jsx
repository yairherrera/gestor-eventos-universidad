import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../../context/EventContext';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const EventForm = () => {
  const { id } = useParams(); const navigate = useNavigate();
  const { events, addEvent, updateEvent } = useContext(EventContext);
  const isEdit = Boolean(id);
  const [formData, setFormData] = useState({ title:'', description:'', date:'', capacity:'' });
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (isEdit) {
      const event = events.find(e => e.id === parseInt(id));
      if (event) setFormData({ title:event.title, description:event.description, date:event.date, capacity:event.capacity });
    }
  }, [id, events, isEdit]);
  const handleChange = (e) => { const { name, value } = e.target; setFormData({ ...formData, [name]: value }); };
  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true);
    const eventData = { ...formData, capacity: parseInt(formData.capacity) };
    try {
      if (isEdit) await updateEvent(parseInt(id), eventData);
      else await addEvent(eventData);
      navigate('/events');
    } catch (error) { console.error(error); setSubmitting(false); }
  };
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0 pt-4 pb-0">
              <h2 className="fw-bold mb-0"><i className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>{isEdit ? 'Editar Evento' : 'Crear Nuevo Evento'}</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="title" className="form-label">Título del evento</Form.Label>
                  <Form.Control id="title" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Ej. Conferencia sobre Inteligencia Artificial" className="form-control-modern" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="description" className="form-label">Descripción</Form.Label>
                  <Form.Control id="description" as="textarea" rows={4} name="description" value={formData.description} onChange={handleChange} placeholder="Describe el evento, objetivos, ponentes, etc." className="form-control-modern" required />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="date" className="form-label">Fecha</Form.Label>
                      <Form.Control id="date" type="date" name="date" value={formData.date} onChange={handleChange} className="form-control-modern" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="capacity" className="form-label">Capacidad (número de participantes)</Form.Label>
                      <Form.Control id="capacity" type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="50" min="1" className="form-control-modern" required />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex gap-2 mt-4">
                  <Button variant="primary" type="submit" disabled={submitting} className="btn-gradient-primary px-4">
                    {submitting ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Guardando...</> : <><i className={`bi ${isEdit ? 'bi-check2' : 'bi-plus'} me-2`}></i>{isEdit ? 'Actualizar Evento' : 'Crear Evento'}</>}
                  </Button>
                  <Button variant="secondary" onClick={() => navigate('/events')} className="btn-outline-custom"><i className="bi bi-x me-2"></i>Cancelar</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventForm;