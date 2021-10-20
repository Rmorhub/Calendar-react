import React from 'react';
import moment from 'moment';
import Day from '../day/Day';
import Redline from '../redTimeLine/RedLine';

import './week.scss';

const Week = ({ weekDates, events, deleteEventHandler }) => (
  <div className="calendar__week">
    {weekDates.map(dayStart => {
      const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

      // getting all events from the day we will render
      const dayEvents = events.filter(
        event => new Date(event.dateFrom) > dayStart && new Date(event.dateTo) < new Date(dayEnd),
      );

      const curentDate = new Date();
      const dateCurrentWeek = new Date(dayStart);

      return (
        <div className="calendar__day" data-day={dayStart.getDate()} key={dayStart.getDate()}>
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            deleteEventHandler={deleteEventHandler}
          />
          {moment(curentDate).format('MMM DD YYYY') !==
          moment(dateCurrentWeek).format('MMM DD YYYY') ? null : (
            <Redline />
          )}
        </div>
      );
    })}
  </div>
);

export default Week;
