
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { formatHumanDate } from '../../scripts/date_format';
import apiMessages from "../../api/messages";
import "./Row.css";


function RowNotification({ notification, onDeleteNotification }) {


  const handleDelete = () => {
    const confirmed = window.confirm('Вы точно хотите удалить сообщение ?');
    if (confirmed) {
      onDeleteNotification(notification.id);
    }
  }
  
  // async function deleteMessage(id) {
  //   const request = {
  //     listMessages: [id]
  //   };
  //   const request2 = {};
  //   const confirmed = window.confirm('Вы точно хотите удалить выбранный файл ?');
  //   if (!confirmed) {
  //     return;
  //   }
  //   try {
  //     const response = await apiMessages.deleteMess(request);
  //     const data = response.data;
  //     toast.success("Data updated successfully");
  //   } catch (error) {
  //     console.error(error);
  //     console.error('ERROR DOWNLOAD FILE');
  //     toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
  //   }
  // }
  return (
    <div className='row row-n'>
      <div className='row-icon'>
        <img src='images/icons/convert.svg' alt='1' />
      </div>
      <div className='row-info'>
        <div className='row-add'>{notification.title}</div>
        <div className='row-date'>{formatHumanDate(notification.date)}</div>
        <button className="button_delete_notif" onClick={() => handleDelete()}>Удалить </button>
      </div>
      <div className='row-description'>{notification.text}</div>
    </div>
  );
}

export default RowNotification;
