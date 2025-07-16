import Dexie, { Table } from 'dexie';

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

export class MyAppDB extends Dexie {
  contacts!: Table<Contact, number>;
  companies!: Table<Company, number>;

  constructor() {
    super('MyAppDB');
    this.version(1).stores({
      contacts: '++id, name, phone, email, companyId',
      companies: '++id, name'
    });
  }
}

export const db = new MyAppDB(); 