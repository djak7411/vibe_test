<script lang="ts">
  import { onMount } from 'svelte';
  import { contactStore } from '$lib/stores/contactStore';
  import { companyStore } from '$lib/stores/companyStore';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import CompanyForm from '$lib/components/CompanyForm.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Toast from '$lib/components/ErrorToast.svelte';
  import ContactList from '$lib/components/ContactList.svelte';
  import CompanyList from '$lib/components/CompanyList.svelte';
  import { searchContacts } from '$lib/utils/search';
  import type { Contact, Company } from '$lib/types';

  let contacts: Contact[] = [];
  let companies: Company[] = [];
  let filteredContacts: Contact[] = [];
  let searchQuery = '';
  let showContactForm = false;
  let showEditContactForm = false;
  let showCompanyForm = false;
  let contactToEdit: Partial<Contact> = {};
  let companyToEdit: Partial<Company> = {};
  let toastMessage = '';
  let showToast = false;
  let toastType: 'error' | 'success' = 'success';

  onMount(() => {
    contactStore.load();
    companyStore.load();
    contactStore.subscribe((v) => {
      contacts = v;
      filterContacts();
    });
    companyStore.subscribe((v) => {
      companies = v;
      filterContacts();
    });
  });

  function filterContacts() {
    filteredContacts = searchContacts(contacts, companies, searchQuery);
  }

  function handleSearchInput(val: string) {
    searchQuery = val;
    filterContacts();
  }

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
      showToastMessage('Контакт обновлён', 'success');
    } else {
      contactStore.add(contact as Omit<Contact, 'id'>);
      showToastMessage('Контакт добавлен', 'success');
    }
    showContactForm = false;
    showEditContactForm = false;
  }

  function handleContactCancel() {
    showContactForm = false;
    showEditContactForm = false;
  }

  function handleAddCompany() {
    companyToEdit = {};
    showCompanyForm = true;
  }
  function handleEditCompany(company: Company) {
    companyToEdit = { ...company };
    showCompanyForm = true;
  }

  function handleCompanySubmit({ name }: { name: string }) {
    if (companyToEdit && companyToEdit.id) {
      companyStore.update(companyToEdit.id, { name });
      showToastMessage('Компания обновлена', 'success');
    } else {
      companyStore.add({ name });
      showToastMessage('Компания добавлена', 'success');
    }
    showCompanyForm = false;
    companyToEdit = {};
  }

  function openCompanyForm() {
    handleAddCompany();
  }
  function closeCompanyForm() {
    showCompanyForm = false;
    companyToEdit = {};
  }

  function showToastMessage(msg: string, type: 'error' | 'success' = 'success') {
    toastMessage = msg;
    toastType = type;
    showToast = true;
    setTimeout(() => showToast = false, 2000);
  }
</script>

<h2 class="text-xl font-bold mb-2">Компании</h2>
<CompanyList companies={companies} onEdit={handleEditCompany} />
<button class="btn btn-primary mb-4" on:click={openCompanyForm}>Добавить компанию</button>
<Modal visible={showCompanyForm} onClose={closeCompanyForm}>
  <CompanyForm submit={handleCompanySubmit} company={companyToEdit} />
</Modal>

<h2 class="text-xl font-bold mt-8 mb-2">Контакты</h2>
<SearchBar value={searchQuery} onInput={handleSearchInput} />
<button class="btn btn-primary mb-4" on:click={handleAddContact}>Добавить контакт</button>

<Modal visible={showContactForm} onClose={handleContactCancel}>
  <ContactForm
    companies={companies}
    submit={handleContactSubmit}
    cancel={handleContactCancel}
  />
</Modal>
<Modal visible={showEditContactForm} onClose={handleContactCancel}>
  <ContactForm
    companies={companies}
    contact={contactToEdit}
    isEdit={true}
    submit={handleContactSubmit}
    cancel={handleContactCancel}
  />
</Modal>

<Toast message={toastMessage} visible={showToast} onClose={() => showToast = false} type={toastType} />

<ContactList
  contacts={filteredContacts}
  companies={companies}
  onEdit={handleEditContact}
/>
