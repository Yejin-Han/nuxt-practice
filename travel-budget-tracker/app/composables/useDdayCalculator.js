export const useDdayCalculator = () => {
  const { toLocal } = useTimezoneAdjust()

  const calculateDday = (startDate) => {
    if (!startDate) return null

    const today = new Date()
    const startDay = new Date(startDate)

    // 날짜만 비교하기 때문에 같은 00시로 맞춰줌
    today.setHours(0, 0, 0, 0);
    startDay.setHours(0, 0, 0, 0);

    const diff = Math.floor((startDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) // 1일은 24시간 * 60분 * 60초 * 1000밀리초

    if (diff === 0) return "D-day!"
    return diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`
  }

  return { calculateDday }
}