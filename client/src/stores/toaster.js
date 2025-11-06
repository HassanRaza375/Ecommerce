import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

export const useToasterStore = defineStore('toaster', () => {
  const toast = useToast()

  function show({ type = 'info', title = '', detail = '', life = 3000 }) {
    toast.add({
      severity: type,
      summary: title,
      detail,
      life,
    })
  }
  function success(title, detail = '', life = 3000) {
    show({ type: 'success', title, detail, life })
  }

  function error(title, detail = '', life = 3000) {
    show({ type: 'error', title, detail, life })
  }

  function warn(title, detail = '', life = 3000) {
    show({ type: 'warn', title, detail, life })
  }

  return { show, success, error, warn }
})
