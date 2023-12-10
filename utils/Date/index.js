export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};
export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (departure_date = tomorrow.toISOString().split("T")[0]);
};
