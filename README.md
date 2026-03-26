# HomeExpenseControl

Sistema de controle de gastos residenciais.
Apesar do nome ser HomeExpenseControl, o app em si foi nomeado posteriormente para DespesaFácil, pois é mais atrativo.

## Visao geral

Este repositorio possui dois projetos principais:

- `front/`: aplicacao web em React + TypeScript
- `webApi/`: API em ASP.NET Core com arquitetura em camadas (`Web`, `Application`, `Domain`)

## Requisitos

Para rodar o projeto localmente, voce vai precisar de:

- Node.js (versao atual LTS recomendada)
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

### Localizacao do Front

- `front/`

### Variaveis de ambiente

Crie (ou ajuste) o arquivo `front/.env`:

```env
VITE_API_BASE_URL=https://localhost:7088
```

Se essa variavel nao existir, o frontend usa `http://localhost:8080` como fallback.

### Instalar dependencias

```bash
cd front
pnpm install
```

### Rodar em desenvolvimento

```bash
pnpm dev
```

Endereco padrao: `http://localhost:5173`

## Backend (.NET)

### Localizacao da API

- `webApi/`

### Configurar conexao com banco

A API usa PostgreSQL via `DefaultConnection`.

Voce pode configurar de duas formas:

1. Em `webApi/Web/appsettings.json`:

```json
"ConnectionStrings": {
 "DefaultConnection": "Host=localhost;Port=5432;Database=homeexpensecontrol;Username=postgres;Password=sua_senha"
}
```

2.Ou através das User Secrets (forma que eu optei) no projeto `Web` (recomendado para nãoo expor credenciais):

### Aplicar migrations

No repositorio existem migrations no projeto `Domain`.
Rodar migrations, pois são necessárias para o correto funcionamento.

URLs configuradas no ambiente de desenvolvimento:

- `https://localhost:7088`
- `http://localhost:5265`

Swagger (desenvolvimento):

- `https://localhost:7088/swagger`

## Recomendações

1. Suba o PostgreSQL e configure a `DefaultConnection` no backend.
2. Execute as migrations.
3. Inicie a API (`dotnet run` em `webApi/Web`).
4. Ajuste `VITE_API_BASE_URL` no `front/.env` para a URL da API.
5. Inicie o frontend (`pnpm dev` em `front`).
6. Acesse a aplicacao em `http://localhost:5173`.

Resumo:

- CRUD de pessoas
- Cadastro e listagem de categorias
- Cadastro e listagem de transacoes
- Totais por pessoa
- Totais por categoria
