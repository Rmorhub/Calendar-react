import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import EventWindow from '../eventWindow/EventWindow';
import EditModal from '../editModal/EditModal';

import { fetchEvents, deleteEvent, fetchEventsForEdit } from '../../gateway/eventsGateway';

import './calendar.scss';

const Calendar = ({ weekDates, setCreatedWindow, createdWindow }) => {
  const [updatedEventsList, setEventsList] = useState([]);
  const [infoEditObj, setInfoEditObj] = useState({ infoShow: false, editModal: false });

  const showInfoWindow = (event, id) => {
    event.preventDefault();
    fetchEventsForEdit(id).then(eventData =>
      setInfoEditObj({ ...eventData, ...{ infoShow: true } }),
    );
  };

  const closeEditInfo = () => {
    setInfoEditObj({ ...{}, ...{ infoShow: false, editModal: false } });
  };

  const modalEditWindow = () => {
    setInfoEditObj({ ...infoEditObj, ...{ infoShow: false, editModal: true } });
  };

  const fetchEventsHandler = () => {
    fetchEvents().then(eventsList => setEventsList(eventsList));
  };

  useEffect(() => {
    fetchEventsHandler();
  }, []);

  const closeEventBtn = () => {
    setCreatedWindow(false);
  };

  const deleteEventHandler = eventId => {
    deleteEvent(eventId)
      .then(() => fetchEventsHandler())
      .then(setInfoEditObj({ ...{}, ...{ infoShow: false, editModal: false } }));
  };

  const isModal = createdWindow && (
    <Modal
    setCreatedWindow={setCreatedWindow}
    updatedEventsList={updatedEventsList}
      closeEventBtn={closeEventBtn}
      fetchEventsHandler={fetchEventsHandler}
    />
  );

  const isEventWindow = infoEditObj.infoShow && (
    <EventWindow
    infoEditObj={infoEditObj}
      closeEditInfo={closeEditInfo}
      modalEditWindow={modalEditWindow}
      deleteEventHandler={deleteEventHandler}
    />
  );

  const isEditModal = infoEditObj.editModal && (
    <EditModal
      updatedEventsList={updatedEventsList}
      infoEditObj={infoEditObj}
      closeEditInfo={closeEditInfo}
      setInfoEditObj={setInfoEditObj}
      fetchEventsHandler={fetchEventsHandler}
      deleteEventHandler={deleteEventHandler}
    />
  );

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
              showInfoWindow={showInfoWindow}
            />
          </div>
        </div>
      </section>
      {isModal || isEventWindow || isEditModal}
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
