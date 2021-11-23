import moment from 'moment';

import { createEvent, fetchUpdatedEvent } from './eventsGateway';

export const isRender = (updatedEventsList, eventData, fetchEventsHandler, setCreatedWindow) => {
  const canCreateFrom = updatedEventsList.map(
    el =>
      !moment(new Date(eventData.dateFrom)).isBetween(new Date(el.dateFrom), new Date(el.dateTo)),
  );

  const canCreateTo = updatedEventsList.map(
    el => !moment(new Date(eventData.dateTo)).isBetween(new Date(el.dateFrom), new Date(el.dateTo)),
  );

  const canCreateFromEvent = updatedEventsList.map(
    el =>
      !moment(new Date(el.dateFrom)).isBetween(
        new Date(eventData.dateFrom),
        new Date(eventData.dateTo),
      ),
  );

  const canCreateToEvent = updatedEventsList.map(
    el =>
      !moment(new Date(el.dateTo)).isBetween(
        new Date(eventData.dateFrom),
        new Date(eventData.dateTo),
      ),
  );

  const canCreate = [
    ...canCreateFrom,
    ...canCreateTo,
    ...canCreateFromEvent,
    ...canCreateToEvent,
  ].every(el => el === true);

  if (eventData.dateFrom > eventData.dateTo) {
    alert('The event cannot start later than end');
  } else if (canCreate) {
    createEvent(eventData)
      .then(() => fetchEventsHandler())
      .then(setCreatedWindow(false));
  } else {
    alert('Events cannot across');
  }
};

export const isEdit = (updatedEventsList, id, eventData, setInfoEditObj, fetchEventsHandler) => {
  const filteredEvent = updatedEventsList.filter(el => el.id !== id);

  const canCreateFrom = filteredEvent.map(
    el =>
      !moment(new Date(eventData.dateFrom)).isBetween(new Date(el.dateFrom), new Date(el.dateTo)),
  );

  const canCreateTo = filteredEvent.map(
    el => !moment(new Date(eventData.dateTo)).isBetween(new Date(el.dateFrom), new Date(el.dateTo)),
  );

  const canCreateFromEvent = filteredEvent.map(
    el =>
      !moment(new Date(el.dateFrom)).isBetween(
        new Date(eventData.dateFrom),
        new Date(eventData.dateTo),
      ),
  );

  const canCreateToEvent = filteredEvent.map(
    el =>
      !moment(new Date(el.dateTo)).isBetween(
        new Date(eventData.dateFrom),
        new Date(eventData.dateTo),
      ),
  );

  const canCreate = [
    ...canCreateFrom,
    ...canCreateTo,
    ...canCreateFromEvent,
    ...canCreateToEvent,
  ].every(el => el === true);

  if (eventData.dateFrom > eventData.dateTo) {
    alert('The event cannot start later than end');
  } else if (canCreate) {
    fetchUpdatedEvent(id, eventData)
      .then(setInfoEditObj({ ...{}, ...{ isShow: false, editModal: false } }))
      .then(fetchEventsHandler);
  } else {
    alert('Events cannot across');
  }
};
