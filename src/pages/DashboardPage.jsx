import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Importa o CSS específico do Dashboard

function DashboardPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Busca os tickets da API quando o componente é montado
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('/tickets');
        setTickets(response.data);
      } catch (err) {
        setError('Não foi possível carregar os tickets.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []); // O array vazio [] garante que a busca só acontece uma vez

  // Exibe mensagens de carregamento ou erro
  if (loading) {
    return <div>Carregando tickets...</div>;
  }
  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Painel de Controle</h1>
      <p>Aqui estão todos os tickets do sistema.</p>
      
      {tickets.length > 0 ? (
        <ul className="ticket-list">
          {tickets.map(ticket => (
            <li key={ticket.id} className="ticket-card">
              <Link to={`/tickets/${ticket.id}`}>
                <div className="ticket-info">
                  <div>
                    <h2 className="ticket-title">{ticket.titulo}</h2>
                    <p className="ticket-client">Cliente: {ticket.cliente.nome}</p>
                  </div>
                  {/* Adiciona uma classe de status dinâmica para as cores */}
                  <span className={`ticket-status status-${ticket.status}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum ticket encontrado.</p>
      )}
    </div>
  );
}

export default DashboardPage;