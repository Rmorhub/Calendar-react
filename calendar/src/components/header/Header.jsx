import React from 'react';
import PropTypes from 'prop-types';

import { months } from '../../utils/dateUtils.js';

import './header.scss';

const DAYINWEEK = 7;

const Header = ({ weekDates, currentDate, setCurrentDate, isCurrentDate, setCreatedWindow }) => {
  const startMonthWeek = weekDates[0].getMonth();
  const endMonthWeek = weekDates[weekDates.length - 1].getMonth();
  const isBtwYear = startMonthWeek === 11 && endMonthWeek === 0;
  const isWithNextMonth = startMonthWeek < endMonthWeek;
  const currentYear = currentDate.getFullYear();
  const nextYear = currentDate.getFullYear() + 1;

  const btwYears = `${months[startMonthWeek]} ${currentYear} - ${months[endMonthWeek]} ${nextYear}`;
  const currentMonthAndYear = !isWithNextMonth
    ? `${months[startMonthWeek]} ${currentYear}`
    : `${months[startMonthWeek]} - ${months[endMonthWeek]} ${currentYear}`;

  const todayBtn = () => {
    const today = new Date();
    setCurrentDate(today.getDate());
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
          {!isBtwYear ? currentMonthAndYear : btwYears}
        </span>
      </div>
    </header>
  );
};

Header.propTypes = {
  weekDates: PropTypes.array.isRequired,
  currentDate: PropTypes.object.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  isCurrentDate: PropTypes.number.isRequired,
  setCreatedWindow: PropTypes.func.isRequired,
};

export default Header;
