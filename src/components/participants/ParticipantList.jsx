import React, { useContext } from 'react';
import { EventContext } from '../../context/EventContext';
import { Table, Button, Spinner, Container } from 'react-bootstrap';

const ParticipantList = () => {
  const { participants, deleteParticipant, loading } = useContext(EventContext);

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este participante?')) {
      deleteParticipant(id);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5 pt-5">
        <div className="spinner-border spinner-custom" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-people me-2"></i>Lista de Participantes
        </h2>
        <span className="text-muted">
          <i className="bi bi-person me-1"></i> Total: {participants.length}
        </span>
      </div>
      <div className="table-responsive">
        <Table className="table-modern">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Evento</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {participants.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  <i className="bi bi-inbox fs-3 d-block mb-2"></i>
                  No hay participantes registrados.
                </td>
              </tr>
            ) : (
              participants.map((p) => (
                <tr key={p.id}>
                  <td>
                    <span className="badge bg-light text-dark">{p.id}</span>
                  </td>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td>{p.email}</td>
                  <td>
                    <span className="badge bg-info bg-opacity-10 text-dark">
                      Evento #{p.eventId}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(p.id)}
                        className="btn-gradient-danger"
                        aria-label="Eliminar"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
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

export default ParticipantList;