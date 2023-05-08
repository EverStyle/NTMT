import React, { useEffect, useState } from "react";
import RowNotification from "../components/RowNotification/RowNotification";
import apiMessages from "../api/messages";
import { toast, ToastContainer } from "react-toastify";

function AdminNotification({ math }) {
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationTitle, setNewNotificationTitle] = useState('')
  const [newNotificationText, setNewNotificationText] = useState('')

  useEffect(() => {
    async function getNotifications() {
      try {
        const response = await apiMessages.get(page);
        setNotifications([...response.data.message]);
       
      } catch (error) {
        console.error(error);
        console.error('ERROR GET NOTIFICATIONS');
        toast.error('Произошла при получении уведомлений. Попробуйте позже или обратитесь в техподдержку');
      }
    }
    getNotifications();
  }, [page])

  async function createNotifiaction(newname, newtext) {
    //а это типа создание папки в папке студента типо разные папки 
    const request = {
      userid: [1],
      title: newname,
      text: newtext
    };

    try {
      const response = await apiMessages.newNotf(request);
      const data = response.data;
      const response2 = await apiMessages.get(page);
      setNotifications([...response2.data.message]);
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  return (
    <div>
      <div className="title">Уведомления</div>
      <div className="create_notifiaction_block">
        <div className='createFolderBlock'>
          <input type="text" placeholder='Введите название уведомления' onChange={(e) => setNewNotificationTitle(e.target.value)} />
          <input type="text" placeholder='Введите текст уведомления' onChange={(e) => setNewNotificationText(e.target.value)} />
          <button type='button' onClick={() => createNotifiaction(newNotificationTitle, newNotificationText)}>Создать</button>
          {/* onClick={() => deleteFiles(file.id)} */}
        </div>
      </div>
      <div className="all_notification">

        <div className="center-content">
          <div className="all_view">
            Показать: <span>Последние уведомления</span>
          </div>
          {notifications.map((notification, index) => {
            return <RowNotification key={index} notification={notification} />
          })}
        </div>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ width: '500px' }}
      />
    </div>
  );
}

export default AdminNotification;
