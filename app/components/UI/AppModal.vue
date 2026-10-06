<script setup lang="ts">
import DetailedJobModal from '~/components/modals/DetailedJobModal.vue'
import ConfirmActionModal from '~/components/modals/ConfirmActionModal.vue'
import { useModal } from '~/composables/useModal'

const modal = useModal()
const stack = modal.stack
const modalComponents = {
  DetailedJob: DetailedJobModal,
  ConfirmAction: ConfirmActionModal,
}
const modalTitles = {
  DetailedJob: 'Деталі заявки',
  ConfirmAction: 'Підтвердження дії',
}

const titleId = `modal-title-${Math.random().toString(36).slice(2)}`
</script>

<template>
  <Teleport to="body">
    <div
      v-for="entry in stack"
      :key="entry.id"
      class="app-modal__backdrop"
      @click.self="modal.closeTop()"
    >
      <section
        class="app-modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`${titleId}-${entry.id}`"
        tabindex="-1"
        @keydown.esc.prevent="modal.closeTop()"
      >
        <header class="app-modal__header">
          <h2
            :id="`${titleId}-${entry.id}`"
            class="app-modal__title"
          >
            {{ modalTitles[entry.name] }}
          </h2>
          <button
            class="app-modal__close"
            type="button"
            aria-label="Закрити модальне вікно"
            @click="modal.closeTop()"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div class="app-modal__body">
          <component
            :is="modalComponents[entry.name]"
            v-bind="entry.props"
          />
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.app-modal__backdrop {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
  padding: 1.25rem;
  background: rgb(0 0 0 / 65%);
}

.app-modal {
  width: min(100%, 32rem);
  max-height: min(90vh, 48rem);
  overflow-y: auto;
  border: 1px solid rgb(148 163 184 / 25%);
  border-radius: 0.5rem;
  background: #1f2937;
  color: #f9fafb;
  box-shadow: 0 24px 70px rgb(0 0 0 / 45%);
}

.app-modal:focus {
  outline: none;
}

.app-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgb(148 163 184 / 20%);
}

.app-modal__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.app-modal__close {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 0.25rem;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 1.5rem;
}

.app-modal__close:hover {
  background: rgb(255 255 255 / 10%);
}

.app-modal__close:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}

.app-modal__body {
  padding: 1.5rem;
}
</style>
