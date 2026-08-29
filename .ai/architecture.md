# Arquitetura

> **Status**: Consolidado e Aprovado via SDD (/grill-me) — Versão v0  
> **Data da Consolidação**: 2026-08-29  
> **Caminho**: `/home/moisas/projects/archive`

---

## Visão Arquitetural

A arquitetura da **v0** do projeto `archive` adota o paradigma **Jamstack / Single Page Application (SPA)** de alta performance com **Backend-as-a-Service (BaaS) Serverless**.

O frontend é construído com **React 19 + Vite (TypeScript)**, utilizando o **Firebase Firestore** como banco de dados em tempo real para todo o acervo (reviews, fotos, projetos e indicações). Isso permite que novos conteúdos sejam cadastrados e publicados diretamente a partir do navegador **mobile** em tempo real, sem necessidade de recompilar a aplicação nem manter um servidor backend dedicado.

O pipeline de mídia opera com **Cloudinary Direct Upload**, onde o dispositivo móvel envia fotos da câmera ou galeria diretamente para a CDN do Cloudinary, gravando os metadados e o `publicId` no Firestore. A experiência de criação mobile é restrita via **Firebase Auth** persistida no navegador do proprietário.

### Pilares da Arquitetura v0:
1. **Real-time Mobile Publishing**: Criação instantânea de conteúdos (reviews, fotos, projetos) direto do celular via interface mobile otimizada e persistida no Firestore.
2. **Serverless BaaS (Zero-Backend Ops)**: Sem servidores dedicados para manter; o Firestore gerencia persistência e o Firebase Auth garante controle de escrita seguro.
3. **Asset Pipeline Otimizado**: Upload direto de fotos do celular para o Cloudinary CDN com transformações automáticas (`f_auto, q_auto`) e cache global.
4. **Fidelidade Editorial & Monocromática**: Design minimalista e editorial baseado no [UI.md](file:///home/moisas/projects/archive/.ai/UI.md) estruturado em Atomic Design.
5. **Performance Extrema & Deploy Estático**: Frontend distribuído globalmente em Edge CDN (Vercel / Cloudflare Pages).

---

## Stack

- **Linguagem / Runtime**: TypeScript 5.x / Node.js 20+ (Ambiente de desenvolvimento e build).
- **Framework Principal**: **React 19** com **Vite** (SPA moderno, HMR ultrarrápido, primitivos `use()`, `useActionState`, `useTransition`, `useOptimistic` e bundle enxuto).
- **Gerenciador de Pacotes**: `pnpm` (rápido, determinístico e eficiente em espaço de disco).
- **Roteamento**: `react-router-dom` v6+.
- **Banco de Dados & BaaS**: **Firebase Firestore** (leitura pública em tempo real / escrita restrita ao proprietário).
- **Autenticação**: **Firebase Auth** (sessão persistente no mobile para acesso à área de criação).
- **Mídia & CDN**: **Cloudinary** (upload direto do mobile via unsigned preset, transformações dinâmicas e CDN global).
- **Cliente HTTP**: `axios` configurado em `src/api/axiosClient.ts` para integrações HTTP (Cloudinary REST API, etc.).
- **Formulários & Validação**: `react-hook-form` com `@hookform/resolvers/zod` e schemas de validação Zod.
- **Gerenciamento de Estado**: `zustand` (gerenciamento leve de busca, filtros de tags e ordenação em memória).
- **Estilização e UI**: `Tailwind CSS` (tokens da paleta monocromática de `UI.md`) + `lucide-react` (ícones lineares) + componentes `shadcn/ui` (Radix UI) integrados na hierarquia Atomic Design.
- **Testes & Qualidade**: **Vitest** + **React Testing Library** (suíte isolada em `src/__tests__/`) + **ESLint** + **Prettier**.

---

## Estrutura do Projeto (Atomic Design Híbrido)

```text
/home/moisas/projects/archive/
├── .ai/
│   ├── context.md               # Contexto funcional, requisitos e domínio
│   ├── architecture.md          # Especificação arquitetural consolidada (v0)
│   ├── design.md                # Convenções de código, Atomic Design e regras para IA
│   └── UI.md                    # Especificação visual, estética editorial/monocromática
├── public/                      # Assets estáticos públicos (favicon, manifest, fontes)
├── src/
│   ├── __tests__/               # Suíte de testes isolada espelhando a árvore de src/
│   │   ├── components/          # Testes de componentes (atoms, molecules, organisms)
│   │   ├── hooks/               # Testes de hooks customizados
│   │   ├── services/            # Testes de serviços
│   │   ├── schemas/             # Testes de validação de schemas
│   │   └── pages/               # Testes de páginas
│   ├── api/                     # Cliente HTTP Axios, endpoints e Cloudinary API
│   │   ├── axiosClient.ts
│   │   └── endpoints.ts
│   ├── assets/                  # Estilos globais e fontes
│   ├── components/              # Hierarquia Atomic Design (Shadcn + Custom Editorial)
│   │   ├── atoms/               # Button, Input, Textarea, Badge, Text, Skeleton, Separator, Image
│   │   ├── molecules/           # FormField, SearchInput, FilterPill, TagGroup, SelectField, ImageUploader
│   │   ├── organisms/           # Header, Footer, ReviewCard, ReviewHero, ReviewGrid, CreateReviewSheet/Modal
│   │   └── templates/           # MainLayout, EditorialLayout, DetailLayout, AdminLayout
│   ├── hooks/                   # Custom Hooks (useReviews, useEditorialMedia, useAuth, useReviewMutation)
│   ├── services/                # Camada de serviços puros
│   │   ├── firebase.service.ts  # Inicialização do Firebase App, Firestore e Auth
│   │   ├── auth.service.ts      # Login, Logout e verificação de sessão do proprietário
│   │   ├── review.service.ts    # CRUD de reviews e itens no Firestore
│   │   └── media.service.ts     # Upload direto de imagem para Cloudinary e composição de URLs
│   ├── schemas/                 # Schemas Zod e tipagens inferidas
│   │   ├── review.schema.ts
│   │   ├── create-item.schema.ts
│   │   └── utils/               # Schema utils (field-builders.ts, error-formatters.ts)
│   ├── enums/                   # Enums `as const`, arrays de opções estáticas e dicionários de metadados
│   │   ├── category.enum.ts     # Categorias (Filmes, Livros, Fotos, Projetos, etc.)
│   │   └── status.enum.ts
│   ├── types/                   # Tipagens TypeScript, DTOs de API e contratos
│   │   ├── api/                 # Request/Response DTOs, ApiError
│   │   └── domain/              # Modelos de domínio (Review, Photo, Project, Media)
│   ├── stores/                  # Stores Zustand (filterStore, searchStore, uiStore)
│   ├── pages/                   # Páginas da aplicação (HomePage, ArchivePage, DetailPage, CreatePage, LoginPage)
│   ├── routes/                  # Configuração do React Router com Route Guards
│   ├── App.tsx                  # Root component com provedores de rota, auth e tema
│   └── main.tsx                 # Entrypoint da aplicação React
├── index.html                   # Entrypoint HTML do Vite
├── tailwind.config.ts           # Configuração de tokens monocromáticos e tipografia
├── tsconfig.json                # Configurações do compilador TypeScript
├── vite.config.ts               # Configuração do Vite e Vitest
└── package.json                 # Dependências e scripts do projeto (pnpm)
```

---

## Módulos

- **Módulo de Acervo & Catálogo (Firestore Content Module)**: Responsável por consultar a coleção `items` no Firestore com paginação, filtros por categoria/tags e ordenação temporal.
- **Módulo de Mídia (Media & Cloudinary Services)**: Responsável por gerenciar o upload direto de fotos a partir do celular para o Cloudinary, aplicar transformações responsivas (`f_auto, q_auto, w_xxx`) e gerar placeholders monocromáticos.
- **Módulo de Criação & Publicação Mobile (Mobile Studio)**: Interface mobile-first (Sheet/Drawer ou Rota `/create`) com formulário em React Hook Form + Zod, permitindo ao usuário tirar fotos com a câmera do celular, preencher título/review/categoria e publicar instantaneamente.
- **Módulo de Autenticação & Segurança (Auth Module)**: Gerencia o login do proprietário via Firebase Auth, garantindo que apenas ele tenha permissão de gravação no Firestore via Security Rules.

---

## Componentes

- **`<EditorialImage />`** *(Atom/Molecule)*: Renderiza imagens do Cloudinary com lazy loading nativo, blur monocromático e fallback visual resiliente.
- **`<ImageUploader />`** *(Molecule)*: Seletor de arquivos e captura de câmera mobile com preview imediato, barra de progresso de upload para Cloudinary e compressão local.
- **`<CreateReviewSheet />`** *(Organism)*: Drawer/Sheet mobile com o formulário de cadastro rápido de reviews, fotos e indicações com suporte a React 19 `useTransition` e `useOptimistic`.
- **`<ReviewHero />`** *(Organism)*: Cabeçalho visual imersivo de reviews com título display, metadados discretos e imagem principal integrada ao layout.
- **`<ReviewFilter />`** *(Molecule/Organism)*: Interface minimalista de seleção de categorias e tags alimentada por `CATEGORY_OPTIONS` de `src/enums/`.
- **`<Header />` & `<Footer />`** *(Organisms)*: Elementos estruturais minimalistas com espaço negativo generoso e atalho discreto para a área de criação mobile quando autenticado.

---

## Camadas

- **Camada de Apresentação (Atomic Design UI)**: Componentes React (`atoms`, `molecules`, `organisms`, `templates`) estilizados com Tailwind CSS e Radix UI, respeitando as diretrizes de [UI.md](file:///home/moisas/projects/archive/.ai/UI.md).
- **Camada de Estado e Hooks (State & Custom Hooks)**: Hooks customizados (`useReviews`, `useAuth`, `useReviewMutation`, `useEditorialMedia`) que integram primitivos do React 19 com Services e Zustand.
- **Camada de Serviços (Services)**: Módulos assíncronos puros (`firebase.service.ts`, `auth.service.ts`, `review.service.ts`, `media.service.ts`).
- **Camada de Contratos & Validação (Schemas, Enums & Types)**: Schemas Zod, `field-builders`, interfaces DTO e enums `as const`.

---

## Fluxo da Aplicação

### 1. Ciclo de Leitura Pública (Qualquer visitante):
```text
Visitante acessa a URL
       ↓
Edge CDN entrega SPA estático
       ↓
React inicializa e useReviews() consulta Firestore
       ↓
Firestore retorna documentos do acervo
       ↓
Componentes requisitam imagens otimizadas ao Cloudinary CDN
```

### 2. Ciclo de Criação Mobile (Proprietário):
```text
Proprietário abre o site no celular (sessão ativa no localStorage)
       ↓
Toca no atalho discreto /create ou gesto no logo
       ↓
Abre a interface de criação rápida (<CreateReviewSheet />)
       ↓
Tira foto da câmera ou escolhe da galeria
       ↓
media.service.ts faz upload direto para o Cloudinary (retorna publicId)
       ↓
review.service.ts grava o documento com schema Zod validado no Firestore
       ↓
Item entra no acervo público em tempo real
```

---

## Segurança & Regras do Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /items/{itemId} {
      allow read: if true; // Leitura pública irrestrita
      allow write: if request.auth != null; // Escrita restrita ao proprietário autenticado
    }
  }
}
```

---

## Decisões Arquiteturais

### ADR-001: Adoção de SPA React 19 + Firebase Firestore para Publicação Mobile em Tempo Real
- **Contexto**: O proprietário necessita cadastrar reviews, fotos e indicações em tempo real a partir de seu celular, sem complexidade de infraestrutura de backend.
- **Decisão**: Utilizar o Firebase Firestore como banco de dados em tempo real com leitura pública e escrita autenticada via Firebase Auth.
- **Consequências**: Elimina a necessidade de rebuilds estáticos a cada post, permitindo publicação instantânea em mobile com custo zero de infraestrutura na v0.

### ADR-002: Upload Direto para Cloudinary via Mobile Frontend
- **Contexto**: A UI editorial depende de imagens em alta resolução com entrega ultrarrápida em WebP/AVIF.
- **Decisão**: O upload das fotos tiradas no celular é feito diretamente para o Cloudinary via API REST/unsigned preset, armazenando apenas o `publicId` no Firestore.
- **Consequências**: Otimização automática de mídia e isolamento total de arquivos pesados fora do banco de dados.

### ADR-003: Isolamento Centralizado de Testes em src/__tests__/ e Código 100% Autodocumentado
- **Contexto**: A manutenção da clareza visual nas pastas de componentes do Atomic Design e a disciplina de Clean Code exigem separação entre arquivos de produção e artefatos de teste, além de código sem ruído visual.
- **Decisão**: Todos os testes da aplicação residem exclusivamente em `src/__tests__/` (espelhando a árvore de pastas de `src/`). Todo o código-fonte de componentes, hooks e lógica deve ser estritamente livre de comentários (inline ou JSX), mantendo-se 100% autodocumentado com nomenclatura semântica e TypeScript estrito.
- **Consequências**: Pastas de componentes mais enxutas, sem poluição de arquivos de teste misturados à implementação, e código mais legível e autoexplicativo.

### ADR-004: Estratégia Git Flow para Specs (Origem em main, PR para develop via GitHub MCP)
- **Contexto**: Para garantir isolamento de features, rastreabilidade e integração contínua segura, é necessário um padrão de ciclo de vida de branches para cada especificação de engenharia.
- **Decisão**: Toda nova spec/feature inicia obrigatoriamente a partir da branch `main` atualizada, no formato `feature/spec-{id}-{slug}`. Ao término do desenvolvimento e aprovação no quality gate local (`test:run`, `typecheck`, `lint`, `build`), é aberto automaticamente um Pull Request via GitHub MCP direcionado para a branch `develop`.
- **Consequências**: Histórico limpo, branches de spec consistentes com o estado de produção, e integração segura no ambiente de staging/develop antes de qualquer release para `main`.

---

## Pontos Pendentes

### Lacunas e Dúvidas a Esclarecer
- [x] ~~Definição do Framework do Frontend (Vite + React 19 SPA)~~
- [x] ~~Definição da Camada de Dados (Firebase Firestore em tempo real)~~
- [x] ~~Definição da Autenticação e Criação Mobile (Firebase Auth + Sessão Persistente)~~
- [x] ~~Definição do Upload de Mídia Mobile (Cloudinary Direct Upload)~~
- [x] ~~Definição do Design System e Atomic Design (Tailwind CSS + Shadcn Monocromático)~~

