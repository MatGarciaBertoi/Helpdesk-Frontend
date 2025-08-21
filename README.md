# ResolveDesk - Interface do Sistema de Help Desk

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/axios-purple?style=for-the-badge&logo=axios)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

Este é o repositório do frontend para a aplicação **ResolveDesk**, um sistema de gerenciamento de tickets de suporte (Help Desk) construído com React. Esta interface consome uma API RESTful robusta construída em Java com Spring Boot.

Este projeto foi desenvolvido como um estudo de caso completo de uma aplicação Full Stack, cobrindo desde a autenticação de usuários até a interação em tempo real com os chamados.

##  Funcionalidades Principais

* **Autenticação Segura:** Tela de login que se comunica com o backend para autenticar usuários.
* **Gerenciamento de Estado:** Utiliza React Context API para manter o estado de autenticação persistente em toda a aplicação.
* **Roteamento Protegido:** Implementa rotas privadas que só podem ser acessadas por usuários autenticados.
* **Painel de Controle (Dashboard):** Tela principal onde técnicos podem visualizar todos os tickets abertos no sistema.
* **Visualização de Detalhes:** Página dedicada para exibir todas as informações de um ticket específico, incluindo seu histórico de comentários.
* **Interatividade Completa:**
    * Adição de novos comentários a um ticket.
    * Atualização do status de um ticket (Aberto, Em Andamento, Fechado).
    * Atribuição de um ticket a um técnico.
* **Segurança por Perfil:** A interface se adapta e permite ações com base no perfil do usuário logado (Cliente, Técnico, Administrador), consumindo as regras de negócio da API.

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

* **React:** Biblioteca principal para a construção da interface de usuário.
* **Vite:** Ferramenta de build moderna e ultra-rápida para o ambiente de desenvolvimento.
* **React Router Dom:** Para gerenciamento de rotas e navegação (Single-Page Application).
* **Axios:** Cliente HTTP para realizar as chamadas para a API backend.
* **CSS Puro:** Para a estilização dos componentes, seguindo uma abordagem modular.

##  Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o frontend na sua máquina.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* `npm` (geralmente instalado junto com o Node.js)
* A **API do ResolveDesk (backend)** deve estar em execução para que o login e a busca de dados funcionem.

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/helpdesk-frontend.git](https://github.com/seu-usuario/helpdesk-frontend.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd helpdesk-frontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Abra o navegador:** A aplicação estará disponível em `http://localhost:5173`.


* Refatorar a estilização com um framework como Tailwind CSS.
* Escrever testes automatizados com Jest e React Testing Library.


