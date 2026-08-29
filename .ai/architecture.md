# Arquitetura

> **Status**: Consolidado e Aprovado via SDD (/grill-me) — Versão v0  
> **Data da Consolidação**: 2026-08-29  
> **Caminho**: `/home/moisas/projects/archive`

---

## Visão Arquitetural

A arquitetura da **v0** do projeto `archive` adota o paradigma **Jamstack / Single Page Application (SPA)** de alta performance com **Backend-as-a-Service (BaaS) Serverless** unificado no ecossistema **Firebase**.

O frontend é construído com **React 19 + Vite (TypeScript)**, utilizando o **Firebase Firestore** como banco de dados em tempo real para todo o acervo (reviews, fotos, projetos e indicações). Isso permite que novos conteúdos sejam cadastrados e publicados diretamente a partir do navegador **mobile** em tempo real, sem necessidade de recompilar a aplicação nem manter um servidor backend dedicado.

O pipeline de mídia opera diretamente com o **Firebase Storage**, onde o dispositivo móvel envia fotos da câmera ou galeria diretamente para os buckets categorizados (`items/places/` e `items/photos/`), gravando o download URL e o `publicId` (caminho do storage) no Firestore. A experiência de criação mobile é restrita via **Firebase Auth** persistida no navegador do proprietário.

### Pilares da Arquitetura v0:
1. **Real-time Mobile Publishing**: Criação instantânea de conteúdos (reviews, fotos, projetos) direto do celular via interface mobile otimizada e persistida no Firestore.
2. **Serverless BaaS Unificado (Zero-Backend Ops)**: Sem servidores dedicados para manter; o Firestore gerencia persistência, o Firebase Storage armazena mídias categorizadas e o Firebase Auth garante controle de escrita seguro em uma única stack coesa.
3. **Asset Pipeline Direto**: Upload direto de fotos do celular para o Firebase Storage com acompanhamento de progresso percentual e URLs públicas de alta disponibilidade.
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
- **Mídia & Storage**: **Firebase Storage** (upload direto do mobile via SDK resumable, pastas por categoria `items/places/` e `items/photos/`).
- **Cliente HTTP**: `axios` configurado em `src/api/axiosClient.ts` para integrações HTTP utilitárias.
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
│   ├── api/                     # Cliente HTTP Axios e rotas
│   │   ├── axiosClient.ts
│   │   └── endpoints.ts
│   ├── assets/                  # Estilos globais e fontes
│   ├── components/              # Hierarquia Atomic Design (Shadcn + Custom Editorial)
│   │   ├── atoms/               # Button, Input, Textarea, Badge, Text, Skeleton, Separator, Image, Spinner
│   │   ├── molecules/           # FormField, SearchInput, FilterPill, TagGroup, SelectField, ImageUploader, AuthGuardCard
│   │   ├── organisms/           # Header, Footer, ReviewCard, ReviewHero, ReviewPreviewCard, CreateItemForm
│   │   └── templates/           # MainLayout, EditorialLayout, DetailLayout, CreateLayout
│   ├── hooks/                   # Custom Hooks (useReviews, useAuth, useReviewMutation, useMediaUpload)
│   ├── services/                # Camada de serviços puros
│   │   ├── firebase.service.ts  # Inicialização do Firebase App, Firestore, Auth e Storage
│   │   ├── auth.service.ts      # Login, Logout e verificação de sessão do proprietário
│   │   ├── review.service.ts    # CRUD de reviews e itens no Firestore
│   │   └── media.service.ts     # Upload direto de imagem para o Firebase Storage
│   ├── schemas/                 # Schemas Zod e tipagens inferidas
│   │   ├── create-item.schema.ts
│   │   ├── auth.schema.ts
│   │   └── utils/               # Schema utils (field-builders.ts, error-formatters.ts)
│   ├── enums/                   # Enums `as const`, arrays de opções estáticas e dicionários de metadados
│   │   ├── category.enum.ts     # Categorias (Lugares, Fotos, Projetos)
│   │   └── status.enum.ts
│   ├── types/                   # Tipagens TypeScript, DTOs de API e contratos
│   │   ├── api/                 # Request/Response DTOs, ApiError
│   │   └── domain/              # Modelos de domínio (Item, Media, Auth)
│   ├── stores/                  # Stores Zustand (filterStore, searchStore, uiStore)
│   ├── pages/                   # Páginas da aplicação (HomePage, CreatePage)
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
- **Módulo de Mídia (Firebase Storage Service)**: Responsável por gerenciar o upload direto e resumível de fotos da câmera/galeria para o Firebase Storage (`items/places/`, `items/photos/`), emitindo progresso em tempo real e fornecendo URLs públicas resilientes.
- **Módulo de Criação & Publicação Mobile (Mobile Studio)**: Interface mobile-first na rota `/create` com formulário em React Hook Form + Zod, permitindo ao usuário tirar fotos, escolher a categoria (Lugares ou Fotos), preencher dados dinamicamente e publicar instantaneamente.
- **Módulo de Autenticação & Segurança (Auth Module)**: Gerencia o login do proprietário via Firebase Auth, garantindo que apenas ele tenha permissão de gravação no Firestore e Firebase Storage via Security Rules.

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
Imagens são carregadas a partir das URLs públicas do Firebase Storage
```

### 2. Ciclo de Criação Mobile (Proprietário):
```text
Proprietário acessa a rota /create no celular (sessão ativa Firebase Auth)
       ↓
