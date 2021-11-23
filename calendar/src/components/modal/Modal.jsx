import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { isRender } from '../../gateway/eventsCheckSumbit';

import './modal.scss';

const Modal = ({ closeEventBtn, fetchEventsHandler, setCreatedWindow, updatedEventsList }) => {
  const [eventObj, setEventObj] = useState({
    title: '',
    description: '',
    date: '',
    dateTo: '',
    dateFrom: '',
  });

  const handleChange = event => {
    setEventObj({
      ...eventObj,
      [event.target.name]: event.target.value,
    });
  };

  const sumbitBtn = event => {
    event.preventDefault();

    const eventData = {
      ...eventObj,
      dateFrom: new Date(`${eventObj.date} ${eventObj.dateFrom}`),
      dateTo: new Date(`${eventObj.date} ${eventObj.dateTo}`),
    };

    isRender(updatedEventsList, eventData, fetchEventsHandler, setCreatedWindow);
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={closeEventBtn}>
            +
          </button>
          <form className="event-form" onSubmit={sumbitBtn}>
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
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeEventBtn: PropTypes.func.isRequired,
  fetchEventsHandler: PropTypes.func.isRequired,
  setCreatedWindow: PropTypes.func.isRequired,
  updatedEventsList: PropTypes.array.isRequired,
};

export default Modal;
