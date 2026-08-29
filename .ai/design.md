# Design

> **Status**: Consolidado e Aprovado via SDD (/grill-me)  
> **Data da Consolidação**: 2026-08-29  
> **Caminho**: `/home/moisas/projects/archive`

---

## Princípios de Desenvolvimento

- **Clean Code & Separation of Concerns**: Separação estrita entre camadas de apresentação (Atomic Design), regras de negócio/orquestração (Hooks), comunicação de dados (Services/BaaS) e contratos (Types/Schemas).
- **Mobile-First Content Publishing**: Interface otimizada para navegadores móveis, permitindo ao proprietário capturar fotos com a câmera/galeria, preencher dados essenciais e publicar diretamente no Firebase Firestore.
- **React 19 Best Practices**:
  - Evitar o uso indiscriminado de `useEffect` para fetching de dados, sincronização ou derivação de estados.
  - Utilização de primitivos modernos do React 19 (`use()` com Suspense, `useActionState`, `useTransition`, `useOptimistic`).
  - Cálculo de estados derivados diretamente durante o ciclo de renderização.
- **Zero Boilerplate nos Componentes**: Dados estáticos, opções de select, colunas, filtros e enums devem ser isolados em `src/enums/` ou `src/constants/`, mantendo os componentes enxutos e focados exclusivamente em renderização e interação.
- **Strict TypeScript**:
  - `strict: true` ativado.
  - Tipagens explícitas de DTOs e contratos com inferência automática via Zod (`z.infer<typeof schema>`).
  - Uso de Discriminated Unions e Utility Types em vez de types vagos ou `any`.
