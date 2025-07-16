<script lang="ts">
  export let message: string = '';
  export let visible: boolean = false;
  export let onClose: () => void;
  export let type: 'error' | 'success' = 'error';
</script>

{#if visible}
  <div
    class="fixed right-0 top-0 mt-8 mr-8 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4 animate-fade-in z-50"
    style="min-width:220px; background: {type === 'success' ? 'rgba(34,197,94,0.85)' : 'rgba(220,38,38,0.8)'};"
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