import { Calendar } from '@/components/ui/calendar';
import { Pagination } from "@/types/interface";

// get all
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
    judul: string;
    aduan: string;
    Userinfo: {
      name: string;
    }
}

// get one
export interface ComplaintResponseOne {
  status: number
  message: string
  data: Data
}
export interface ComplaintGetOne {
  id: number
  judul: string
  aduan: string
  jawaban: any
  image: string
  userinfo_id: number
  status: number
  admin_id: any
  updated_by: any
  createdAt: string
  updatedAt: string
  Userinfo: Userinfo
  Admin: any
  Adminupdate: any
}

export interface Userinfo {
  id: number
  name: string
  gender: any
  jabatan: any
  ketenagaan: any
}
