import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchUpdatedEvent } from '../../gateway/eventsGateway';

import './editModal.scss';

const EditModal = ({
  closeEditInfo,
  setInfoEditObj,
  infoEditObj,
  fetchEventsHandler,
  deleteEventHandler,
}) => {
  const { infoShow, editModal, id, ...objectToUpdate } = infoEditObj;
  const { title, dateFrom, dateTo, description } = objectToUpdate;

  const eventObjectToEdit = {
    title,
    date: moment(new Date(dateFrom)).format('YYYY-MM-DD'),
    dateFrom: moment(new Date(dateFrom)).format('HH:mm'),
    dateTo: moment(new Date(dateTo)).format('HH:mm'),
    description,
  };
  const [eventObj, setEventObj] = useState(eventObjectToEdit);

  const handleChange = event => {
    setEventObj({
      ...eventObj,
      [event.target.name]: event.target.value,
    });
  };

  const editBtn = event => {
    event.preventDefault();

    const eventData = {
      ...eventObj,
      dateFrom: new Date(`${eventObj.date} ${eventObj.dateFrom}`),
      dateTo: new Date(`${eventObj.date} ${eventObj.dateTo}`),
    };

    const isUpdate =
      eventData.dateFrom > eventData.dateTo
        ? alert('Event should be starting before ending , please input corrent time')
        : fetchUpdatedEvent(id, eventData)
            .then(setInfoEditObj({ ...{}, ...{ isShow: false, editModal: false } }))
            .then(fetchEventsHandler);

    return isUpdate;
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="edit_create-event">
          <div className="edit_create-event_buttons">
            <button
              type="submit"
              className="edit_create-event__delete-btn"
              onClick={() => deleteEventHandler(id)}
            >
              <i className="fas fa-trash" />
            </button>
            <button className="edit_create-event__close-btn" onClick={closeEditInfo}>
              +
            </button>
          </div>
          <form className="event-form" onSubmit={editBtn}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={eventObj.title}
              onChange={handleChange}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={eventObj.date}
                onChange={handleChange}
                required
              />
              <input
                type="time"
                name="dateFrom"
                className="event-form__field"
                value={eventObj.dateFrom}
                onChange={handleChange}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="dateTo"
                className="event-form__field"
                value={eventObj.dateTo}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={eventObj.description}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="event-form__confirm-btn">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  closeEditInfo: PropTypes.func.isRequired,
  setInfoEditObj: PropTypes.func.isRequired,
  infoEditObj: PropTypes.object.isRequired,
  fetchEventsHandler: PropTypes.func.isRequired,
  deleteEventHandler: PropTypes.func.isRequired,
};

export default EditModal;
