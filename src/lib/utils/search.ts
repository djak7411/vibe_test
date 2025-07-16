import type { Contact, Company } from '../types';

export function searchContacts(
  contacts: Contact[],
  companies: Company[],
  query: string
): Contact[] {
  if (!query.trim()) return contacts;
  const q = query.trim().toLowerCase();
  return contacts.filter((c) => {
    const company = companies.find((comp) => comp.id === c.companyId)?.name?.toLowerCase() || '';
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.email.toLowerCase().includes(q) ||
      company.includes(q)
    );
  });
} 