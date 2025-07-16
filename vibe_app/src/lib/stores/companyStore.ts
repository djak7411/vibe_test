import { writable } from 'svelte/store';
import type { Company } from '../types';
import * as companyService from '../services/companyService';

function createCompanyStore() {
  const { subscribe, set } = writable<Company[]>([]);

  async function load() {
    const companies = await companyService.getCompanies();
    set(companies);
  }

  async function add(company: Omit<Company, 'id'>) {
    await companyService.addCompany(company);
    await load();
  }

  async function updateCompany(id: number, updates: Partial<Company>) {
    await companyService.updateCompany(id, updates);
    await load();
  }

  async function remove(id: number) {
    await companyService.deleteCompany(id);
    await load();
  }

  return {
    subscribe,
    load,
    add,
    update: updateCompany,
    remove
  };
}

export const companyStore = createCompanyStore();