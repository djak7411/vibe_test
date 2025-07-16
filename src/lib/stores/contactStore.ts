import { writable } from 'svelte/store';
import type { Contact } from '../types';
import * as contactService from '../services/contactService';

function createContactStore() {
  const { subscribe, set } = writable<Contact[]>([]);

  async function load() {
    const contacts = await contactService.getContacts();
    set(contacts);
  }

  async function add(contact: Omit<Contact, 'id'>) {
    await contactService.addContact(contact);
    await load();
  }

  async function updateContact(id: number, updates: Partial<Contact>) {
    await contactService.updateContact(id, updates);
    await load();
  }

  async function remove(id: number) {
    await contactService.deleteContact(id);
    await load();
  }

  return {
    subscribe,
    load,
    add,
    update: updateContact,
    remove
  };
}

export const contactStore = createContactStore();