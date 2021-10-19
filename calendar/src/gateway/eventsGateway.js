const baseUrl = 'https://6140a15a357db50017b3d77d.mockapi.io/api/v1/events';

export const fetchEvents = () =>
  fetch(baseUrl).then(response => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
    return response.json();
  });

export const createEvent = eventObj =>
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventObj),
  }).then(response => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
    return response.json();
  });

export const deleteEvent = eventId =>
  fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
  });

export const getObjectForm = () => {
  const form = document.querySelector('.event-form');
  const userData = Object.fromEntries(new FormData(form));
  const { title, description, date, startTime, endTime } = userData;

  return {
    title,
    description,
    dateFrom: new Date(`${date} ${startTime}`),
    dateTo: new Date(`${date} ${endTime}`),
  };
};
