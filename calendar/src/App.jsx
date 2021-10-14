import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import events from './gateway/events.js';

import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';

import './common.scss';

const App = () => {
  const day = date => new Date(date).getDate();

  const currentDate = new Date();

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

  const closeEventBtn = () => {
    setCreatedWindow(false);
  };

  const createBtn = event => {
    event.preventDefault();
    setCreatedWindow(false);
    const form = document.querySelector('.event-form');
    const userData = Object.fromEntries(new FormData(form));
    console.log(userData);
    const id = events.length + 1;
    const { title, description, date, startTime, endTime } = userData;
    console.log(title, description, date, startTime, endTime);
    const pushObj = {
      id,
      title,
      description,
      dateFrom: new Date(`${date},${startTime}`),
      dateTo: new Date(`${date},${endTime}`),
    };
    events.push(pushObj);
  };

  return (
    <>
      <Header
        currentDate={currentDate}
        setDay={setDay}
        count={count}
        todayBtn={todayBtn}
        createEventBtn={createEventBtn}
      />
      <Calendar weekDates={weekDates} />
      {createdWindow ? <Modal closeEventBtn={closeEventBtn} createBtn={createBtn} /> : null}
    </>
  );
};

export default App;
