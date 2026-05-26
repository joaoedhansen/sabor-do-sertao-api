# Sistema de Gestão - Sabor do Sertão

Projeto desenvolvido para a disciplina de Desenvolvimento Back-end da UNINTER.

O sistema simula a operação de uma rede de fast-food, permitindo gerenciamento de pedidos, produtos, estoque, pagamentos, fidelidade e relatórios através de uma API RESTful.

---

# Autor

João Eduardo Nunes Hansen  
RU: 4728349  
UNINTER

---

# Tecnologias Utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- JWT
- Swagger
- bcryptjs
- Nodemon

---

# Funcionalidades

## Autenticação
- Login com JWT
- Controle de acesso por perfil (RBAC)

## Perfis do Sistema
- CLIENTE
- ATENDENTE
- COZINHA
- GERENTE

## Produtos
- Criar produto
- Listar produtos
- Atualizar produto
- Remover produto

## Estoque
- Controle de estoque por unidade
- Baixa automática ao criar pedido
- Reposição automática ao cancelar pedido

## Pedidos
- Criação de pedidos
- Multicanalidade:
  - APP
  - TOTEM
  - BALCAO
  - PICKUP
  - WEB
- Atualização de status
- Cancelamento inteligente

## Pagamentos
- Mock de gateway de pagamento
- Pagamento aprovado
- Pagamento recusado

## Fidelidade
- Acúmulo automático de pontos

## Dashboard
- Resumo de pedidos
- Total de vendas

## Relatórios
- Relatório de vendas

## Logs
- Auditoria de ações do sistema

---

# Segurança

- Autenticação JWT
- Middleware de autorização
- Proteção de rotas
- Controle de permissões por perfil

---

# Arquitetura

O projeto segue arquitetura em camadas:

- Controllers
- Routes
- Middlewares
- Prisma ORM
- Banco de dados SQLite

---

# Instalação

## 1. Clonar projeto

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2. Instalar dependências

```bash
npm install
```

---

## 3. Configurar variáveis ambiente

Criar arquivo `.env`

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="segredo"
```

---

## 4. Rodar Prisma

```bash
npx prisma db push
```

```bash
npx prisma generate
```

---

## 5. Iniciar servidor

```bash
npm run dev
```

---

# Swagger

Documentação disponível em:

```bash
http://localhost:3000/docs
```

---

# Estrutura do Projeto

```bash
src/
 ├── controllers
 ├── middlewares
 ├── prisma
 ├── routes
 ├── utils
 └── app.js
```

---

# Principais Endpoints

## Auth
- POST `/login`

## Usuários
- POST `/usuario`

## Produtos
- GET `/produtos`
- POST `/produtos`

## Pedidos
- POST `/pedidos`
- GET `/pedidos`
- PATCH `/pedidos/:id/status`

## Pagamentos
- POST `/pagamentos/mock`

## Estoque
- GET `/estoques`

## Dashboard
- GET `/dashboard`

## Relatórios
- GET `/relatorios/vendas`

---

# Requisitos Atendidos

- API RESTful
- Persistência em banco de dados
- Swagger/OpenAPI
- Autenticação JWT
- RBAC
- Controle de estoque
- Fidelidade
- Mock de pagamento
- Relatórios
- Logs de auditoria

---

# Observações

Este projeto foi desenvolvido exclusivamente para fins acadêmicos na disciplina de Desenvolvimento Back-end da UNINTER.