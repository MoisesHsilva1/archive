export const ENDPOINTS = {
  CLOUDINARY_UPLOAD: (cloudName: string) =>
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
} as const;
