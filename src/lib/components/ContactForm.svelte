<script lang="ts">
  import type { Contact, Company } from '../types';
  import ErrorToast from './ErrorToast.svelte';
  export let companies: Company[] = [];
  export let contact: Partial<Contact> = {};
  export let isEdit: boolean = false;
  export let submit: (event: { contact: Partial<Contact> }) => void;
  export let cancel: () => void;
  let localContact: Partial<Contact> = { ...contact };
  let error: string = '';
  let showError: boolean = false;

  function validate(): boolean {
    if (!localContact.name || !localContact.phone || !localContact.email) {
      error = 'Пожалуйста, заполните все поля';
      return false;
    }
    // Простая валидация email
    if (!/^\S+@\S+\.\S+$/.test(localContact.email)) {
      error = 'Некорректный email';
      return false;
    }
    // Валидация телефона по маске +7-XXX-XXX-XX-XX
    if (!/^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/.test(localContact.phone)) {
      error = 'Телефон должен быть в формате +7-XXX-XXX-XX-XX';
      return false;
    }
    return true;
  }

  function handlePhoneInput(event: Event): void {
    let value = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    if (value.startsWith('7')) value = value.slice(1); // убираем лишнюю 7 если пользователь ввёл её вручную
    value = value.slice(0, 10); // максимум 10 цифр после +7
    let formatted = '+7';
    if (value.length > 0) formatted += '-' + value.slice(0, 3);
    if (value.length > 3) formatted += '-' + value.slice(3, 6);
    if (value.length > 6) formatted += '-' + value.slice(6, 8);
    if (value.length > 8) formatted += '-' + value.slice(8, 10);
    localContact.phone = formatted;
  }

  function handleSubmit(): void {
    if (validate()) {
      submit({ contact: localContact });
      localContact = {};
    } else {
      showError = true;
    }
  }

  function closeToast(): void {
    showError = false;
  }
</script>
<ErrorToast message={error} visible={showError} onClose={closeToast} />
<form class="flex flex-col gap-2 p-4 bg-white rounded shadow w-full max-w-md mx-auto" on:submit|preventDefault={handleSubmit}>
  <h3 class="text-lg font-bold mb-2">{isEdit ? 'Редактировать контакт' : 'Добавить контакт'}</h3>
  <input class="input input-bordered bg-gray-100 p-2 rounded-md" bind:value={localContact.name} placeholder="Имя" required />
  <input class="input input-bordered bg-gray-100 p-2 rounded-md" bind:value={localContact.phone} placeholder="Телефон" required on:input={handlePhoneInput} maxlength="16" />
  <input class="input input-bordered bg-gray-100 p-2 rounded-md" bind:value={localContact.email} placeholder="Email" required type="email" />
  <select class="input input-bordered bg-gray-100 p-2 rounded-md" bind:value={localContact.companyId}>
    <option value="" disabled selected>Выберите компанию</option>
    {#each companies as company}
      <option value={company.id}>{company.name}</option>
    {/each}
  </select>
  <div class="flex gap-2 mt-2">
    <button class="btn btn-primary cursor-pointer" type="submit">{isEdit ? 'Сохранить' : 'Добавить'}</button>
  </div>
</form> 