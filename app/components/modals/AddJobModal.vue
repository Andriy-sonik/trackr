<script setup lang="ts">
import AppButton from '~/components/UI/AppButton.vue'
import { useModal } from '~/composables/useModal'
import { useJobsStore } from '~/stores/jobs.ts'

const modal = useModal()
const store = useJobsStore()

const form = ref({
  company: '',
  position: '',
  status: 'interview',
  date: '',
  job_link: '',
  notes: '',
})

const onSubmit = (e: Event) => {
  const newJob = {
    company_name: form.value.company,
    position: form.value.position,
    status: form.value.status,
    date: form.value.date,
    job_link: form.value.job_link,
    notes: form.value.notes,
  }
  try {
    store.addJob(newJob)
    modal.closeTop()
    console.log('New job added:', newJob)
  } catch (error) {
    console.error('Error adding job:', error)
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
          type="text"
          name="company"
          v-model="form.company"
          placeholder="Enter company name"
        />
      </div>
      <div>
        <label for="position">Посада:</label>
        <input
          id="position"
          type="text"
          name="position"
          v-model="form.position"
          placeholder="Enter position"
        />
      </div>
      <div>
        <label for="status">Статус:</label>
        <select
          id="status"
          name="status"
          v-model="form.status"
        >
          <option value="interview">Інтерв'ю</option>
          <option value="applications">Заявки</option>
        </select>
      </div>
      <div>
        <label for="date">Дата:</label>
        <input
          id="date"
          type="date"
          name="date"
          v-model="form.date"
          placeholder="Select date"
        />
      </div>
      <div>
        <label for="job_link">Посилання на вакансію:</label>
        <input
          id="job_link"
          type="url"
          name="job_link"
          v-model="form.job_link"
          placeholder="Enter job link"
        />
      </div>
      <div>
        <label for="notes">Нотатки:</label>
        <textarea
          id="notes"
          name="notes"
          rows="4"
          v-model="form.notes"
          placeholder="Enter notes"
        ></textarea>
      </div>
      <AppButton type="submit">Submit</AppButton>
    </form>
  </div>
</template>

<style scoped>
.modal-content {
  display: grid;
  gap: 1.25rem;
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
