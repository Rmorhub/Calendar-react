import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import Day from '../day/Day';
import RedTimeLine from '../redTimeLine/RedTimeLine';

import './week.scss';

const Week = ({ weekDates, events, deleteEventHandler }) => (
  <div className="calendar__week">
    {weekDates.map(dayStart => {
      const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

      const dayEvents = events.filter(
        event => new Date(event.dateFrom) > dayStart && new Date(event.dateTo) < new Date(dayEnd),
      );

      const curentDate = moment(new Date()).format('MMM DD YYYY');
      const dateCurrentWeek = moment(new Date(dayStart)).format('MMM DD YYYY');

      return (
        <div className="calendar__day" data-day={dayStart.getDate()} key={dayStart.getDate()}>
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            deleteEventHandler={deleteEventHandler}
          />
          {curentDate !== dateCurrentWeek ? null : <RedTimeLine />}
        </div>
      );
    })}
  </div>
);

Week.propTypes = {
  weekDates: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  deleteEventHandler: PropTypes.func.isRequired,
};

export default Week;
