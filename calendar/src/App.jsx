import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
// import Modal from './components/modal/Modal.jsx';

import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';

import './common.scss';

// const baseUrl = 'https://6140a15a357db50017b3d77d.mockapi.io/api/v1/events';

const App = () => {
  const currentDate = new Date();

  const day = date => new Date(date).getDate();

  const [count, setDay] = useState(day(currentDate));
  currentDate.setDate(count);

  const todayBtn = () => {
    const today = new Date();
    setDay(today.getDate());
  };

  const weekDates = generateWeekRange(getWeekStartDate(currentDate));

  const [createdWindow, setCreatedWindow] = useState(false);
  const createEventBtn = () => {
    setCreatedWindow(true);
  };

  // const closeEventBtn = () => {
  //   setCreatedWindow(false);
  // };

  // const createBtn = event => {
  //   event.preventDefault();

  //   const form = document.querySelector('.event-form');
  //   const userData = Object.fromEntries(new FormData(form));
  //   const { title, description, date, startTime, endTime } = userData;

  //   const eventObj = {
  //     title,
  //     description,
  //     dateFrom: new Date(`${date} ${startTime}`),
  //     dateTo: new Date(`${date} ${endTime}`),
  //   };

  //   fetch(baseUrl, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(eventObj),
  //   }).then(response => {
  //     if (!response.ok) {
  //       throw new Error("Internal Server Error. Can't display events");
  //     }
  //     return response.json();
  //   });

  //   setCreatedWindow(false);
  // };

  setTimeout(() => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const dayToday = currentDate.getDate();
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();
    const currentTime = new Date().getHours();
    const currentDay = new Date().getDate();
    if (currentYear === thisYear && currentMonth === thisMonth && dayToday === currentDay) {
      const dayElem = document.querySelector(`[data-day="${currentDay}"]`);
      const timeElem = dayElem.querySelector(
        `[data-time="${currentTime !== 0 ? currentTime : 0}"]`,
      );
      timeElem.classList.add('red-line');
    }
  }, 0);

  return (
    <>
      <Header
        currentDate={currentDate}
        setDay={setDay}
        count={count}
        todayBtn={todayBtn}
        createEventBtn={createEventBtn}
      />
      <Calendar
        weekDates={weekDates}
        setCreatedWindow={setCreatedWindow}
        createdWindow={createdWindow}
      />
    </>
  );
};

export default App;
