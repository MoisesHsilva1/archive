import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '@/services/firebase.service';
import { ItemMedia } from '@/types/domain/item.types';

export interface UploadOptions {
  alt?: string;
  folder?: string;
  onProgress?: (percent: number) => void;
}

export const sanitizeFileName = (fileName: string): string => {
  return fileName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9.-]/g, '_')
    .replace(/_+/g, '_');
};

export const uploadImageToStorage = (
  file: File,
  options: UploadOptions = {}
): Promise<ItemMedia> => {
  return new Promise((resolve, reject) => {
    const folder = options.folder || 'items';
    const cleanName = sanitizeFileName(file.name);
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const storagePath = `${folder}/${uniqueSuffix}-${cleanName}`;

    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (snapshot.totalBytes > 0 && options.onProgress) {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          options.onProgress(percent);
        }
      },
      (error) => {
        reject(new Error(`Firebase Storage: ${error.message}`));
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            publicId: storagePath,
            url: downloadUrl,
            alt: options.alt || cleanName,
            aspectRatio: '16:9',
          });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};

export const uploadMultipleImagesToStorage = async (
  files: File[],
  options: UploadOptions = {}
): Promise<ItemMedia[]> => {
  const results: ItemMedia[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i]!;
    const media = await uploadImageToStorage(file, {
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

export const deleteImageFromStorage = async (storagePath: string): Promise<void> => {
  const storageRef = ref(storage, storagePath);
  await deleteObject(storageRef);
};

export const uploadImageToCloudinary = uploadImageToStorage;
export const uploadMultipleImagesToCloudinary = uploadMultipleImagesToStorage;
