<script lang="ts">
  import type { Company } from '../types';
  import Modal from './Modal.svelte';
  import Toast from './ErrorToast.svelte';
  import { companyStore } from '$lib/stores/companyStore';
  export let companies: Company[] = [];
  export let onEdit: (company: Company) => void;

  let showDeleteModal = false;
  let companyToDelete: Company | null = null;
  let toastMessage = '';
  let showToast = false;

  function handleDeleteClick(company: Company) {
    companyToDelete = company;
    showDeleteModal = true;
  }
  function confirmDelete() {
    if (companyToDelete && companyToDelete.id !== undefined) {
      companyStore.remove(companyToDelete.id);
      showToastMessage('Компания удалена');
    }
    showDeleteModal = false;
    companyToDelete = null;
  }
  function cancelDelete() {
    showDeleteModal = false;
    companyToDelete = null;
  }
  function showToastMessage(msg: string) {
    toastMessage = msg;
    showToast = true;
    setTimeout(() => showToast = false, 2000);
  }
</script>

<ul>
  {#each companies as company}
    <li class="mb-2 flex items-center gap-2">
      <span class="flex-1">{company.name}</span>
      <button class="btn btn-xs btn-secondary" on:click={() => onEdit(company)}>Редактировать</button>
      <button class="btn btn-xs btn-error" on:click={() => handleDeleteClick(company)}>Удалить</button>
    </li>
  {/each}
</ul>

<Modal visible={showDeleteModal} onClose={cancelDelete}>
  <div class="p-4 text-center">
    <div class="mb-4 text-lg">Удалить компанию <b>{companyToDelete?.name}</b>?</div>
    <div class="flex gap-4 justify-center">
      <button class="btn btn-error" on:click={confirmDelete}>Удалить</button>
      <button class="btn btn-secondary" on:click={cancelDelete}>Отмена</button>
    </div>
  </div>
</Modal>

<Toast message={toastMessage} visible={showToast} onClose={() => showToast = false} type="success" /> 