import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './eventWindow.scss';

const EventWindow = ({ closeEditInfo, infoEditObj, modalEditWindow, deleteEventHandler }) => {
  const { title, description, dateFrom, dateTo, id } = infoEditObj;
  const started = new Date(dateFrom);
  const finished = new Date(dateTo);
  const currentDate = new Date();

  const isActualEvent = finished < currentDate ? 'Finished event:' : 'Event:';
  const isActualDateFrom =
    started < currentDate ? 'The event has started on:' : 'The event will start on:';
  const isActualDateTo =
    finished < currentDate ? 'The event is over on:' : 'The event will end on:';

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="event_create-event">
          <div className="event_create-event_buttons">
            <button
              className="event_create-event__delete-btn"
              onClick={() => deleteEventHandler(id)}
            >
              <i className="fas fa-trash" />
            </button>
            <button className="event_create-event__close-btn" onClick={closeEditInfo}>
              +
            </button>
          </div>
          <div className="event__container">
            <h3 className="event__title-h3">{isActualEvent}</h3>
            <span className="event__title">{title}</span>
            <h3 className="event__title-h3">{isActualDateFrom}</h3>
            <span className="event__date-from">
              {moment(dateFrom).format(' dddd, MMMM Do, YYYY HH:mm')}
            </span>
            <h3 className="event__title-h3">{isActualDateTo}</h3>
            <span className="event__date-to">
              {moment(dateTo).format(' dddd, MMMM Do, YYYY HH:mm')}
            </span>
            <h3 className="event__title-h3">Description:</h3>
            <span className="event__description">{description}</span>
          </div>
          <button className="event_create-event__edit-btn" onClick={modalEditWindow}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

EventWindow.propTypes = {
  closeEditInfo: PropTypes.func.isRequired,
  infoEditObj: PropTypes.object.isRequired,
  modalEditWindow: PropTypes.func.isRequired,
  deleteEventHandler: PropTypes.func.isRequired,
};

export default EventWindow;
