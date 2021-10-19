import React, { useState } from 'react';

import './event.scss';

const Event = ({ height, marginTop, title, time, id, deleteEventHandler }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [deleteEventWindow, toggleDeleteWindow] = useState(false);

  const showDeleteWindow = event => {
    event.preventDefault();
    if (deleteEventWindow) {
      toggleDeleteWindow(false);
    } else {
      toggleDeleteWindow(true);
    }
  };

  return (
    <div style={eventStyle} id={id} className="event" onClick={showDeleteWindow}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {!deleteEventWindow ? null : (
        <button className="delete-event-btn" onClick={() => deleteEventHandler(id)}>
          <i className="far fa-trash-alt"></i>
          <span className="delete-event-text">Delete</span>
        </button>
      )}
    </div>
  );
};

export default Event;
