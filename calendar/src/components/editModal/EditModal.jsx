import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './editModal.scss';
import { isEdit } from '../../gateway/eventsCheckSumbit';

const EditModal = ({
  closeEditInfo,
  setInfoEditObj,
  infoEditObj,
  fetchEventsHandler,
  deleteEventHandler,
  updatedEventsList,
}) => {
  const { infoShow, editModal, ...objectToUpdate } = infoEditObj;
  const { id, title, dateFrom, dateTo, description } = objectToUpdate;

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

    isEdit(updatedEventsList, id, eventData, setInfoEditObj, fetchEventsHandler);
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
  updatedEventsList: PropTypes.array.isRequired,
};

export default EditModal;
