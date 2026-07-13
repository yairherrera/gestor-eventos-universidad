import React, { useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { EventContext } from '../../context/EventContext';
import { Card, Button, Form, Alert, Container, Row, Col, Badge } from 'react-bootstrap';

const EventDetails = () => {
  const { id } = useParams(); const navigate = useNavigate();
  const { events, addParticipant, getParticipantsByEvent } = useContext(EventContext);
  const event = events.find(e => e.id === parseInt(id));
  const [name, setName] = useState(''); const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text:'', type:'' }); const [submitting, setSubmitting] = useState(false);
  if (!event) return <Container className="mt-5 text-center"><i className="bi bi-exclamation-triangle fs-1 text-warning"></i><h3 className="mt-3">Evento no encontrado</h3><Button onClick={() => navigate('/events')} variant="primary" className="mt-3"><i className="bi bi-arrow-left me-2"></i>Volver</Button></Container>;
  const participants = getParticipantsByEvent(parseInt(id));
  const isFull = participants.length >= event.capacity;
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { setMessage({ text:'Nombre y email son obligatorios', type:'danger' }); return; }
    if (isFull) { setMessage({ text:'Capacidad completa', type:'danger' }); return; }
    setSubmitting(true);
    try {
      await addParticipant({ name: name.trim(), email: email.trim(), eventId: parseInt(id) });
      setName(''); setEmail('');
      setMessage({ text:'¡Participante inscrito exitosamente!', type:'success' });
    } catch (error) { setMessage({ text:'Error al inscribir', type:'danger' }); }
    setSubmitting(false);
  };
  const getInitials = (n) => n.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2);
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col lg={9}>
          <Card className="detail-card">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h2 className="fw-bold"><i className="bi bi-calendar-event me-2"></i>{event.title}</h2>
              <Badge pill bg="light" text="dark" className="px-3 py-2"><i className="bi bi-people me-1"></i>{participants.length} / {event.capacity} inscritos</Badge>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-8">
                  <p className="text-muted fs-6">{event.description}</p>
                  <div className="d-flex gap-4 flex-wrap">
                    <div><i className="bi bi-calendar me-2"></i><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString('es-ES', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</div>
                    <div><i className="bi bi-people me-2"></i><strong>Capacidad:</strong> {event.capacity} participantes</div>
                  </div>
                  <div className="mt-3">
                    <Button variant="secondary" onClick={() => navigate('/events')} className="me-2"><i className="bi bi-arrow-left me-2"></i>Volver</Button>
                    <Button as={Link} to={`/events/edit/${event.id}`} variant="warning"><i className="bi bi-pencil me-2"></i>Editar</Button>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded-3">
                    <h6 className="fw-bold"><i className="bi bi-info-circle me-2"></i>Estado</h6>
                    {isFull ? <span className="badge bg-danger w-100 py-2">Evento completo</span> : <span className="badge bg-success w-100 py-2">Inscripciones abiertas</span>}
                    <hr /><small className="text-muted"><i className="bi bi-person me-1"></i>{participants.length} participantes inscritos</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          <div className="mt-4">
            <h4 className="fw-bold"><i className="bi bi-person-lines-fill me-2"></i>Participantes inscritos</h4>
            {participants.length === 0 ? <p className="text-muted">Aún no hay participantes.</p> : (
              <div className="bg-white rounded-3 p-3 shadow-sm">
                {participants.map(p => (
                  <div key={p.id} className="participant-item">
                    <div className="participant-avatar">{getInitials(p.name)}</div>
                    <div>
                      <div className="fw-semibold" data-testid="participant-name">{p.name}</div>
                      <small className="text-muted" data-testid="participant-email">{p.email}</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 p-4 bg-light rounded-4">
            <h5 className="fw-bold"><i className="bi bi-person-plus me-2"></i>Inscribir nuevo participante</h5>
            {message.text && <Alert variant={message.type} className={`alert-custom ${message.type === 'success' ? 'alert-success-custom' : 'alert-danger-custom'}`} dismissible onClose={() => setMessage({ text:'', type:'' })}>{message.text}</Alert>}
            {isFull && <Alert variant="warning" className="alert-custom"><i className="bi bi-exclamation-triangle me-2"></i>Este evento ya ha alcanzado su capacidad máxima.</Alert>}
            <Form onSubmit={handleRegister}>
              <Row>
                <Col md={5}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="detailName" className="form-label">Nombre completo</Form.Label>
                    <Form.Control id="detailName" type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Ej. María López" className="form-control-modern" disabled={isFull} required />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="detailEmail" className="form-label">Correo electrónico</Form.Label>
                    <Form.Control id="detailEmail" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="ejemplo@universidad.edu" className="form-control-modern" disabled={isFull} required />
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button variant="success" type="submit" disabled={isFull || submitting} className="btn-gradient-success w-100">
                    {submitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <><i className="bi bi-check-circle me-1"></i>Inscribir</>}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EventDetails;