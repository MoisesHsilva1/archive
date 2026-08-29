import { axiosClient } from '@/api/axiosClient';
import { ENDPOINTS } from '@/api/endpoints';
import { ItemMedia } from '@/types/domain/item.types';
import { CloudinaryUploadResponse } from '@/types/api/cloudinary.dto';

export interface UploadOptions {
  alt?: string;
  folder?: string;
  onProgress?: (percent: number) => void;
}

export const getCloudinaryConfig = () => {
  return {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'archive_dev_preset',
  };
};

export const uploadImageToCloudinary = async (
  file: File,
  options: UploadOptions = {}
): Promise<ItemMedia> => {
  const { cloudName, uploadPreset } = getCloudinaryConfig();
  const endpoint = ENDPOINTS.CLOUDINARY_UPLOAD(cloudName);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  if (options.folder) {
    formData.append('folder', options.folder);
  }

  const response = await axiosClient.post<CloudinaryUploadResponse>(
    endpoint,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && options.onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          options.onProgress(percentCompleted);
        }
      },
    }
  );

  const data = response.data;

  return {
    publicId: data.public_id,
    url: data.secure_url || data.url,
    alt: options.alt || file.name,
    aspectRatio:
      data.width && data.height
        ? `${data.width}:${data.height}`
        : '16:9',
    width: data.width,
    height: data.height,
  };
};

export const uploadMultipleImagesToCloudinary = async (
  files: File[],
  options: UploadOptions = {}
): Promise<ItemMedia[]> => {
  const results: ItemMedia[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i]!;
    const media = await uploadImageToCloudinary(file, {
      ...options,
      onProgress: (percent) => {
        if (options.onProgress) {
          const totalProgress = Math.round(
            ((i + percent / 100) / files.length) * 100
          );
          options.onProgress(totalProgress);
        }
      },
    });
    results.push(media);
  }

  return results;
};
