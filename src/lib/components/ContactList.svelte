<script lang="ts">
  import type { Contact, Company } from '../types';
  import Modal from './Modal.svelte';
  import Toast from './ErrorToast.svelte';
  import { contactStore } from '$lib/stores/contactStore';
  export let contacts: Contact[] = [];
  export let companies: Company[] = [];
  export let onEdit: (contact: Contact) => void;

  let showDeleteModal = false;
  let contactToDelete: Contact | null = null;
  let toastMessage = '';
  let showToast = false;

  function handleDeleteClick(contact: Contact) {
    contactToDelete = contact;
    showDeleteModal = true;
  }
  function confirmDelete() {
    if (contactToDelete && contactToDelete.id !== undefined) {
      contactStore.remove(contactToDelete.id);
      showToastMessage('Контакт удалён');
    }
    showDeleteModal = false;
    contactToDelete = null;
  }
  function cancelDelete() {
    showDeleteModal = false;
    contactToDelete = null;
  }
  function showToastMessage(msg: string) {
    toastMessage = msg;
    showToast = true;
    setTimeout(() => showToast = false, 2000);
  }
</script>

{#if contacts.length === 0}
  <div class="flex flex-col items-center py-12 text-gray-400">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0zm-8 4h8" /></svg>
    <div class="text-lg font-medium">Нет контактов</div>
    <div class="text-sm mt-1">Добавьте первый контакт, чтобы начать!</div>
  </div>
{:else}
<ul class="divide-y divide-gray-100 rounded-lg shadow bg-white max-w-4xl mx-auto w-full sm:w-auto">
  {#each contacts as contact}
    <li class="flex flex-row sm:flex-row items-start sm:items-center gap-2 px-2 sm:px-4 py-3 hover:bg-gray-50 transition group">
      <span class="flex-1 w-full sm:pl-2 sm:pr-2 sm:border-r border-gray-200">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:w-full gap-1 sm:gap-4 text-gray-500">
          <span class="font-semibold text-black">{contact.name}</span>
          <div class="break-all">{contact.phone}</div>
          <div class="break-all">{contact.email}</div>
          <div class="break-all">{companies.find(c => c.id === contact.companyId)?.name}</div>
        </div>
      </span>
      <div class="flex gap-2 sm:w-auto">
        <button class="btn btn-xs btn-secondary flex-1 sm:flex-none mr-0 sm:mr-4 cursor-pointer items-center gap-1 group/edit" title="Редактировать" on:click={() => onEdit(contact)}>
          Редактировать
        </button>
        <button class="btn btn-xs btn-error flex-1 sm:flex-none sm:mr-4 cursor-pointer items-center gap-1 group/delete" title="Удалить" on:click={() => handleDeleteClick(contact)}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </li>
  {/each}
</ul>
{/if}

<Modal visible={showDeleteModal} onClose={cancelDelete}>
  <div class="p-4 text-center">
    <div class="mb-4 text-lg">Удалить контакт <b>{contactToDelete?.name}</b>?</div>
    <div class="flex gap-4 justify-center">
      <button class="btn btn-error" on:click={confirmDelete}>Удалить</button>
      <button class="btn btn-secondary" on:click={cancelDelete}>Отмена</button>
    </div>
  </div>
</Modal>

<Toast message={toastMessage} visible={showToast} onClose={() => showToast = false} type="success" /> 