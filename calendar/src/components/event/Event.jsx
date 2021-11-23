import React from 'react';
import PropTypes from 'prop-types';

import './event.scss';

const Event = ({ height, marginTop, title, time, id, showInfoWindow, dateFrom, dateTo }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const started = new Date(dateFrom);
  const finished = new Date(dateTo);
  const currentDate = new Date();

  const isFinished = currentDate > (started && finished) ? 'finished-event' : 'actual-event';

  return (
    <>
      <div
        style={eventStyle}
        id={id}
        className={`event ${isFinished}`}
        onClick={event => showInfoWindow(event, id)}
      >
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
    </>
  );
};

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  showInfoWindow: PropTypes.func.isRequired,
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
};

export default Event;
