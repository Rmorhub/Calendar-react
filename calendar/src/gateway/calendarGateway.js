export const currentDate = new Date();

export const getCurrentDate = date => new Date(date).getDate();

export const redTimeLine = () => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const dayToday = currentDate.getDate();
  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth();

  const currentTime = new Date().getHours();
  const currentDay = new Date().getDate();
  if (currentYear === thisYear && currentMonth === thisMonth && dayToday === currentDay) {
    const dayElem = document.querySelector(`[data-day="${currentDay}"]`);
    const timeElem = dayElem.querySelector(`[data-time="${currentTime !== 0 ? currentTime : 0}"]`);
    timeElem.classList.add('red-line');
  }
};
