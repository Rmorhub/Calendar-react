import React from 'react';
import { months } from '../../utils/dateUtils.js';

import './header.scss';

const DAYINWEEK = 7;

const Header = ({
  weekDates,
  currentDate,
  setCurrentDate,
  isCurrentDate,
  setCreatedWindow,
  redLine,
}) => {
  const startMonthWeek = weekDates[0].getMonth();
  const endMonthWeek = weekDates[weekDates.length - 1].getMonth();
  const isWithNextMonth = startMonthWeek < endMonthWeek;
  const currentYear = currentDate.getFullYear();

  const todayBtn = () => {
    const today = new Date();
    setCurrentDate(today.getDate());
    setTimeout(() => {
      redLine();
    }, 0);
  };

  const createEventBtn = () => {
    setCreatedWindow(true);
  };

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={createEventBtn}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={todayBtn}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon">
          <i
            className="fas fa-chevron-left"
            onClick={() => {
              setCurrentDate(isCurrentDate - DAYINWEEK);
            }}
          ></i>
        </button>
        <button className="icon-button navigation__nav-icon">
          <i
            className="fas fa-chevron-right"
            onClick={() => {
              setCurrentDate(isCurrentDate + DAYINWEEK);
            }}
          ></i>
        </button>
        <span className="navigation__displayed-month">
          {!isWithNextMonth
            ? `${months[startMonthWeek]} ${currentYear}`
            : `${months[startMonthWeek]} - ${months[endMonthWeek]} ${currentYear}`}
        </span>
      </div>
    </header>
  );
};

export default Header;
