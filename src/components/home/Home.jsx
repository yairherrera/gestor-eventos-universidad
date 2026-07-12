import React, { useContext } from 'react';
import { EventContext } from '../../context/EventContext';
import { Card, Row, Col, Button, Spinner, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const { events, loading } = useContext(EventContext);
  if (loading) {
    return <div className="text-center mt-5 pt-5"><div className="spinner-border spinner-custom" role="status"><span className="visually-hidden">Cargando...</span></div></div>;
  }
  const featuredEvents = events.slice(0, 6);
  return (
    <>
      <section className="hero-section">
        <Container>
          <div className="text-center">
            <h1 className="hero-title">Bienvenido a la Plataforma de Eventos</h1>
            <p className="hero-subtitle">Descubre, inscríbete y gestiona conferencias, talleres y seminarios académicos. La forma más fácil de mantenerte al día en tu universidad.</p>
            <div className="mt-4">
              <Button as={Link} to="/events" variant="light" size="lg" className="fw-bold px-4">
                Ver todos los eventos <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      <Container>
        <h2 className="mb-4 fw-bold">Próximos Eventos</h2>
        <Row>
          {featuredEvents.length === 0 ? (
            <Col><p className="text-muted">No hay eventos disponibles.</p></Col>
          ) : (
            featuredEvents.map(event => (
              <Col key={event.id} md={4} className="mb-4">
                <Card className="event-card h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title>{event.title}</Card.Title>
                      <span className="badge-capacity"><i className="bi bi-people"></i> {event.capacity}</span>
                    </div>
                    <Card.Text>{event.description.length > 80 ? event.description.slice(0,80)+'...' : event.description}</Card.Text>
                  </Card.Body>
                  <div className="card-footer">
                    <small className="text-muted"><i className="bi bi-calendar me-1"></i>{new Date(event.date).toLocaleDateString('es-ES', {year:'numeric', month:'short', day:'numeric'})}</small>
                    <Button as={Link} to={`/events/${event.id}`} variant="outline-primary" size="sm" className="fw-bold">Ver más <i className="bi bi-chevron-right"></i></Button>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
        <div className="text-center mt-3">
          <Button as={Link} to="/events" variant="outline-dark" className="px-5"><i className="bi bi-grid-3x3-gap me-2"></i> Explorar todos los eventos</Button>
        </div>
      </Container>
    </>
  );
};
export default Home;