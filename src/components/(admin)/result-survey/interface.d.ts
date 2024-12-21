export interface ResultSurveyResponse {
  data: ResultSurvey[];
  headers: string[];
  currentPage: number;
  search: string;
  pagination?: Pagination;
  status?: number;
  message?: string;
}

interface ResultSurvey {
    id: number;
    nama: string;
    date: string;
    jabatan: string;
    ketenagaan: string;
}
