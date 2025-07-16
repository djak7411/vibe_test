<script lang="ts">
  export let visible: boolean = false;
  export let onClose: () => void;
</script>

{#if visible}
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" on:click={onClose}></div>
    <div class="relative bg-white rounded-xl shadow-xl p-6 min-w-[320px] max-w-full animate-modal-in">
      <button class="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-600" on:click={onClose} aria-label="Закрыть">&times;</button>
      <slot />
    </div>
  </div>
{/if}

<style>
  @keyframes modal-in {
    from { opacity: 0; transform: translateY(40px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-modal-in {
    animation: modal-in 0.18s cubic-bezier(.4,0,.2,1);
  }
</style> 