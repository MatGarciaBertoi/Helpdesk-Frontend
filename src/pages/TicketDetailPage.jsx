import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import './TicketDetail.css';

function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Função para buscar os dados da API
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [ticketResponse, commentsResponse] = await Promise.all([
        axios.get(`/tickets/${id}`),
        axios.get(`/tickets/${id}/comentarios`)
      ]);
      setTicket(ticketResponse.data);
      setComments(commentsResponse.data);
      setError('');
    } catch (err) {
      setError('Não foi possível carregar os detalhes do ticket.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // useEffect para chamar a função fetchData quando o componente montar
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Função para lidar com o envio de um novo comentário
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    try {
      await axios.post(`/tickets/${id}/comentarios`, {
        texto: newCommentText
      });
      toast.success('Comentário adicionado com sucesso!'); // Notificação de sucesso
      setNewCommentText('');
      fetchData();
    } catch (err) {
      toast.error('Não foi possível adicionar o comentário.'); // Notificação de erro
      console.error(err);
    }
  };

  // Função para lidar com a mudança de status
  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`/tickets/${id}`, {
        status: newStatus
      });
      toast.success('Status atualizado com sucesso!'); // Notificação de sucesso
      fetchData();
    } catch (err) {
      // Tenta pegar a mensagem de erro específica do backend, se não, usa uma genérica.
      toast.error(err.response?.data?.message || 'Não foi possível atualizar o status.'); // Notificação de erro
      console.error(err);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!ticket) return <div>Ticket não encontrado.</div>;

  return (
    <div className="ticket-detail-container">
      <div className="ticket-header">
        <h1>{ticket.titulo} (Ticket #{ticket.id})</h1>
        <div className="ticket-meta">
          <div className="ticket-meta-item">
            <strong>Cliente:</strong> {ticket.cliente.nome}
          </div>
          <div className="ticket-meta-item">
            <strong>Prioridade:</strong> {ticket.prioridade}
          </div>
          <div className="ticket-meta-item">
            <strong>Data de Abertura:</strong> {new Date(ticket.dataAbertura).toLocaleString()}
          </div>
          <div className="ticket-meta-item">
            <strong>Status:</strong>
            <select
              value={ticket.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="status-select"
            >
              <option value="ABERTO">Aberto</option>
              <option value="EM_ANDAMENTO">Em Andamento</option>
              <option value="FECHADO">Fechado</option>
            </select>
          </div>
        </div>
      </div>

      <div className="ticket-section">
        <h3>Descrição</h3>
        <p>{ticket.descricao}</p>
      </div>

      <div className="ticket-section">
        <h3>Comentários</h3>
        {comments.length > 0 ? (
          <ul className="comments-list">
            {comments.map(comment => (
              <li key={comment.id} className="comment-item">
                <p className="comment-header">
                  {comment.autor.nome}
                  <span>em {new Date(comment.dataCriacao).toLocaleString()}</span>
                </p>
                <p className="comment-body">{comment.texto}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum comentário neste ticket.</p>
        )}
      </div>
      
      <form onSubmit={handleCommentSubmit} className="new-comment-form">
        <h3>Adicionar um novo comentário</h3>
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Digite sua mensagem aqui..."
          rows="4"
        />
        <button type="submit">Enviar Comentário</button>
      </form>
    </div>
  );
}

export default TicketDetailPage;