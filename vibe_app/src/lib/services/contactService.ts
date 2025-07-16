import { db } from '../db';
import type { Contact } from '../types';

export async function getContacts(): Promise<Contact[]> {
  return db.contacts.toArray();
}

export async function addContact(contact: Omit<Contact, 'id'>): Promise<number> {
  return db.contacts.add(contact);
}

export async function updateContact(id: number, updates: Partial<Contact>): Promise<number> {
  return db.contacts.update(id, updates);
}

export async function deleteContact(id: number): Promise<void> {
  await db.contacts.delete(id);
} 