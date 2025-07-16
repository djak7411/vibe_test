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

<ul>
  {#each contacts as contact}
    <li class="mb-2 flex items-center gap-2">
      <span class="flex-1">{contact.name} | {contact.phone} | {contact.email} | {companies.find(c => c.id === contact.companyId)?.name}</span>
      <button class="btn btn-xs btn-secondary" on:click={() => onEdit(contact)}>Редактировать</button>
      <button class="btn btn-xs btn-error" on:click={() => handleDeleteClick(contact)}>Удалить</button>
    </li>
  {/each}
</ul>

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