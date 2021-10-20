import React from 'react';
import PropTypes from 'prop-types';

import Hour from '../hour/Hour';

import './day.scss';

const Day = ({ dataDay, dayEvents, deleteEventHandler }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return hours.map(hour => {
    const hourEvents = dayEvents.filter(event => new Date(event.dateFrom).getHours() === hour);

    return (
      <Hour
        key={dataDay + hour}
        dataHour={hour}
        hourEvents={hourEvents}
        deleteEventHandler={deleteEventHandler}
      />
    );
  });
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.array.isRequired,
  deleteEventHandler: PropTypes.func,
};

export default Day;
