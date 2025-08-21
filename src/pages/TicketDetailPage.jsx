import React, { useState, useEffect, useCallback } from 'react'; // 1. Adicione useCallback
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function TicketDetailPage() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estado para o novo comentário que o usuário está digitando
  const [newCommentText, setNewCommentText] = useState('');

  // useCallback para memorizar a função e evitar recriações desnecessárias
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
  }, [id]); // Depende do ID da URL

  // useEffect para buscar os dados quando o componente carregar
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Função para lidar com o envio de um novo comentário
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return; // Não envia comentários vazios

    try {
      await axios.post(`/tickets/${id}/comentarios`, {
        texto: newCommentText
      });
      setNewCommentText(''); // Limpa o campo de texto
      fetchData(); // Busca os dados novamente para mostrar o novo comentário
    } catch (err) {
      alert('Não foi possível adicionar o comentário.');
      console.error(err);
    }
  };

  // Função para lidar com a mudança de status
  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`/tickets/${id}`, {
        status: newStatus
      });
      fetchData(); // Busca os dados novamente para mostrar o status atualizado
    } catch (err) {
      alert('Não foi possível atualizar o status.');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!ticket) {
    return <div>Ticket não encontrado.</div>;
  }

  return (
    <div>
      <Link to="/dashboard">Voltar ao Painel</Link>
      
      <h1>{ticket.titulo} (Ticket #{ticket.id})</h1>
      <p><strong>Cliente:</strong> {ticket.cliente.nome}</p>
      
      <div>
        <strong>Status:</strong>
        {/* Menu para mudar o status */}
        <select value={ticket.status} onChange={(e) => handleStatusChange(e.target.value)}>
          <option value="ABERTO">Aberto</option>
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="FECHADO">Fechado</option>
        </select>
      </div>

      <p><strong>Prioridade:</strong> {ticket.prioridade}</p>
      <p><strong>Data de Abertura:</strong> {new Date(ticket.dataAbertura).toLocaleString()}</p>
      
      <hr />
      <h3>Descrição</h3>
      <p>{ticket.descricao}</p>
      <hr />

      <h3>Comentários</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <p><strong>{comment.autor.nome}</strong> em {new Date(comment.dataCriacao).toLocaleString()}</p>
              <p>{comment.texto}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum comentário neste ticket.</p>
      )}

      {/* Formulário para adicionar um novo comentário */}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Adicione um novo comentário..."
          rows="4"
          style={{ width: '100%', marginTop: '1rem' }}
        />
        <button type="submit">Enviar Comentário</button>
      </form>
    </div>
  );
}

export default TicketDetailPage;