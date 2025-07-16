export interface Company {
  id?: number;
  name: string;
}

export interface Contact {
  id?: number;
  name: string;
  phone: string;
  email: string;
  companyId: number;
} 