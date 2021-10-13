import React, { Component } from 'react';

import Navigation from '../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import events from '../../gateway/events';

import './calendar.scss';

class Calendar extends Component {
  state = {
    events,
  };

  render() {
    const { weekDates } = this.props;
    const today = new Date();
    const actualEvents = events.filter(event => event.dateTo > today);
    const closedEvents = events.filter(event => event.dateTo < today);
    console.log(actualEvents);
    console.log(closedEvents);

    return (
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week weekDates={weekDates} events={actualEvents} />
          </div>
        </div>
      </section>
    );
  }
}

export default Calendar;
