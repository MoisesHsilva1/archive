export const HOME_CONTENT = {
  header: {
    brand: 'ARCHIVE',
    links: [
      { label: 'Acervo', href: '#acervo' },
      { label: 'Sobre', href: '#sobre' },
      { label: 'GitHub', href: 'https://github.com/MoisesHsilva1', isExternal: true },
    ],
  },
  hero: {
    title: 'ARCHIVE.',
    subtitle: 'Coisas que gosto, crio e escolhi guardar.',
    author: 'Moisas',
    artPath: '/assets/art/cosmic-landscape.png',
    artAlt: 'Ilustração em nanquim de paisagem cósmica e céu estrelado',
    artCaption: 'ARTE 01 // HORIZONTE EM NANQUIM',
  },
  about: {
    title: 'Sobre',
    tagline: 'PROPÓSITO',
    paragraphs: [
      'Um arquivo pessoal sem feeds, algoritmos ou métricas de engajamento.',
      'Aqui registro fotografias, projetos de software, lugares e experiências que fazem parte da minha trajetória.',
    ],
    quote: 'Significado sobre quantidade.',
  },
  domains: {
    title: 'Acervo',
    tagline: 'ÍNDICE',
  },
  footer: {
    brand: 'ARCHIVE',
    authorUrl: 'https://github.com/MoisesHsilva1',
    year: '2026',
  },
} as const;
