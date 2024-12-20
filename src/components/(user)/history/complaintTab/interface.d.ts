export interface ComplaintTabs {
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
    time: string;
    date: string;
    status: string;
}
