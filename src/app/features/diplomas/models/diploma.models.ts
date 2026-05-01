export interface Diploma {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DiplomasPayload {
  data: Diploma[];
  metadata: PaginationMetadata;
}

export interface GetDiplomasResponse {
  status: boolean;
  code: number;
  payload: DiplomasPayload;
}
