export interface NavigationItem {
  readonly id: string;
  readonly index: string;
  readonly label: string;
  readonly href: string;
  readonly isExternal?: boolean;
  readonly description?: string;
}

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    id: 'home',
    index: '01',
    label: 'Home',
    href: '/',
    description: 'Página inicial e introdução ao arquivo.',
  },
  {
    id: 'photos',
    index: '02',
    label: 'Fotografia',
    href: '/#acervo',
    description: 'Registros e momentos visuais capturados no cotidiano.',
  },
  {
    id: 'projects',
    index: '03',
    label: 'Projetos',
    href: '/#acervo',
    description: 'Criações, experimentos de software e produtos digitais.',
  },
  {
    id: 'places',
    index: '04',
    label: 'Lugares & Experiências',
    href: '/#acervo',
    description: 'Cafeterias, cidades e vivências cotidianas.',
  },
  {
    id: 'about',
    index: '05',
    label: 'Sobre',
    href: '/#sobre',
    description: 'Propósito e manifesto pessoal.',
  },
  {
    id: 'github',
    index: '06',
    label: 'GitHub',
    href: 'https://github.com/MoisesHsilva1',
    isExternal: true,
    description: 'Repositório de código e projetos de software.',
  },
] as const;

export const CREATE_NAVIGATION_ITEM: NavigationItem = {
  id: 'create',
  index: '07',
  label: 'Criar Experiência',
  href: '/create',
  description: 'Área do proprietário para publicação de reviews e lugares.',
} as const;
