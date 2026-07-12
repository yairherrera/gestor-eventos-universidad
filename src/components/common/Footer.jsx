import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0"><i className="bi bi-mortarboard-fill me-2"></i>Universidad Continental</p>
            <small>&copy; {new Date().getFullYear()} - Todos los derechos reservados</small>
          </div>
          <div className="col-md-4 text-center">
            <div className="social-icons">
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-twitter"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <small>Plataforma de Gestión de Eventos Académicos</small>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;