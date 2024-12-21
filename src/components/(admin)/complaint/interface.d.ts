export interface ComplaintResponse {
  data: Complaint[];
  headers: string[];
  currentPage: number;
  search: string;
  pagination?: Pagination;
  status?: number;
  message?: string;
}

interface Complaint {
    id: number;
    nama: string;
    judul_aduan: string;
}
