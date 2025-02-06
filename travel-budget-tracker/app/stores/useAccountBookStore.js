import { defineStore } from 'pinia'

export const useAccountBookStore = defineStore('accountBook', () => {
  const supabase = useSupabaseClient()
  const accountBooks = ref([])
  const isLoading = ref(false) // fetch 중에 데이터 없는 것으로 취급되는 현상 때문에 로딩 추가
  const { toUTC } = useTimezoneAdjust()

  // 가계부 목록 불러오기
  const fetchAccountBooks = async () => {
    isLoading.value = true

    const { data, error } = await supabase.from('account_books').select('*')

    if (error) {
      isLoading.value = false
      throw error
    }

    accountBooks.value = data.map(book => ({
      ...book,
      country: { label: book.country_label, value: book.country_value }
    }))

    isLoading.value = false
  }

  // 가계부 생성하기
  const createAccountBooks = async (formData) => {
    const insertedData = {
      ...formData,
      created_at: toUTC(new Date())
    }
    const { data, error } = await supabase.from('account_books').insert([insertedData]).select()

    if (error) throw error

    accountBooks.value.push(data[0])
  }

  return { accountBooks, isLoading, fetchAccountBooks, createAccountBooks }
})