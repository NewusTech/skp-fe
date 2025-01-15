export interface debounceInterface {
  value: string;
  delay: number;
}

export interface Pagination {
  page: number
  perPage: number
  totalPages: number
  totalCount: number
  links: Links
}

export interface Links {
  prev: any
  next: any
}
