export type ModalName = 'DetailedJob' | 'ConfirmAction'

export type ModalInstance = {
  id: string
  name: ModalName
  props: Record<string, unknown>
}

export const useModal = () => {
  const stack = useState<ModalInstance[]>('modal-stack', () => [])

  const open = (name: ModalName, props: Record<string, unknown> = {}) => {
    stack.value.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name,
      props,
    })
  }

  const closeTop = () => {
    stack.value.pop()
  }

  const closeAll = () => {
    stack.value = []
  }

  return {
    stack,
    open,
    closeTop,
    closeAll,
  }
}
