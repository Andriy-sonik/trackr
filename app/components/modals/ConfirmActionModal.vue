<script setup lang="ts">
import AppButton from '~/components/UI/AppButton.vue'
import { useModal } from '~/composables/useModal'

withDefaults(defineProps<{ message?: string }>(), {
  message: 'Ця модалка відкрилася поверх попередньої.',
})

const modal = useModal()
</script>

<template>
  <div class="modal-content">
    <p>{{ message }}</p>
    <div class="modal-content__actions">
      <AppButton
        variant="secondary"
        @click="modal.closeTop()"
      >
        Назад
      </AppButton>
      <AppButton
        variant="ghost"
        @click="modal.closeAll()"
      >
        Закрити всі
      </AppButton>
    </div>
  </div>
</template>

<style scoped>
.modal-content {
  display: grid;
  gap: 1.25rem;
}

p {
  margin: 0;
  color: #d1d5db;
}

.modal-content__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>