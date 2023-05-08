import React from "react";
import "./Row.css";
import { formatHumanDate } from '../../scripts/date_format'

function RowNotification({ notification }) {
  return (
    <div className='row row-n'>
      <div className='row-icon'>
        <img src='images/icons/convert.svg' alt='1' />
      </div>
      <div className='row-info'>
        <div className='row-add'>{ notification.title }</div>
        <div className='row-date'>{ formatHumanDate(notification.date) }</div>
      </div>
      <div className='row-description'>{ notification.text }</div>
    </div>
  );
}

export default RowNotification;
