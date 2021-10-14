import React, { useState } from 'react';
// import events from '../../gateway/events';
import './event.scss';

const Event = ({ height, marginTop, title, time, id, deleteEventHandler }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [deleteEventAsk, isDelete] = useState(false);

  const showDeleteWindow = event => {
    event.preventDefault();
    if (deleteEventAsk) {
      isDelete(false);
    } else {
      isDelete(true);
    }
  };

  return (
    <div style={eventStyle} id={id} className="event" onClick={showDeleteWindow}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {deleteEventAsk ? (
        <button className="delete-event-btn" onClick={() => deleteEventHandler(id)}>
          <span className="delete-event-text">Delete</span>
        </button>
      ) : null}
    </div>
  );
};

export default Event;
