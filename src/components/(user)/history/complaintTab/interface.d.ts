import { Pagination } from "@/types/interface";

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
  judul: string;
  aduan: string;
  jawaban: any;
  image?: string;
  tanggal_pengaduan?: string;
  puskesmas_id: number;
  userinfo_id: any;
  status: number;
  admin_id: any;
  updated_by: any;
  createdAt: string;
  updatedAt: string;
  Userinfo: any;
  Admin: any;
  Adminupdate: any;
}
