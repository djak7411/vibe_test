import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { Contact, Company } from './types';

class MyAppDB extends Dexie {
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