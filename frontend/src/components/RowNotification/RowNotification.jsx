import React, { useEffect, useState} from "react";
import { toast } from "react-toastify";
import { formatHumanDate } from '../../scripts/date_format';
import "./Row.css";
import apiSubject from "../../api/subjects";
import { CSSTransition } from 'react-transition-group';

function RowNotification({ notification, onDeleteNotification }) {
  const [subblockMount, showSubblockMount] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = {
          roleId: 3
        };
        const request2 = {
          roleId: 1
        };
        const request3 = {
          roleId: 4
        };
        const response = await apiSubject.getuser(request);
        setStudents(response.data.message);
  
        const response3 = await apiSubject.getuser(request2);
        setTeachers(response3.data.message);
  
        const response4 = await apiSubject.getuser(request3);
        setAdmins(response4.data.message);
  
        setTimeout(() => {
          showSubblockMount(true);
        }, 50);
      } catch (error) {
        console.error(error);
        console.error('ERROR GET NOTIFICATIONS');
        toast.error('Произошла ошибка при получении уведомлений. Попробуйте позже или обратитесь в техподдержку');
      }
    };

    fetchData();
  }, []);

   
   
   

  const getAuthorName = (authorId) => {
    const allUsers = [...students, ...teachers, ...admins];
    const user = allUsers.find((user) => user.id === authorId);
    return user ? user.fio : '';
  };

  const handleDelete = () => {
    const confirmed = window.confirm('Вы точно хотите удалить сообщение ?');
    if (confirmed) {
      onDeleteNotification(notification.id);
    }
  }
   


  return (
    <CSSTransition
        in={subblockMount}
        timeout={300}
        classNames="subblock_mount"
        mountOnEnter
        unmountOnExit
      >
    <div className='row row-n'>
      <div className='row-icon'>
        <img src='images/icons/convert.svg' alt='1' />
      </div>
      <div className='row-info'>
      <div className='row-add'>От {getAuthorName(notification.author)}</div>
        <div className='row-date'>{formatHumanDate(notification.date)}</div>
        <button className="button_delete_notif" onClick={() => handleDelete()}>Удалить </button>
      </div>
      <div>
        <div className='row-add2'>{notification.title}</div>
        <div className='row-description'>{notification.text}</div>
      </div>
    </div>
    </CSSTransition>
  );
}
export default RowNotification;