Abre a interface de criação rápida (<CreateItemForm />)
       ↓
Seleciona categoria: Lugares & Experiências (completo) ou Fotografia (modo minimalista de imagem)
       ↓
Tira foto da câmera ou seleciona da galeria
       ↓
media.service.ts faz upload direto para o Firebase Storage com progresso (retorna downloadUrl e storagePath)
       ↓
review.service.ts grava o documento com schema Zod validado no Firestore
       ↓
Item entra no acervo público em tempo real
```

---

## Segurança & Regras do Firebase

### Firestore Security Rules:
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

### Firebase Storage Security Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /items/{allPaths=**} {
      allow read: if true; // Leitura pública irrestrita das imagens do acervo
      allow write: if request.auth != null; // Upload restrito ao proprietário autenticado
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

### ADR-002: Upload Direto e Unificado para o Firebase Storage
- **Contexto**: Para simplificar a infraestrutura, centralizar credenciais e reduzir dependências externas, toda a stack de dados, auth e mídia foi unificada no ecossistema Firebase.
- **Decisão**: O upload das fotos tiradas no celular é feito diretamente para o Firebase Storage via SDK oficial (`uploadBytesResumable`), organizando as fotos por categoria (`items/places/`, `items/photos/`) e armazenando o caminho e URL no Firestore.
- **Consequências**: Stack unificada sob um único projeto Firebase, suporte a upload resiliente com progresso, regras de segurança compartilhadas com Firebase Auth e eliminação de serviços de mídia terceiros.

### ADR-003: Isolamento Centralizado de Testes em src/__tests__/ e Código 100% Autodocumentado
- **Contexto**: A manutenção da clareza visual nas pastas de componentes do Atomic Design e a disciplina de Clean Code exigem separação entre arquivos de produção e artefatos de teste, além de código sem ruído visual.
- **Decisão**: Todos os testes da aplicação residem exclusivamente em `src/__tests__/` (espelhando a árvore de pastas de `src/`). Todo o código-fonte de componentes, hooks e lógica deve ser estritamente livre de comentários (inline ou JSX), mantendo-se 100% autodocumentado com nomenclatura semântica e TypeScript estrito.
- **Consequências**: Pastas de componentes mais enxutas, sem poluição de arquivos de teste misturados à implementação, e código mais legível e autoexplicativo.

### ADR-004: Estratégia Git Flow para Specs (Origem em main, PR para develop via GitHub MCP)
- **Contexto**: Para garantir isolamento de features, rastreabilidade e integração contínua segura, é necessário um padrão de ciclo de vida de branches para cada especificação de engenharia.
- **Decisão**: Toda nova spec/feature inicia obrigatoriamente a partir da branch `main` atualizada, no formato `feature/spec-{id}-{slug}`. Ao término do desenvolvimento e aprovação no quality gate local (`test:run`, `typecheck`, `lint`, `build`), é aberto automaticamente um Pull Request via GitHub MCP direcionado para a branch `develop`.
- **Consequências**: Histórico limpo, branches de spec consistentes com o estado de produção, e integração segura no ambiente de staging/develop antes de qualquer release para `main`.
