export const useTimezoneAdjust = () => {
  // 로컬 -> UTC
  const toUTC = (date) => {
    if (!date) return null;
    return new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
  };

  // UTC -> 로컬
  const toLocal = (date) => {
    if (!date) return null;
    const utcDate = typeof date === "string" ? new Date(date) : date;
    return new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
  };

  return { toUTC, toLocal };
};
