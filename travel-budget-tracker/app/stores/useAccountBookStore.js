import { defineStore } from 'pinia'

export const useAccountBookStore = defineStore('accountBook', () => {
  const supabase = useSupabaseClient()
  const accountBooks = ref([])
  const { toUTC } = useTimezoneAdjust()

  const fetchAccountBooks = async () => {
    const { data, error } = await supabase.from('account_books').select('*')

    if (error) throw error
    accountBooks.value = data.map(book => ({
      ...book,
      country: { label: book.country_label, value: book.country_value }
    }))
  }

  const createAccountBooks = async (formData) => {
    const insertedData = {
      ...formData,
      created_at: toUTC(new Date())
    }
    const { data, error } = await supabase.from('account_books').insert([insertedData]).select()
    console.log(insertedData, data)

    if (error) throw error
    accountBooks.value.push(data[0])
  }

  return { accountBooks, fetchAccountBooks, createAccountBooks }
})