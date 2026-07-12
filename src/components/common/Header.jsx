import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  const location = useLocation();
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="bi bi-calendar-event-fill"></i>
          <span>Gestor</span>Eventos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
              <i className="bi bi-house-door"></i> Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/events" active={location.pathname.startsWith('/events')}>
              <i className="bi bi-calendar2-event"></i> Eventos
            </Nav.Link>
            <Nav.Link as={Link} to="/participants" active={location.pathname === '/participants'}>
              <i className="bi bi-people"></i> Participantes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;