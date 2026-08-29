export const Category = {
  PHOTOS: 'photos',
  PROJECTS: 'projects',
  PLACES: 'places',
} as const;

export type Category = (typeof Category)[keyof typeof Category];

export interface CategoryOption {
  readonly value: Category;
  readonly label: string;
  readonly iconName: 'Camera' | 'FolderGit2' | 'MapPin';
  readonly description: string;
}

export const CATEGORY_OPTIONS: readonly CategoryOption[] = [
  {
    value: Category.PLACES,
    label: 'Lugares & Experiências',
    iconName: 'MapPin',
    description: 'Cafeterias, cidades, espaços marcantes e vivências cotidianas.',
  },
  {
    value: Category.PHOTOS,
    label: 'Fotografia',
    iconName: 'Camera',
    description: 'Registros e momentos visuais capturados no cotidiano e viagens.',
  },
  {
    value: Category.PROJECTS,
    label: 'Projetos',
    iconName: 'FolderGit2',
    description: 'Criações, experimentos de software e produtos digitais desenvolvidos.',
  },
] as const;

export const CREATION_CATEGORY_OPTIONS: readonly CategoryOption[] = [
  {
    value: Category.PLACES,
    label: 'Lugares & Experiências',
    iconName: 'MapPin',
    description: 'Cafeterias, cidades, espaços marcantes e vivências cotidianas.',
  },
  {
    value: Category.PHOTOS,
    label: 'Fotografia',
    iconName: 'Camera',
    description: 'Registros e momentos visuais capturados no cotidiano e viagens.',
  },
] as const;

export const CATEGORY_METADATA_MAP: Record<Category, CategoryOption> = {
  [Category.PLACES]: CATEGORY_OPTIONS[0]!,
  [Category.PHOTOS]: CATEGORY_OPTIONS[1]!,
  [Category.PROJECTS]: CATEGORY_OPTIONS[2]!,
};
