# CloudVault

CloudVault é uma aplicação de gerenciamento de arquivos baseada na nuvem, projetada para fornecer aos usuários uma maneira eficiente, segura e intuitiva de armazenar, organizar e acessar seus dados. Inspirado em plataformas como Dropbox, o CloudVault permite navegar, criar pastas e fazer upload/download de arquivos com facilidade.

## Principais Funcionalidades

- **Explorador de Arquivos:** Navegação entre diretórios no estilo "/home/<pasta>/<subpasta>" com URLs dinâmicas.
- **Gerenciamento de Arquivos:** Upload, download e organização de arquivos e pastas.
- **Armazenamento Seguro:** Integração com AWS S3 para armazenar arquivos na nuvem de forma segura.
- **Interface Intuitiva:** Design simples e responsivo para facilitar a experiência do usuário.

## Tecnologias Utilizadas

### Frontend

- **Next.js 15:** Framework React para renderização do lado do servidor e URLs dinâmicas.
- **TypeScript:** Tipagem estática para maior segurança e produtividade no desenvolvimento.
- **Tailwind CSS:** Estilização moderna e eficiente para criar interfaces responsivas.

### Backend

- **Node.js com Fastify:** API para gerenciamento de autenticação e manipulação de arquivos.
- **Prisma ORM:** Interação eficiente e tipada com o banco de dados.
- **Banco de Dados Relacional:** PostgreSQL para armazenar metadados de arquivos e usuários.

### Infraestrutura

- **AWS S3:** Armazenamento de arquivos na nuvem.
- **AWS SQS:** Tecnologia de fila.
- **Docker Compose:** Orquestração para rodar serviços localmente.
- **PassportJs:** Gerenciamento de autenticação com suporte a provedores OAuth.

## Como Rodar o Projeto Localmente

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (versão 18+)
- Docker e Docker Compose

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/MikaelMarceniuk/CloudVault
   cd cloudvault
   ```

2. Configure as variáveis de ambiente:

   - Duplique o arquivo .env.example e renomeie para `.env`

3. Instale as dependências:

   ```bash
   yarn install
   ```

4. Suba os serviços com Docker Compose:

   ```bash
   docker compose up
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Roadmap Futuro

- Implementação de compartilhamento de arquivos entre usuários.
- Sistema de notificações.

---
