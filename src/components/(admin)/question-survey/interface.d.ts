export interface QuestionResponse {
  data: Question[];
  headers: string[];
  currentPage: number;
  search: string;
  pagination?: Pagination;
  status?: number;
  message?: string;
}

interface Question {
    id: number;
    question: string;
}
