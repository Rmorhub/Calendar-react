import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';
import { getCurrentDate } from './gateway/calendarGateway.js';

import './common.scss';

const App = () => {
  const currentDate = new Date();

  const [createdWindow, setCreatedWindow] = useState(false);
  const [isCurrentDate, setCurrentDate] = useState(getCurrentDate(currentDate));
  currentDate.setDate(isCurrentDate);

  const weekDates = generateWeekRange(getWeekStartDate(currentDate));

  return (
    <>
      <Header
        weekDates={weekDates}
        currentDate={currentDate}
        isCurrentDate={isCurrentDate}
        setCurrentDate={setCurrentDate}
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
