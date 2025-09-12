<div align="center">

  # 📚 University Library

  Um sistema de biblioteca universitária desenvolvido com Next.js 15, permitindo que estudantes visualizem, pesquisem e emprestem livros de forma digital.

  ![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-316192?style=for-the-badge&logo=postgresql&logoColor=white)
  ![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
  ![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
  ![Upstash](https://img.shields.io/badge/Upstash-34D399?style=for-the-badge&logo=upstash&logoColor=white)

</div>


## ✨ Funcionalidades

- **Autenticação de usuários** com NextAuth.js
- **Catálogo de livros** com sistema de busca e filtros
- **Sistema de empréstimos** com controle de devolução
- **Painel administrativo** para gerenciar livros e usuários
- **Upload de imagens** com ImageKit
- **Sistema de aprovação** de novos usuários
- **Rate limiting** para proteção da API
- **Workflows automatizados** com Upstash Workflow

## ️ Estrutura do Projeto

```
university-library/
├── app/                    # App Router do Next.js
│   ├── (auth)/            # Rotas de autenticação
│   ├── (root)/            # Rotas principais
│   ├── admin/             # Painel administrativo
│   └── api/               # API routes
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI reutilizáveis
│   └── admin/            # Componentes específicos do admin
├── database/             # Configuração do banco de dados
│   ├── schema.ts         # Schema das tabelas
│   └── drizzle.ts        # Configuração do Drizzle
├── lib/                  # Utilitários e configurações
│   ├── actions/          # Server Actions
│   └── validations.ts    # Schemas de validação com Zod
└── migrations/           # Migrações do banco de dados
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Neon (PostgreSQL)
- Conta no ImageKit
- Conta no Upstash (Redis)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/marquesmaycon/university-library
cd university-library
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Preencha as seguintes variáveis no `.env.local`:
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your-public-key"
IMAGEKIT_PRIVATE_KEY="your-private-key"
IMAGEKIT_URL_ENDPOINT="your-url-endpoint"

# Upstash Redis
UPSTASH_REDIS_REST_URL="your-redis-url"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"
```

4. Execute as migrações do banco de dados:
```bash
npm run db:migrate
```

5. (Opcional) Execute o seed do banco de dados:
```bash
npm run db:seed
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📊 Schema do Banco de Dados

### Tabelas Principais

- **users** - Informações dos usuários (estudantes e administradores)
- **books** - Catálogo de livros disponíveis
- **borrow_records** - Registros de empréstimos

### Relacionamentos

- Um usuário pode ter múltiplos empréstimos
- Um livro pode ser emprestado por múltiplos usuários
- Sistema de controle de cópias disponíveis

##  Tipos de Usuário

### Estudante
- Visualizar catálogo de livros
- Pesquisar e filtrar livros
- Solicitar empréstimos
- Visualizar histórico de empréstimos

### Administrador
- Todas as funcionalidades do estudante
- Gerenciar catálogo de livros
- Aprovar/rejeitar usuários
- Visualizar relatórios

## 🔐 Sistema de Autenticação

- Registro com ID universitário obrigatório
- Sistema de aprovação manual de novos usuários
- Autenticação baseada em JWT
- Proteção de rotas por role (USER/ADMIN)

## 📱 Design Responsivo

O projeto foi desenvolvido com design responsivo, funcionando perfeitamente em:
- Desktop
- Tablet
- Mobile

## 👨‍💻 Autor

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>
  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
  [![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)

  ### Feito com ❤️ e muita 🎵
</div>