- **Zero Comentários no Código (Self-Documenting Code)**: Código 100% autodocumentado através de nomenclatura expressiva, arquitetura limpa e tipagem estrita. Componentes, hooks, services, utilitários e JSX não devem conter comentários explicativos ou redundantes (inline ou em bloco). Apenas diretivas de compilação ou linter estritamente indispensáveis (ex.: `// eslint-disable-next-line`) são permitidas quando indispensáveis.
- **Fidelidade Editorial & Monocromática**: Estrito cumprimento do [UI.md](file:///home/moisas/projects/archive/.ai/UI.md), priorizando tipografia editorial, composições assimétricas, espaço negativo e paleta em tons escuros e cinzas.

---

## Convenções

- **Nomenclatura de Arquivos e Pastas**:
  - Componentes React: `kebab-case.tsx` (ex.: `button.tsx`, `form-field.tsx`, `review-card.tsx`, `create-review-sheet.tsx`).
  - Hooks: `camelCase.ts` com prefixo `use` (ex.: `useReviews.ts`, `useEditorialMedia.ts`, `useAuth.ts`, `useReviewMutation.ts`).
  - Services: `kebab-case.service.ts` (ex.: `firebase.service.ts`, `auth.service.ts`, `review.service.ts`, `media.service.ts`).
  - Schemas e Utils: `kebab-case.schema.ts` (ex.: `create-item.schema.ts`, `field-builders.ts`).
  - Enums e Constantes: `kebab-case.enum.ts` / `kebab-case.constants.ts`.
  - Tipos e Contratos: `kebab-case.types.ts` ou `kebab-case.dto.ts`.
- **Nomenclatura de Classes / Tipos / Interfaces**: `PascalCase` (ex.: `CreateItemFormValues`, `ReviewItem`, `CategoryEnum`).
- **Nomenclatura de Variáveis e Funções**: `camelCase` (ex.: `getReviewBySlug`, `formatZodErrors`, `uploadMediaDirect`).
- **Constantes e Enums**: `SCREAMING_SNAKE_CASE` para instâncias de constantes e `PascalCase` para o objeto base de enum `as const` (ex.: `Category`, `CATEGORY_OPTIONS`, `CATEGORY_METADATA_MAP`).
- **Estilo e Formatação**:
  - ESLint com regras de React 19, React Hooks e TypeScript Strict.
  - Prettier integrado com `prettier-plugin-tailwindcss`.

---

## Organização do Código (Atomic Design Híbrido)

```text
src/
├── __tests__/                   # Suíte de testes isolada espelhando a árvore de src/
│   ├── components/              # Testes unitários/integração de componentes (atoms, molecules, organisms)
│   ├── hooks/                   # Testes de custom hooks (*.hook.spec.ts)
│   ├── services/                # Testes de integração e unitários de serviços (*.service.spec.ts)
│   ├── schemas/                 # Testes de validação de schemas Zod (*.schema.spec.ts)
│   └── pages/                   # Testes de integração de páginas (*.spec.tsx)
├── api/                         # Configuração de clientes HTTP e endpoints
│   ├── axiosClient.ts           # Instância Axios com interceptors e tratamento de erros
│   └── endpoints.ts             # Constantes com URLs e rotas de serviços (Cloudinary)
├── components/                  # Hierarquia Atomic Design
│   ├── atoms/                   # Elementos indivisíveis (Button, Input, Textarea, Badge, Text, Skeleton, Image)
│   ├── molecules/               # Composições simples (FormField, SearchInput, FilterPill, TagGroup, ImageUploader)
│   ├── organisms/               # Blocos complexos (Header, Footer, ReviewCard, ReviewHero, CreateReviewSheet)
│   └── templates/               # Estruturas e cascas visuais (MainLayout, EditorialLayout, AdminLayout)
├── services/                    # Camada de serviços (comunicação com Firestore, Firebase Auth, Cloudinary)
│   ├── firebase.service.ts      # Inicialização do Firebase Firestore & Auth
│   ├── auth.service.ts          # Métodos de login, logout e sessão persistente
│   ├── review.service.ts        # Operações no Firestore (getDocs, addDoc, getDoc, etc.)
│   └── media.service.ts         # Upload direto para Cloudinary e geração de URLs transformadas
├── hooks/                       # Custom Hooks (orquestração assíncrona, React 19 actions, Zustand bridges)
│   ├── useReviews.ts            # Fetching de acervo com use() / Suspense
│   ├── useEditorialMedia.ts     # Transformação de imagens e lazy loading
│   ├── useAuth.ts               # Estado de autenticação do proprietário
│   └── useReviewMutation.ts     # Ações de criação com useTransition e useOptimistic
├── schemas/                     # Schemas de validação Zod e tipagens inferidas
│   ├── create-item.schema.ts    # Schema de criação mobile de reviews/fotos/projetos
│   ├── review.schema.ts         # Schema de leitura e validação do Firestore
│   └── utils/                   # Schema Utils reutilizáveis
│       ├── field-builders.ts    # trimmedString, slugSchema, positiveNumber, etc.
│       └── error-formatters.ts  # formatZodErrors, safeParseWithFallback
├── enums/                       # Enums `as const`, arrays de opções estáticas e dicionários de metadados
│   ├── category.enum.ts         # Category as const + CATEGORY_OPTIONS + CATEGORY_METADATA_MAP
│   └── status.enum.ts
├── types/                       # Interfaces TypeScript, DTOs e contratos de APIs
│   ├── api/                     # Request/Response DTOs, ApiError
│   └── domain/                  # Entidades de domínio (Review, Photo, Project, Media)
├── stores/                      # Stores Zustand para estado global síncrono (filtros, busca, UI)
│   ├── filter.store.ts
│   └── ui.store.ts
├── pages/                       # Componentes de rotas de alto nível (HomePage, ArchivePage, DetailPage, CreatePage)
├── routes/                      # Definição e configuração do React Router
├── assets/                      # Estilos globais e tipografia
└── main.tsx                     # Entrypoint da aplicação
```

---

## Padrões de Projeto Utilizados

- **Atomic Design Pattern**: Componentização estruturada do nível mais granular (`atoms`) ao mais complexo (`organisms`/`templates`), garantindo reusabilidade consistente.
- **Service Layer Pattern**: Todo acesso ao Firestore, Firebase Auth ou Cloudinary é encapsulado em módulos de serviço puros, sem acoplamento direto nos componentes React.
- **Custom Hook Bridge Pattern**: Os hooks atuam como pontes entre os Services e a UI, gerenciando o ciclo de vida assíncrono com React 19 (`use()`, `useTransition`, `useOptimistic`).
- **Direct-to-Cloudinary Upload**: Mídia do celular é enviada diretamente para a CDN do Cloudinary, salvando apenas o identificador (`publicId`) no documento do Firestore.
- **Constant Enums & Lookup Dictionaries**:
  ```typescript
  export const Category = {
    MOVIES: 'movies',
    BOOKS: 'books',
    MUSIC: 'music',
    GAMES: 'games',
    PLACES: 'places',
    PHOTOS: 'photos',
    PROJECTS: 'projects',
  } as const;

  export type Category = (typeof Category)[keyof typeof Category];

  export const CATEGORY_OPTIONS = [
    { value: Category.MOVIES, label: 'Filmes', icon: 'Film' },
    { value: Category.BOOKS, label: 'Livros', icon: 'BookOpen' },
    { value: Category.MUSIC, label: 'Músicas', icon: 'Music' },
    { value: Category.GAMES, label: 'Jogos', icon: 'Gamepad2' },
    { value: Category.PLACES, label: 'Lugares', icon: 'MapPin' },
    { value: Category.PHOTOS, label: 'Fotografias', icon: 'Camera' },
    { value: Category.PROJECTS, label: 'Projetos', icon: 'FolderGit2' },
  ] as const;
  ```

---

## Modelagem e Validação (Zod & Schema Utils)

### Schema de Criação de Item (Mobile):
```typescript
import { z } from 'zod';
import { trimmedString, slugSchema } from '@/schemas/utils/field-builders';
import { Category } from '@/enums/category.enum';

export const createItemSchema = z.object({
  title: trimmedString(2, 120, 'O título deve ter entre 2 e 120 caracteres'),
  slug: slugSchema(),
  category: z.nativeEnum(Category, { errorMap: () => ({ message: 'Selecione uma categoria válida' }) }),
  content: trimmedString(1, 5000, 'O conteúdo/review é obrigatório'),
  excerpt: trimmedString(0, 300, 'O resumo deve ter no máximo 300 caracteres').optional(),
  rating: z.number().min(0).max(10).optional(),
  coverImage: z.object({
    publicId: z.string().min(1, 'A imagem é obrigatória'),
    alt: z.string().default('Imagem de capa'),
    aspectRatio: z.string().default('16:9'),
  }),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export type CreateItemFormValues = z.infer<typeof createItemSchema>;
```

### Schema Utils (`src/schemas/utils/`):
- `field-builders.ts`: Funções utilitárias que geram regras de validação padronizadas (`trimmedString(min, max, msg)`, `positiveNumber(msg)`, `slugSchema()`, `urlSchema()`, `imageValidationSchema()`).
- `error-formatters.ts`: Utilitário `formatZodErrors(result.error)` para transformar `ZodError` em mapas de erro estruturados `{ [fieldName]: string }`.

---

## Formulários e Interação Mobile

- **React Hook Form + `@hookform/resolvers/zod`**:
  - Componente `<CreateReviewSheet />` como drawer/sheet mobile com input de arquivos/câmera integrado (`<ImageUploader />`).
  - Submissão com React 19 `useTransition` e atualização otimista na lista com `useOptimistic`.

---

## Testes & Qualidade

- **Framework de Testes**: **Vitest** + **React Testing Library** + **jsdom**.
- **Localização dos Testes (Pasta Dedicada)**: Todos os testes residem obrigatoriamente dentro de `src/__tests__/`, espelhando com precisão a estrutura de pastas de `src/` (ex.: `src/__tests__/components/atoms/icon-button.spec.tsx`, `src/__tests__/pages/home-page.spec.tsx`). Nenhum arquivo de teste deve coabitar com o código fonte em `src/components/`, `src/pages/`, etc.
- **Convenção de Nomenclatura**:
  - Testes unitários de schemas, utils e services: `*.spec.ts`
  - Testes de componentes (atoms/molecules/organisms): `*.spec.tsx` ou `*.test.tsx`
  - Testes de hooks customizados: `*.hook.spec.ts` via `renderHook`

---

## Regras para IA no Projeto

- **O que FAZER**:
  - Seguir rigorosamente a hierarquia Atomic Design.
  - Escrever código limpo, declarativo e 100% autodocumentado com nomes expressivos e tipagem estrita, sem nenhum comentário no código ou JSX.
  - Isolar todos os testes na pasta dedicada `src/__tests__/`, espelhando a árvore de arquivos de `src/`.
  - Implementar a experiência de criação mobile com foco em ergonomia de toque, formulários leves e preview instantâneo de fotos.
  - Salvar conteúdos no Firestore e arquivos de imagem no Cloudinary via `media.service.ts`.
  - Isolar opções estáticas e listas em `src/enums/` usando `as const`.
  - Seguir o design minimalista, monocromático e editorial de [UI.md](file:///home/moisas/projects/archive/.ai/UI.md).
- **O que NÃO FAZER**:
  - Não adicionar comentários explicativos, anotações de fluxo ou comentários em JSX nos componentes e código de negócio.
  - Não criar arquivos de teste `.spec.ts` / `.spec.tsx` junto aos arquivos de implementação em `src/components/` ou `src/pages/`.
  - Não utilizar `useEffect` para carregar dados que possam ser resolvidos com `use()` ou disparados em handlers de ação com `useTransition`.
  - Não expor credenciais privadas ou regras de escrita públicas no Firestore.
  - Não utilizar gradientes coloridos, sombras pesadas ou cores fora da paleta monocromática de `UI.md`.

