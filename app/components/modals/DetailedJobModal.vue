<script setup lang="ts">
import { useJobDialog } from '~/composables/useJobDialog'
import type { TJob } from '~/models/TJob'

const props = defineProps<{
  job?: TJob
}>()

const { form, errorMessage, isEditMode, onSubmit, deleteJob } = useJobDialog(props)
</script>

<template>
  <div class="modal-content">
    <p>Створення заявки / Редагування заявки</p>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="company">Компанія:</label>
        <input
          id="company"
          v-model="form.company"
          type="text"
          name="company"
          placeholder="Enter company name"
        />
      </div>
      <div>
        <label for="position">Посада:</label>
        <input
          id="position"
          v-model="form.position"
          type="text"
          name="position"
          placeholder="Enter position"
        />
      </div>
      <div>
        <label for="status">Статус:</label>
        <select
          id="status"
          v-model="form.status"
          name="status"
        >
          <option value="interview">Інтерв'ю</option>
          <option value="applications">Заявки</option>
        </select>
      </div>
      <div>
        <label for="date">Дата:</label>
        <input
          id="date"
          v-model="form.date"
          type="datetime-local"
          name="date"
          placeholder="Select date"
        />
      </div>
      <div>
        <label for="job_link">Посилання на вакансію:</label>
        <input
          id="job_link"
          v-model="form.job_link"
          type="url"
          name="job_link"
          placeholder="Enter job link"
        />
      </div>
      <div>
        <label for="notes">Нотатки:</label>
        <textarea
          id="notes"
          v-model="form.notes"
          name="notes"
          rows="4"
          placeholder="Enter notes"
        ></textarea>
      </div>
      <p
        v-if="errorMessage"
        role="alert"
      >
        {{ errorMessage }}
      </p>
      <div class="modal-actions">
        <AppButton type="submit">{{ isEditMode ? 'Update Job' : 'Submit Job' }}</AppButton>
        <AppButton
          v-if="isEditMode && props?.job?.id"
          type="button"
          variant="danger"
          @click="deleteJob(props.job?.id)"
        >
          Delete job
        </AppButton>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.modal-content {
  @apply tw-grid tw-gap-2;
}
.modal-actions {
  @apply tw-flex tw-flex-row tw-gap-1 tw-justify-between tw-mt-2;
}
form {
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  input,
  textarea,
  select {
    background: rgba(255, 255, 255, 0.1);
    min-height: 2rem;
    border-radius: 0.25rem;
    padding: 0.5rem;
  }
  option {
    background: #1f2937;
  }
}
</style>
