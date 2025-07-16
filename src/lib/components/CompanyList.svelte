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

{#if companies.length === 0}
  <div class="flex flex-col items-center py-12 text-gray-400">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 01.88 7.88M8 7a4 4 0 00-.88 7.88M12 17v2m0 0h-2m2 0h2" /></svg>
    <div class="text-lg font-medium">Нет компаний</div>
    <div class="text-sm mt-1">Добавьте первую компанию, чтобы начать!</div>
  </div>
{:else}
<ul class="divide-y divide-gray-100 rounded-lg shadow bg-white max-w-4xl mx-auto w-full sm:w-auto">
  {#each companies as company}
    <li class="flex flex-row sm:flex-row items-start sm:items-center gap-2 px-2 sm:px-4 py-3 hover:bg-gray-50 transition group">
      <span class="flex-1 font-semibold w-full sm:w-auto">{company.name}</span>
      <div class="flex gap-2 sm:w-auto">
        <button class="btn btn-xs btn-secondary flex-1 sm:flex-none mr-0 sm:mr-4 cursor-pointer items-center gap-1 group/edit" title="Редактировать" on:click={() => onEdit(company)}>
          Редактировать
        </button>
        <button class="btn btn-xs btn-error flex-1 sm:flex-none cursor-pointer items-center gap-1 group/delete" title="Удалить" aria-label="Удалить компанию" on:click={() => handleDeleteClick(company)}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </li>
  {/each}
</ul>
{/if}

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