<script lang="ts">
  import { onDestroy } from 'svelte';
  export let value: string = '';
  export let onInput: (val: string) => void;
  let inputValue = value;
  let timeout: ReturnType<typeof setTimeout>;

  function handleInput(e: Event) {
    clearTimeout(timeout);
    inputValue = (e.target as HTMLInputElement).value;
    timeout = setTimeout(() => {
      onInput(inputValue);
    }, 100);
  }

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<input
  class="input input-bordered w-full max-w-md mb-4"
  type="text"
  placeholder="Поиск контактов..."
  bind:value={inputValue}
  on:input={handleInput}
/> 