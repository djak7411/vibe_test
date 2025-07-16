<script lang="ts">
  import { onMount } from 'svelte';
  import { contactStore } from '$lib/stores/contactStore';
  import { companyStore } from '$lib/stores/companyStore';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import CompanyForm from '$lib/components/CompanyForm.svelte';
  import type { Contact, Company } from '$lib/types';

  let contacts: Contact[] = [];
  let companies: Company[] = [];
  let showContactForm = false;
  let showEditContactForm = false;
  let contactToEdit: Partial<Contact> = {};

  onMount(() => {
    contactStore.load();
    companyStore.load();
    contactStore.subscribe((v) => contacts = v);
    companyStore.subscribe((v) => companies = v);
  });

  function handleAddContact() {
    contactToEdit = {};
    showContactForm = true;
    showEditContactForm = false;
  }

  function handleEditContact(contact: Contact) {
    contactToEdit = { ...contact };
    showEditContactForm = true;
    showContactForm = false;
  }

  function handleContactSubmit({ contact }: { contact: Partial<Contact> }) {
    if (showEditContactForm && contact.id) {
      contactStore.update(contact.id, contact);
    } else {
      contactStore.add(contact as Omit<Contact, 'id'>);
    }
    showContactForm = false;
    showEditContactForm = false;
  }

  function handleContactCancel() {
    showContactForm = false;
    showEditContactForm = false;
  }

  function handleCompanySubmit({ name }: { name: string }) {
    companyStore.add({ name });
  }
</script>

<h2 class="text-xl font-bold mb-2">Компании</h2>
<ul class="mb-4">
  {#each companies as company}
    <li>{company.name}</li>
  {/each}
</ul>
<CompanyForm submit={handleCompanySubmit} />

<h2 class="text-xl font-bold mt-8 mb-2">Контакты</h2>
<button class="btn btn-primary mb-4" on:click={handleAddContact}>Добавить контакт</button>

{#if showContactForm}
  <ContactForm
    companies={companies}
    submit={handleContactSubmit}
    cancel={handleContactCancel}
  />
{/if}
{#if showEditContactForm}
  <ContactForm
    companies={companies}
    contact={contactToEdit}
    isEdit={true}
    submit={handleContactSubmit}
    cancel={handleContactCancel}
  />
{/if}

<ul>
  {#each contacts as contact}
    <li class="mb-2">
      {contact.name} | {contact.phone} | {contact.email} | {companies.find(c => c.id === contact.companyId)?.name}
      <button class="btn btn-xs btn-secondary ml-2" on:click={() => handleEditContact(contact)}>Редактировать</button>
    </li>
  {/each}
</ul>
