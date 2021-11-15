import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createEvent } from '../../gateway/eventsGateway';

import './modal.scss';

const Modal = ({ closeEventBtn, fetchEventsHandler, setCreatedWindow }) => {
  const [inputTextTitle, setInputTextTitle] = useState('');
  const [inputTextDescription, setInputTextTitleDescription] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');

  const hanndleChangeTitle = event => {
    setInputTextTitle(event.target.value);
  };

  const hanndleChangeDescription = event => {
    setInputTextTitleDescription(event.target.value);
  };

  const hanndleChangeDate = event => {
    setInputDate(event.target.value);
  };

  const hanndleTimeFrom = event => {
    setTimeFrom(event.target.value);
  };

  const hanndleTimeTo = event => {
    setTimeTo(event.target.value);
  };

  const sumbitBtn = event => {
    event.preventDefault();

    const eventData = {
      title: inputTextTitle,
      description: inputTextDescription,
      dateFrom: new Date(`${inputDate} ${timeFrom}`),
      dateTo: new Date(`${inputDate} ${timeTo}`),
    };

    createEvent(eventData).then(() => fetchEventsHandler());
    setCreatedWindow(false);
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
              value={inputTextTitle}
              onChange={hanndleChangeTitle}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={inputDate}
                onChange={hanndleChangeDate}
                required
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={timeFrom}
                onChange={hanndleTimeFrom}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={timeTo}
                onChange={hanndleTimeTo}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={inputTextDescription}
              onChange={hanndleChangeDescription}
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
};

export default Modal;
