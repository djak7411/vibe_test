<script lang="ts">
  import type { Contact, Company } from '../types';
  import ErrorToast from './ErrorToast.svelte';
  export let companies: Company[] = [];
  export let contact: Partial<Contact> = {};
  export let isEdit: boolean = false;
  export let submit: (event: { contact: Partial<Contact> }) => void;
  export let cancel: () => void;
  let localContact: Partial<Contact> = { ...contact };
  let error = '';
  let showError = false;

  function validate() {
    if (!localContact.name || !localContact.phone || !localContact.email || !localContact.companyId) {
      error = 'Пожалуйста, заполните все поля';
      return false;
    }
    // Простая валидация email
    if (!/^\S+@\S+\.\S+$/.test(localContact.email)) {
      error = 'Некорректный email';
      return false;
    }
    return true;
  }

  function handleSubmit() {
    if (validate()) {
      submit({ contact: localContact });
      localContact = {};
    } else {
      showError = true;
    }
  }
  function handleCancel() {
    cancel();
  }
  function closeToast() {
    showError = false;
  }
</script>

<ErrorToast message={error} visible={showError} onClose={closeToast} />

<form class="flex flex-col gap-2 p-4 bg-white rounded shadow w-full max-w-md mx-auto" on:submit|preventDefault={handleSubmit}>
  <h3 class="text-lg font-bold mb-2">{isEdit ? 'Редактировать контакт' : 'Добавить контакт'}</h3>
  <input class="input input-bordered" bind:value={localContact.name} placeholder="Имя" required />
  <input class="input input-bordered" bind:value={localContact.phone} placeholder="Телефон" required />
  <input class="input input-bordered" bind:value={localContact.email} placeholder="Email" required type="email" />
  <select class="input input-bordered" bind:value={localContact.companyId} required>
    <option value="" disabled selected>Выберите компанию</option>
    {#each companies as company}
      <option value={company.id}>{company.name}</option>
    {/each}
  </select>
  <div class="flex gap-2 mt-2">
    <button class="btn btn-primary" type="submit">{isEdit ? 'Сохранить' : 'Добавить'}</button>
    {#if isEdit}
      <button class="btn btn-secondary" type="button" on:click={handleCancel}>Отмена</button>
    {/if}
  </div>
</form> 