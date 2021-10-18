import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
// import Modal from './components/modal/Modal.jsx';

import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';

import './common.scss';

import { getCurrentDate } from './gateway/calendarGateway.js';

// const baseUrl = 'https://6140a15a357db50017b3d77d.mockapi.io/api/v1/events';

const App = () => {
  const currentDate = new Date();

  const [createdWindow, setCreatedWindow] = useState(false);
  const [isCurrentDate, setCurrentDate] = useState(getCurrentDate(currentDate));
  currentDate.setDate(isCurrentDate);

  const weekDates = generateWeekRange(getWeekStartDate(currentDate));

  const redTimeLine = () => {
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
  };

  useEffect(() => {
    redTimeLine();
  }, []);

  return (
    <>
      <Header
        weekDates={weekDates}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        isCurrentDate={isCurrentDate}
        setCreatedWindow={setCreatedWindow}
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
