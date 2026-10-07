<script setup lang="ts">
import AppButton from '~/components/UI/AppButton.vue'
import { useModal } from '~/composables/useModal'
import type { TJob } from '~/models/TJob'
import { useJobsStore } from '~/stores/jobs.ts'
import { STATUS } from '~/constants/index.ts'

const modal = useModal()
const store = useJobsStore()

const props = defineProps<{
  job?: TJob
}>()

const form = ref({
  company: props.job?.company_name || '',
  position: props.job?.position || '',
  status: props.job?.status || (STATUS.APPLICATIONS as TJob['status']),
  date: props.job ? props.job?.date : new Date().toISOString().slice(0, 16),
  job_link: props.job?.job_link || '',
  notes: props.job?.notes || '',
})

const errorMessage = ref('')

const isEditMode = computed(() => !!props.job)

const onSubmit = async () => {
  const newJob: Omit<TJob, 'id'> = {
    company_name: form.value.company,
    position: form.value.position,
    status: form.value.status,
    date: form.value.date,
    job_link: form.value.job_link,
    notes: form.value.notes,
  }
  console.log('Submitting job:', newJob)

  errorMessage.value = ''
  try {
    if (isEditMode.value && props.job?.id) {
      await store.updateJob(props.job.id, newJob)
    } else {
      await store.addJob(newJob)
    }
    modal.closeTop()
  } catch (error) {
    console.error('Error adding job:', error)
    errorMessage.value = 'Не вдалося зберегти заявку. Спробуйте ще раз.'
  }
}

const deleteJob = async (jobId: string | undefined) => {
  if (!jobId) return
  try {
    await store.deleteJob(jobId)
    modal.closeTop()
  } catch (error) {
    console.error('Error deleting job:', error)
    errorMessage.value = 'Не вдалося видалити заявку. Спробуйте ще раз.'
  }
}
</script>

<template>
  <div class="modal-content">
    <p>Створення нової заявки</p>
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
