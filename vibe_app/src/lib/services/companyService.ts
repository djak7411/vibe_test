import { db } from '../db';
import type { Company } from '../db';

export async function getCompanies(): Promise<Company[]> {
  return db.companies.toArray();
}

export async function addCompany(company: Omit<Company, 'id'>): Promise<number> {
  return db.companies.add(company);
}

export async function updateCompany(id: number, updates: Partial<Company>): Promise<number> {
  return db.companies.update(id, updates);
}

export async function deleteCompany(id: number): Promise<void> {
  await db.companies.delete(id);
} 