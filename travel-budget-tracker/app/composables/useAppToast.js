export const useAppToast = () => {
  const toast = useToast()

  return {
    toastSuccess: ({ title, description = null, actionLabel, actionClick = null }) => {
      toast.add({
        title,
        description,
        icon: 'i-heroicons-check-circle',
        color: 'blue',
        timeout: 0,
        pauseTimeoutOnHover: false,
        closeButton: null,
        actions: [{
          label: actionLabel,
          color: 'black',
          click: actionClick,
          size: 'sm'
        }],
        ui: { strategy: 'override', title: 'text-lg font-bold', icon: { base: 'w-6 h-6' } }
      })
    },
    toastFailure: ({ title, description = null, actionLabel, actionClick = null }) => {
      toast.add({
        title,
        description,
        icon: 'i-heroicons-exclamation-circle',
        color: 'red',
        timeout: 0,
        pauseTimeoutOnHover: false,
        closeButton: null,
        actions: [{
          label: actionLabel,
          color: 'black',
          click: actionClick,
          size: 'sm'
        }],
        ui: { strategy: 'override', title: 'text-lg font-bold', icon: { base: 'w-6 h-6' } }
      })
    }
  }
}