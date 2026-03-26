# HomeExpenseControl

Sistema de controle de gastos residenciais.
Apesar do nome do repositório ser HomeExpenseControl, a aplicação foi posteriormente renomeada para DespesaFácil por ser um nome mais atrativo.

## Visão geral

Este repositório possui dois projetos principais:

- `front/`: aplicação web em React + TypeScript
- `webApi/`: API em ASP.NET Core com arquitetura em camadas (`Web`, `Application`, `Domain`)

## Requisitos

Para rodar o projeto localmente, você vai precisar de:

- Node.js (versão LTS recomendada)
- pnpm
- .NET SDK 10.0
- PostgreSQL

## Estrutura do projeto

```text
HomeExpenseControl/
|- front/      # Frontend React
|- webApi/     # Backend .NET
|- README.md   # Instruções sobre a aplicação
```

## Frontend (React)

### Localização

- `front/`

### Variáveis de ambiente

Crie (ou ajuste) o arquivo `front/.env`:

```env
VITE_API_BASE_URL=https://localhost:7088
```

Se essa variável não existir, o frontend usa `http://localhost:8080` como fallback.

### Instalar dependências

```bash
cd front
pnpm install
```

### Rodar em desenvolvimento

```bash
pnpm dev
```

Endereço padrão: `http://localhost:5173`

## Backend (.NET)

### Localização da API

- `webApi/`

### Configurar conexão com o banco

A API usa PostgreSQL via `DefaultConnection`.

Você pode configurar de duas formas:

1. Em `webApi/Web/appsettings.json`:

```json
"ConnectionStrings": {
"DefaultConnection": "Host=localhost;Port=5432;Database=homeexpensecontrol;Username=postgres;Password=sua_senha"
}
```

2.Ou através das User Secrets (recomendado para não expor credenciais):

```bash
cd webApi/Web
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=homeexpensecontrol;Username=postgres;Password=sua_senha"
```

### Aplicar migrations

No repositório existem migrations no projeto `Domain`. Execute as migrations antes de rodar a API:

```bash
cd webApi
dotnet ef database update --project Domain --startup-project Web
```

### Rodar a API

```bash
cd webApi/Web
dotnet run
```

URLs configuradas no ambiente de desenvolvimento:

- `https://localhost:7088`
- `http://localhost:5265`

Swagger (apenas em desenvolvimento):

- `https://localhost:7088/swagger`

## Recomendações

1. Suba o PostgreSQL e configure a `DefaultConnection` no backend.
2. Execute as migrations.
3. Inicie a API (`dotnet run` em `webApi/Web`).
4. Ajuste `VITE_API_BASE_URL` no `front/.env` para a URL da API.
5. Inicie o frontend (`pnpm dev` em `front`).
6. Acesse a aplicação em `http://localhost:5173`.
7. Para motivos de depuração use o Swagger que estará na rota da api/swagger/index.html ou o tanstack query dev tools

## Resumo das funcionalidades

- CRUD de pessoas
- Cadastro e listagem de categorias
- Cadastro e listagem de transações
- Totais por pessoa
- Totais por categoria
