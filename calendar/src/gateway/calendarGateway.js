export const getCurrentDate = date => new Date(date).getDate();

export const redLine = () => {
  const thisDay = new Date().getDate();
  const currentTime = new Date().getHours();

  const dayElem = document.querySelector(`[data-day="${thisDay}"]`);
  const timeElem = dayElem.querySelector(
    `[data-time="${currentTime !== 0 ? currentTime + 1 : 1}"]`,
  );
  timeElem.classList.add('red-line');
};