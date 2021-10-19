import React, { useEffect, useState } from 'react';
import './redline.scss';

const getDistance = () => {
  const top = new Date().getHours() * 60 + new Date().getMinutes();
  return `${top}px`;
};

const Redline = () => {
  const [top, setTop] = useState(getDistance());

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('render');
      setTop(getDistance());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [top]);

  const style = {
    top,
  };

  return (
    <div style={style} className="red-line">
      <span className="red-line__line"></span>
    </div>
  );
};

export default Redline;
