import React, { useEffect, useState } from 'react';

import Navigation from '../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';

import './calendar.scss';

const baseUrl = 'https://6140a15a357db50017b3d77d.mockapi.io/api/v1/events';

const Calendar = ({ weekDates, setCreatedWindow, createdWindow }) => {
  const [updatedEventsList, setEventsList] = useState([]);

  const fetchEvents = () => {
    fetch(baseUrl)
      .then(response => {
        if (response.ok) return response.json();
      })
      .then(taskList => {
        setEventsList(taskList);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const createBtn = event => {
    event.preventDefault();

    const form = document.querySelector('.event-form');
    const userData = Object.fromEntries(new FormData(form));
    const { title, description, date, startTime, endTime } = userData;

    const eventObj = {
      title,
      description,
      dateFrom: new Date(`${date} ${startTime}`),
      dateTo: new Date(`${date} ${endTime}`),
    };

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventObj),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Internal Server Error. Can't display events");
        }
        return response.json();
      })
      .then(() => fetchEvents());

    setCreatedWindow(false);
  };

  const closeEventBtn = () => {
    setCreatedWindow(false);
  };

  const deleteEventHandler = eventId => {
    fetch(`${baseUrl}/${eventId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Internal Server Error. Can't display events");
        }
      })
      .then(() => fetchEvents());
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
      {createdWindow ? <Modal closeEventBtn={closeEventBtn} createBtn={createBtn} /> : null}
    </>
  );
};

// class Calendar extends React.Component {
//   state = {
//     events: [],
//   };

//   componentDidMount() {
//     this.fetchEvents();
//   }

//   fetchEvents = () => {
//     fetch(baseUrl)
//       .then(response => {
//         if (response.ok) return response.json();
//       })
//       .then(taskList => {
//         this.setState({
//           events: taskList,
//         });
//       });
//   };

//   createBtn = event => {
//     event.preventDefault();

//     const form = document.querySelector('.event-form');
//     const userData = Object.fromEntries(new FormData(form));
//     const { title, description, date, startTime, endTime } = userData;

//     const eventObj = {
//       title,
//       description,
//       dateFrom: new Date(`${date} ${startTime}`),
//       dateTo: new Date(`${date} ${endTime}`),
//     };

//     fetch(baseUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(eventObj),
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Internal Server Error. Can't display events");
//         }
//         return response.json();
//       })
//       .then(() => this.fetchEvents());

//     this.props.setCreatedWindow(false);
//   };

//   closeEventBtn = () => {
//     this.props.setCreatedWindow(false);
//   };

//   deleteEventHandler = eventId => {
//     fetch(`${baseUrl}/${eventId}`, {
//       method: 'DELETE',
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Internal Server Error. Can't display events");
//         }
//       })
//       .then(() => this.fetchEvents());
//   };

//   render() {
//     const { weekDates } = this.props;

//     return (
//       <>
//         <section className="calendar">
//           <Navigation weekDates={weekDates} />
//           <div className="calendar__body">
//             <div className="calendar__week-container">
//               <Sidebar />
//               <Week
//                 weekDates={weekDates}
//                 events={this.state.events}
//                 deleteEventHandler={this.deleteEventHandler}
//               />
//             </div>
//           </div>
//         </section>
//         {this.props.createdWindow ? (
//           <Modal closeEventBtn={this.closeEventBtn} createBtn={this.createBtn} />
//         ) : null}
//       </>
//     );
//   }
// }

export default Calendar;
