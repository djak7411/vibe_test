<script lang="ts">
  export let message: string = '';
  export let visible: boolean = false;
  export let onClose: () => void;
</script>

{#if visible}
  <div
    class="absolute right-0 top-0 mt-2 mr-2 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4 animate-fade-in z-50"
    style="background: rgba(220, 38, 38, 0.8); min-width:220px;"
  >
    <span class="flex-1">{message}</span>
    <button class="text-white hover:text-gray-200 text-xl font-bold" on:click={onClose} aria-label="Закрыть">&times;</button>
  </div>
{/if}

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.2s ease;
  }
</style> 