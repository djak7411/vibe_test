<script lang="ts">
  import { onMount } from 'svelte';
  import type { Company } from '../types';
  import ErrorToast from './ErrorToast.svelte';
  export let submit: (event: { name: string }) => void;
  export let company: Partial<Company> = {};
  let name: string = '';
  let error: string = '';
  let showError: boolean = false;

  onMount(() => {
    name = company?.name || '';
  });
  $: if (company && company.name !== undefined) {
    name = company.name;
  }
  function validate(): boolean {
    if (!name.trim()) {
      error = 'Введите название компании';
      return false;
    }
    if (name.trim().length < 2) {
      error = 'Название слишком короткое';
      return false;
    }
    return true;
  }
  function handleSubmit(): void {
    if (validate()) {
      submit({ name });
      name = '';
    } else {
      showError = true;
    }
  }
  function closeToast(): void {
    showError = false;
  }
</script>

<ErrorToast message={error} visible={showError} onClose={closeToast} />

<form class="flex flex-row gap-2 p-2" on:submit|preventDefault={handleSubmit}>
  <input class="input input-bordered bg-gray-100 p-2 rounded-md" bind:value={name} placeholder="Новая компания" required />
  <button class="btn btn-primary cursor-pointer" type="submit">{company && company.id ? 'Сохранить' : 'Добавить'}</button>
</form> 