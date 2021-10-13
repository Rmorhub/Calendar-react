import React from 'react';
import { months } from '../../utils/dateUtils.js';

import './header.scss';

const DAYINWEEK = 7;

const Header = ({ todayBtn, setDay, count, currentDate, createEventBtn }) => (
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
            setDay(count - DAYINWEEK);
          }}
        ></i>
      </button>
      <button className="icon-button navigation__nav-icon">
        <i
          className="fas fa-chevron-right"
          onClick={() => {
            setDay(count + DAYINWEEK);
          }}
        ></i>
      </button>
      <span className="navigation__displayed-month">{`${
        months[currentDate.getMonth() === -1 ? 11 : currentDate.getMonth()]
      } - ${
        months[currentDate.getMonth() !== 11 ? currentDate.getMonth() + 1 : 0]
      } ${currentDate.getFullYear()}`}</span>
    </div>
  </header>
);

export default Header;
