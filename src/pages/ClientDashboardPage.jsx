import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function ClientDashboardPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const response = await axios.get('/tickets/meus-tickets');
        setTickets(response.data);
      } catch (err) {
        setError('Não foi possível carregar seus tickets.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyTickets();
  }, []);

  if (loading) return <div>Carregando seus chamados...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="dashboard-container">
      <h1>Meus Chamados</h1>
      <p>Aqui estão todos os tickets que você abriu.</p>
      
      {tickets.length > 0 ? (
        <ul className="ticket-list">
          {tickets.map(ticket => (
            <li key={ticket.id} className="ticket-card">
              <Link to={`/tickets/${ticket.id}`}>
                <div className="ticket-info">
                  <div>
                    <h2 className="ticket-title">{ticket.titulo}</h2>
                    <p className="ticket-client">Aberto em: {new Date(ticket.dataAbertura).toLocaleDateString()}</p>
                  </div>
                  <span className={`ticket-status status-${ticket.status}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Você ainda não abriu nenhum ticket.</p>
      )}
    </div>
  );
}

export default ClientDashboardPage;