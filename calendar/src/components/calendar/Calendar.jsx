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

    const deleteEventHandler = eventId => {
      const filtered = events.filter(elem => elem.id !== eventId);
      events.splice(0, events.length);
      filtered.forEach(elem => events.push(elem));
      this.setState({
        events,
      });
    };

    return (
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week
              weekDates={weekDates}
              events={this.state.events}
              deleteEventHandler={deleteEventHandler}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Calendar;
