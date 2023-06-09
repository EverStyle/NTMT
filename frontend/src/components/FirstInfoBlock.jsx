import React, { useState } from 'react';
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import AdminNotification from '../screens/AdminNotification';

function FirstInfoBlock() {



  return (
    <div >
      <div>
        Личный кабинет
      </div>
      <div className='personal_block_container'>
        <div className='personal_block' >
          Уведомления
        </div>
        <div className='personal_block'>
          Расписание
        </div>
        <div className='personal_block'>
          Файлы
        </div>
        <div className='personal_block'>
          Зачетная книжка
        </div>
        <div className='personal_block'>
          Учебный план
        </div>
      </div>
    </div>
  );
}

export default FirstInfoBlock;