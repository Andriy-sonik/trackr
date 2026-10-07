<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array as PropType<{ code: string }[]>,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])
const slots = useSlots()
const isFocused = ref(false)

const toggleDropdown = () => {
  isFocused.value = !isFocused.value
}

const onSelectItem = (item: { code: string }) => {
  emit('update:modelValue', item.code)
  isFocused.value = false
}
const dropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isFocused.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
<template lang="">
  <div
    ref="dropdownRef"
    class="dropdown"
    :class="{ 'is-focused': isFocused }"
  >
    <div
      class="dropdown-trigger"
      @click="toggleDropdown"
    >
      <span v-if="!slots.trigger">{{ modelValue }}</span>
      <slot name="trigger"></slot>
    </div>

    <div class="dropdown-content">
      <slot name="content">
        <ul>
          <li
            v-for="item in data"
            :key="item.code"
            :class="{ 'is-selected': modelValue === item.code }"
            class="dropdown-content__item"
            @click="() => onSelectItem(item)"
          >
            <span>{{ item.code }}</span>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: inline-block;
  &.is-focused {
    .dropdown-content {
      content-visibility: visible;
      @apply tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded tw-shadow-lg;
      @apply tw-p-1 tw-mt-2 tw-z-10;
    }
  }
}
.dropdown-trigger {
  @apply tw-cursor-pointer tw-border tw-border-gray-700 tw-rounded tw-shadow-lg tw-p-1;
}

.dropdown-content {
  content-visibility: hidden;
  position: absolute;
  &__item {
    @apply tw-p-2 tw-cursor-pointer tw-text-white tw-rounded;
    &:hover {
      @apply tw-bg-gray-700;
    }

    &.is-selected {
      @apply tw-text-yellow-500;
    }
  }
}
</style>
