import { useModal } from '~/composables/useModal'
import type { TJob } from '~/models/TJob'
import { useJobsStore } from '~/stores/jobs.ts'
import { STATUS } from '~/constants/index.ts'

export const useJobDialog = (props: Readonly<{ job?: TJob }>) => {
  const modal = useModal()
  const store = useJobsStore()

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

  return {
    form,
    errorMessage,
    isEditMode,
    onSubmit,
    deleteJob,
  }
}
