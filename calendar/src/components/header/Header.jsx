import React, { useState } from 'react';
import { months } from '../../utils/dateUtils.js';

import './header.scss';

const Header = () => {
  const day = date => new Date(date).getDate();

  const currentDate = new Date();

  const [count, setDay] = useState(day(currentDate));
  currentDate.setDate(count);

  const todayBtn = () => {
    const today = new Date();
    setDay(today.getDate());
  };

  console.log(currentDate);
  return (
    <header className="header">
      <button className="button create-event-btn">
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
              setDay(count - 7);
            }}
          ></i>
        </button>
        <button className="icon-button navigation__nav-icon">
          <i
            className="fas fa-chevron-right"
            onClick={() => {
              setDay(count + 7);
            }}
          ></i>
        </button>
        <span className="navigation__displayed-month">{`${
          months[currentDate.getMonth() === -1 ? 11 : currentDate.getMonth()]
        } - ${months[currentDate.getMonth() !== 11 ? currentDate.getMonth() + 1 : 0]}`}</span>
      </div>
    </header>
  );
};

export default Header;
