# EcoCampus — Marketplace de Economia Circular do Campus

Projeto desenvolvido para o Desafio Técnico do Processo Seletivo do Laboratório Vortex (UNIFOR) — 2026.

## Sobre o projeto

O EcoCampus é uma plataforma web/mobile que conecta estudantes universitários que querem doar ou vender itens que não usam mais (livros, jalecos, calculadoras, componentes eletrônicos, móveis, etc.) com quem está começando a faculdade e precisa desses materiais. A proposta é reduzir desperdício e o custo de entrada na vida acadêmica através da economia circular dentro do campus.

O sistema é composto por uma API RESTful (backend) e uma interface web responsiva e instalável como PWA (frontend), integradas em uma única aplicação.

## Tecnologias utilizadas

**Backend**
- Python 3
- FastAPI
- Uvicorn (servidor ASGI)
- SQLite (persistência de dados em arquivo)
- Pydantic (validação de dados)

**Frontend**
- React 19
- Vite (build tool e servidor de desenvolvimento)
- CSS puro (sem frameworks de estilo)
- PWA: Web App Manifest + Service Worker (cache offline)

## Funcionalidades implementadas

- [x] API REST com CRUD completo de anúncios (criar, listar, filtrar por categoria, atualizar, deletar)
- [x] Persistência em banco de dados SQLite
- [x] CORS liberado entre frontend e backend
- [x] Landing Page com apresentação da proposta, estatísticas simuladas e vitrine pública
- [x] Filtro de anúncios por categoria
- [x] Formulário de cadastro de novo anúncio (com opção de doação ou venda)
- [x] Integração completa entre frontend e backend (fetch em tempo real)
- [x] Responsividade (desktop e mobile)
- [x] PWA instalável (manifest.json + Service Worker com estratégia de cache)

## Como rodar o projeto localmente

### Pré-requisitos

- [Python 3.10+](https://www.python.org/downloads/)
- [Node.js 18+](https://nodejs.org/) (inclui o `npm`)

### Backend (API)

```bash
cd backend
python -m venv venv

# Ativar o ambiente virtual
venv\Scripts\activate      # Windows
source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
uvicorn main:app --reload
```

A API sobe em `http://127.0.0.1:8000`. A documentação interativa (Swagger UI) fica disponível em `http://127.0.0.1:8000/docs`.

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`.

> Importante: o backend precisa estar rodando para que a Vitrine e o formulário de anúncios funcionem — o frontend consome a API em `http://127.0.0.1:8000`.

## Estrutura do projeto

```
marketplace-campus/
├── backend/
│   ├── main.py              # API FastAPI (rotas + lógica do CRUD)
│   ├── requirements.txt     # dependências Python
│   └── marketplace.db       # banco SQLite (gerado automaticamente)
└── frontend/
    ├── public/
    │   ├── manifest.json    # configuração do PWA
    │   ├── sw.js             # Service Worker
    │   └── icon-*.png        # ícones do app
    └── src/
        ├── components/       # Header, Hero, Sobre, Estatisticas, Vitrine, FormAnuncio, AnuncioCard, Footer
        ├── data/              # dados mock (usados apenas antes da integração com a API)
        └── App.jsx
```

## Diário de Bordo da IA

### 1. Ferramentas utilizadas

Utilizei o **Claude** (Anthropic), no modo Cowork, durante os 5 dias de desenvolvimento — tanto para o backend (FastAPI) quanto para o frontend (React) e a configuração do PWA.

### 2. Estratégia de Engenharia de Prompts

Como estava aprendendo backend e frontend do zero, minha estratégia foi: (1) sempre pedir explicação linha a linha do código antes de aceitar qualquer trecho pronto, e (2) trabalhar em passos pequenos, testando cada mudança antes de seguir pra próxima, em vez de pedir tudo de uma vez. Alguns prompts reais que usei:

> "Estou fazendo o desafio técnico do processo seletivo do VORTEX (UNIFOR) — marketplace de economia circular. [...] Estou aprendendo tudo do zero (nunca fiz backend nem frontend), só sei lógica básica de programação — por isso preciso que você explique cada linha de código, em detalhe, sem nunca só mandar 'cola isso e pronto'. Sempre que pedir pra eu testar algo na tela, me dê o passo a passo bem miudinho [...] não tenho experiência nenhuma com terminal/VS Code ainda."

Esse foi o prompt inicial que usei pra "configurar" como eu queria trabalhar com a IA durante todo o projeto — deixando claro que eu queria entender e digitar o código eu mesmo, não que a IA fizesse por mim.

> "ei voce esta fazendo tudo sozinho???? quem tem que fazer sou eu, me diga tudo oque fez ate agora sozinho"

Usei esse prompt quando percebi que a IA tinha começado a criar arquivos do projeto sozinha, sem eu digitar nada — foi um momento de correção de rumo importante (detalho mais na Reflexão Crítica abaixo).

> [enviando print de erro] "isso mesmo ficou muito apertado" / "nao deu certo"

Ao longo do projeto, sempre que algo dava errado (erro 422 no teste do Swagger, CSS que não aplicava, layout quebrado no mobile), meu processo era testar, tirar print da tela/console, e mandar pra IA analisar — em vez de tentar descrever o erro de memória, o que evitava diagnósticos errados.

### 3. Compartilhamento de Histórico

_(Opcional — adicionar aqui o link do chat, caso deseje compartilhar.)_

### 4. Reflexão Crítica

O momento mais importante de correção de rumo no projeto não foi um erro de código, e sim um erro de **processo**: no início do Dia 2, ao conectar minha pasta do projeto à IA, ela interpretou isso como permissão para criar e editar os arquivos do frontend sozinha (vários componentes React inteiros), sem me consultar — o que ia contra o que eu já tinha pedido desde o início (que eu digitasse o código, com a IA só explicando). Percebi isso ao ver que ela estava chamando ferramentas de edição de arquivo sem eu ter escrito nada, e cobrei explicação imediatamente. A IA reconheceu o erro, desfez todas as mudanças feitas sozinha (apagou os arquivos criados e reverteu a edição do backend) e, a partir daí, passou a apenas explicar o código e esperar eu digitar e salvar, confirmando com prints a cada passo. Esse episódio me fez prestar mais atenção em cada trecho de código gerado, em vez de simplesmente aceitar — o que também teve um efeito colateral bom: mais adiante, quando a IA cometeu um erro técnico de verdade (esqueceu de adicionar a linha `import './App.css'` no `App.jsx`, fazendo todo o CSS da Landing Page parecer que "não funcionava"), eu já estava acompanhando de perto o suficiente pra notar que algo estava errado e pedir a investigação, em vez de simplesmente aceitar a explicação de que era "só falta de estilização".

## Links de produção

_(Preencher se o deploy for realizado — ver seção de deploy.)_

- Backend: —
- Frontend: —
