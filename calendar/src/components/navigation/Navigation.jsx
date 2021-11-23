import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { days } from '../../utils/dateUtils.js';

const Navigation = ({ weekDates }) => {
  const day = moment(new Date()).format('YYYY-MM-DD');

  return (
    <header className="calendar__header">
      {weekDates.map(dayDate => (
        <div key={dayDate.getDay()} className="calendar__day-label day-label">
          <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
          <span
            className={`day-label__day-number ${
              moment(new Date(dayDate)).format('YYYY-MM-DD') === day ? 'current-day' : 'day'
            }`}
          >
            {dayDate.getDate()}
          </span>
        </div>
      ))}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.array.isRequired,
};

export default Navigation;
