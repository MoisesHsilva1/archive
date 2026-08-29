import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@/enums/category.enum';
import { createItemSchema, CreateItemFormValues } from '@/schemas/create-item.schema';
import { generateSlug } from '@/schemas/utils/field-builders';
import { FormField } from '@/components/molecules/form-field';
import { SelectField } from '@/components/molecules/select-field';
import { RatingInput } from '@/components/molecules/rating-input';
import { ImageUploader } from '@/components/molecules/image-uploader';
import { Input } from '@/components/atoms/input';
import { Textarea } from '@/components/atoms/textarea';
import { Button } from '@/components/atoms/button';
import { Spinner } from '@/components/atoms/spinner';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { ReviewPreviewCard } from '@/components/organisms/review-preview-card';

export interface CreateItemFormSubmitData {
  values: CreateItemFormValues;
  coverFile: File;
  galleryFiles: File[];
}

export interface CreateItemFormProps {
  onSubmit: (data: CreateItemFormSubmitData) => Promise<void>;
  isLoading?: boolean;
  uploadProgress?: number | null;
  serverError?: string | null;
}

export const CreateItemForm: React.FC<CreateItemFormProps> = ({
  onSubmit,
  isLoading = false,
  uploadProgress = null,
  serverError = null,
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [tagsInput, setTagsInput] = useState('');
  const [imageError, setImageError] = useState<string | null>(null);

  const {
    coverMedia,
    galleryMedia,
    setCoverImage,
    removeCoverImage,
    addGalleryImage,
    removeGalleryImage,
    clearAllMedia,
  } = useMediaUpload();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateItemFormValues>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: Category.PLACES,
      content: '',
      excerpt: '',
      location: '',
      rating: 0,
      tags: [],
      featured: false,
      coverImage: {
        publicId: 'pending-cover',
        url: 'https://placeholder.archive/cover.jpg',
        alt: 'Imagem de capa',
        aspectRatio: '16:9',
      },
      gallery: [],
    },
  });

  const selectedCategory = watch('category');
  const isPhotoMode = selectedCategory === Category.PHOTOS;

  const titleValue = watch('title');
  const contentValue = watch('content');
  const locationValue = watch('location');
  const ratingValue = watch('rating');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue('title', title, { shouldValidate: true });
    setValue('slug', generateSlug(title), { shouldValidate: true });
  };

  const handleSelectCover = (file: File) => {
    setImageError(null);
    setCoverImage(file);
    setValue(
      'coverImage',
      {
        publicId: `local-${file.name}`,
        url: URL.createObjectURL(file),
        alt: file.name,
        aspectRatio: '16:9',
      },
      { shouldValidate: true }
    );
  };

  const handleRemoveCover = () => {
    removeCoverImage();
    setValue(
      'coverImage',
      {
        publicId: '',
        url: '',
        alt: '',
        aspectRatio: '16:9',
      },
      { shouldValidate: true }
    );
  };

  const handleFormSubmit = async (values: CreateItemFormValues) => {
    if (!coverMedia) {
      setImageError('A imagem é obrigatória');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    let finalTitle = values.title;
    let finalSlug = values.slug;
    let finalContent = values.content;

    if (isPhotoMode) {
      const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date());

      if (!finalTitle || finalTitle.trim().length === 0) {
        finalTitle = `Fotografia — ${dateFormatted}`;
      }
      if (!finalSlug || finalSlug.trim().length === 0) {
        finalSlug = `fotografia-${Date.now()}`;
      }
      if (!finalContent) {
        finalContent = '';
      }
    }

    const payloadValues: CreateItemFormValues = {
      ...values,
      title: finalTitle,
      slug: finalSlug,
      content: finalContent,
      tags,
    };

    try {
      await onSubmit({
        values: payloadValues,
        coverFile: coverMedia.file,
        galleryFiles: galleryMedia.map((m) => m.file),
      });
      reset();
      clearAllMedia();
      setTagsInput('');
    } catch {
      // Erro tratado pelo container pai
    }
  };

  const displayTitle = isPhotoMode
    ? titleValue && titleValue.trim().length > 0
      ? titleValue
      : 'Fotografia'
    : titleValue;

  return (
    <div className="space-y-6">
      <div className="flex sm:hidden border-b border-border mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('form')}
          className={`flex-1 pb-3 text-xs font-mono uppercase tracking-wider text-center transition-colors border-b-2 ${
            activeTab === 'form'
              ? 'border-text-primary text-text-primary'
              : 'border-transparent text-text-muted hover:text-text-secondary'
          }`}
        >
          Formulário
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`flex-1 pb-3 text-xs font-mono uppercase tracking-wider text-center transition-colors border-b-2 ${
            activeTab === 'preview'
              ? 'border-text-primary text-text-primary'
              : 'border-transparent text-text-muted hover:text-text-secondary'
          }`}
        >
          Pré-visualização
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className={`lg:col-span-7 space-y-6 bg-background-secondary p-6 sm:p-8 border border-border rounded-[2px] ${
            activeTab === 'preview' ? 'hidden sm:block' : 'block'
          }`}
        >
          {serverError && (
            <div
              role="alert"
              className="p-3 bg-red-950/30 border border-red-800/50 rounded-[2px] text-xs text-red-200"
            >
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={isPhotoMode ? 'sm:col-span-3' : 'sm:col-span-1'}>
              <FormField
                label="Categoria"
                htmlFor="category-field"
                required
                error={errors.category?.message}
              >
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      id="category-field"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                      hasError={Boolean(errors.category)}
                    />
                  )}
                />
              </FormField>
            </div>

            {!isPhotoMode && (
              <div className="sm:col-span-2">
                <FormField
                  label="Título do Lugar / Experiência"
                  htmlFor="title-field"
                  required
                  error={errors.title?.message}
                >
                  <Input
                    id="title-field"
                    placeholder="Ex: Cafeteria & Livraria"
                    disabled={isLoading}
                    hasError={Boolean(errors.title)}
                    {...register('title', { onChange: handleTitleChange })}
                  />
                </FormField>
              </div>
            )}
          </div>

          <ImageUploader
            label={isPhotoMode ? 'Fotografia' : 'Fotografia de Capa & Galeria'}
            hint={isPhotoMode ? 'Selecione ou capture a foto' : 'Mobile / Câmera suportada'}
            error={imageError || errors.coverImage?.publicId?.message}
            coverMedia={coverMedia}
            galleryMedia={galleryMedia}
            allowGallery={!isPhotoMode}
            onSelectCover={handleSelectCover}
            onRemoveCover={handleRemoveCover}
            onAddGallery={(file) => addGalleryImage(file)}
            onRemoveGallery={(id) => removeGalleryImage(id)}
            disabled={isLoading}
          />

          {isPhotoMode ? (
            <FormField
              label="Legenda / Contexto"
              htmlFor="photo-caption-field"
              hint="Opcional"
              error={errors.content?.message}
            >
              <Input
                id="photo-caption-field"
                placeholder="Ex: Luz da tarde no centro da cidade (opcional)"
                disabled={isLoading}
                hasError={Boolean(errors.content)}
                {...register('content')}
              />
            </FormField>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Localização"
                  htmlFor="location-field"
                  hint="Opcional"
                  error={errors.location?.message}
                >
                  <Input
                    id="location-field"
                    placeholder="Ex: São Paulo, SP"
                    disabled={isLoading}
                    hasError={Boolean(errors.location)}
                    {...register('location')}
                  />
                </FormField>

                <FormField
                  label="Nota Pessoal (0 a 10)"
                  hint="Opcional"
                  error={errors.rating?.message}
                >
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                      <RatingInput
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                      />
                    )}
                  />
                </FormField>
              </div>

              <FormField
                label="Relato Editorial / Review"
                htmlFor="content-field"
                required
                hint="Markdown suportado"
                error={errors.content?.message}
              >
                <Textarea
                  id="content-field"
                  rows={6}
                  placeholder="Descreva a experiência, a atmosfera, impressões e detalhes que tornam este lugar ou conteúdo memorável..."
                  disabled={isLoading}
                  hasError={Boolean(errors.content)}
                  {...register('content')}
                />
              </FormField>

              <FormField
                label="Tags"
                htmlFor="tags-field"
                hint="Separadas por vírgula"
              >
                <Input
                  id="tags-field"
                  placeholder="café, são paulo, leitura, arquitetura"
                  value={tagsInput}
                  disabled={isLoading}
                  onChange={(e) => setTagsInput(e.target.value)}
                />
              </FormField>
            </>
          )}

          {uploadProgress !== null && (
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-text-secondary">Enviando mídia ao Storage</span>
                <span className="text-text-primary">{uploadProgress}%</span>
              </div>
              <div className="w-full h-1 bg-background-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-text-primary transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" />
                  <span>Publicando no Archive...</span>
                </span>
              ) : isPhotoMode ? (
                'Publicar Fotografia'
              ) : (
                'Publicar no Acervo'
              )}
            </Button>
          </div>
        </form>

        <div
          className={`lg:col-span-5 sticky top-24 ${
            activeTab === 'form' ? 'hidden lg:block' : 'block'
          }`}
        >
          <ReviewPreviewCard
            title={displayTitle}
            category={selectedCategory}
            content={contentValue}
            location={isPhotoMode ? undefined : locationValue}
            rating={isPhotoMode ? undefined : ratingValue}
            coverPreviewUrl={coverMedia?.previewUrl}
          />
        </div>
      </div>
    </div>
  );
};
