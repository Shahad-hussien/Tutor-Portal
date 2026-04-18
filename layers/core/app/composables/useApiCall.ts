export function useApiCall<T>(
    apiFunction: () => Promise<T>, 
    options?: {successMessage?: string}
) {
    const data = ref<T | null>(null)
    const isLoading = ref(false)
    const validationErrors = ref<string | null>(null)

    const execute = async () => {
        isLoading.value = true 
        validationErrors.value = null 

        try {
            data.value = await apiFunction()

            if (options?.successMessage) {
                alert(options.successMessage)
            }
            return data.value
        } catch (error: any) {
            if (error instanceof ValidationError) {
                validationErrors.value = error.message 
            } else {
                alert(error.message || "حدث خطأ.")
            }
        } finally {
            isLoading.value = false
        }
    }
    return {execute, data, isLoading, validationErrors}
}