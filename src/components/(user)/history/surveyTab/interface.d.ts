export interface SurveyTabs {
  data: Survei[];
  headers: string[];
  currentPage: number;
  search: string;
  pagination?: Pagination;
  status?: number;
  message?: string;
}

interface Survei {
    id: number;
    time: string;
    date: string;
}
