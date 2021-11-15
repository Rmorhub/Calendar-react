import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';

import { fetchEvents, createEvent, deleteEvent, getObjectForm } from '../../gateway/eventsGateway';

import './calendar.scss';

const Calendar = ({ weekDates, setCreatedWindow, createdWindow }) => {
  const [updatedEventsList, setEventsList] = useState([]);

  const fetchEventsHandler = () => {
    fetchEvents().then(eventsList => setEventsList(eventsList));
  };

  useEffect(() => {
    fetchEventsHandler();
  }, []);

  const createBtn = event => {
    event.preventDefault();

    createEvent(getObjectForm()).then(() => fetchEventsHandler());
    setCreatedWindow(false);
  };

  const closeEventBtn = () => {
    setCreatedWindow(false);
  };

  const deleteEventHandler = eventId => {
    deleteEvent(eventId).then(() => fetchEventsHandler());
  };

  return (
    <>
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week
              weekDates={weekDates}
              events={updatedEventsList}
              deleteEventHandler={deleteEventHandler}
            />
          </div>
        </div>
      </section>
      {createdWindow && <Modal closeEventBtn={closeEventBtn} createBtn={createBtn} />}
    </>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  setCreatedWindow: PropTypes.func.isRequired,
  createdWindow: PropTypes.bool,
};

Calendar.defaultProps = {
  createdWindow: false,
};

export default Calendar;
