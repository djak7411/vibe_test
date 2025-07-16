<script lang="ts">
  import { db, type Contact, type Company } from '$lib/db';
  import { onMount } from 'svelte';
  let contacts: Contact[] = [];
  let companies: Company[] = [];
  let newContact: Partial<Contact> = {};
  let newCompany: string = '';

  onMount(async () => {
    contacts = await db.contacts.toArray();
    companies = await db.companies.toArray();
  });

  async function addCompany() {
    if (newCompany.trim()) {
      await db.companies.add({ name: newCompany });
      companies = await db.companies.toArray();
      newCompany = '';
    }
  }

  async function addContact() {
    if (newContact.name && newContact.phone && newContact.email && newContact.companyId) {
      await db.contacts.add(newContact as Contact);
      contacts = await db.contacts.toArray();
      newContact = {};
    }
  }
</script>

<h2>Компании</h2>
<ul>
  {#each companies as company}
    <li>{company.name}</li>
  {/each}
</ul>
<input bind:value={newCompany} placeholder="Новая компания" />
<button on:click={addCompany}>Добавить компанию</button>

<h2>Контакты</h2>
<ul>
  {#each contacts as contact}
    <li>
      {contact.name} | {contact.phone} | {contact.email} | 
      {companies.find(c => c.id === contact.companyId)?.name}
    </li>
  {/each}
</ul>

<input bind:value={newContact.name} placeholder="Имя" />
<input bind:value={newContact.phone} placeholder="Телефон" />
<input bind:value={newContact.email} placeholder="Email" />
<select bind:value={newContact.companyId}>
  <option value="" disabled selected>Выберите компанию</option>
  {#each companies as company}
    <option value={company.id}>{company.name}</option>
  {/each}
</select>
<button on:click={addContact}>Добавить контакт</button>
