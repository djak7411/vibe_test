<script lang="ts">
  export let message: string = '';
  export let visible: boolean = false;
  export let onClose: () => void;
</script>

{#if visible}
  <div class="fixed top-4 right-4 z-50 bg-red-600 text-white px-6 py-3 rounded shadow-lg flex items-center gap-4 animate-fade-in">
    <span class="flex-1">{message}</span>
    <button class="text-white hover:text-gray-200 text-xl font-bold" on:click={onClose} aria-label="Закрыть">&times;</button>
  </div>
{/if}

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.2s ease;
  }
</style> 