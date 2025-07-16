<script lang="ts">
  import ErrorToast from './ErrorToast.svelte';
  let name = '';
  export let submit: (event: { name: string }) => void;
  let error = '';
  let showError = false;
  function validate() {
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
  function handleSubmit() {
    if (validate()) {
      submit({ name });
      name = '';
    } else {
      showError = true;
    }
  }
  function closeToast() {
    showError = false;
  }
</script>

<div class="relative">
  <ErrorToast message={error} visible={showError} onClose={closeToast} />
  <form class="flex flex-row gap-2 p-2" on:submit|preventDefault={handleSubmit}>
    <input class="input input-bordered" bind:value={name} placeholder="Новая компания" required />
    <button class="btn btn-primary" type="submit">Добавить</button>
  </form> 
</div>