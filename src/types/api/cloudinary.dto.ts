export interface CloudinaryUploadResponse {
  readonly public_id: string;
  readonly secure_url: string;
  readonly url: string;
  readonly format: string;
  readonly width: number;
  readonly height: number;
  readonly bytes: number;
  readonly created_at: string;
  readonly original_filename: string;
}

export interface CloudinaryUploadError {
  readonly message: string;
  readonly http_code?: number;
}
