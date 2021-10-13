import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';

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
  console.log(createdWindow);

  const closeEventBtn = () => {
    setCreatedWindow(false);
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
      {createdWindow ? <Modal closeEventBtn={closeEventBtn} /> : null}
    </>
  );
};

export default App;
