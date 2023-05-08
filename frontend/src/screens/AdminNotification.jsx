import React, { useEffect, useState, useRef } from "react";
import RowNotification from "../components/RowNotification/RowNotification";
import apiMessages from "../api/messages";
import './style/AdminNotification.css';
import { toast, ToastContainer } from "react-toastify";

function AdminNotification({ math }) {
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [userInfo, setUserInfo] = useState([])
  const [newNotificationTitle, setNewNotificationTitle] = useState('')
  const [newNotificationText, setNewNotificationText] = useState('')
  const messageBlockRef = useRef(null);
  const [currentUserId, setCurrentUserId] = useState(1);

  useEffect(() => {

    const messageBlockHeight = messageBlockRef.current.clientHeight;
    if (messageBlockHeight > 500) {
      messageBlockRef.current.style.height = "500px";
    }

    async function getNotifications() {
      try {
        const response = await apiMessages.get(page);
        setNotifications([...response.data.message]);
        const response2 = await apiMessages.newUserInfo();
        setUserInfo([...response2.data.message]);
        console.log(response2.data.message)
      } catch (error) {
        console.error(error);
        console.error('ERROR GET NOTIFICATIONS');
        toast.error('Произошла при получении уведомлений. Попробуйте позже или обратитесь в техподдержку');
      }
    }
    getNotifications();
  }, [page])

  console.log(userInfo)

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

  const handleUserSelect = (folderId) => {
    setCurrentUserId(folderId);
  }

  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const toggleUserSelection = (userId) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter(id => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };
  console.log(selectedUserIds)
  const handleSubmit = () => {
    // Send the selected user IDs to the server
    console.log(selectedUserIds);
  };
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
        <div>
          <h2>Выбор пользователя</h2>
          {userInfo.map(user => (
            <div key={user.id} onClick={() => toggleUserSelection(user.id)}>
              {user.fio} {user.id} {selectedUserIds.includes(user.id) && '(выбран)'}
            </div>
          ))}
          <button onClick={handleSubmit}>Отправить сообщение</button>
        </div>
        {/* <div>
          Выбор пользователя
          {userInfo.map(info => (
            <div key={info.id}>
              {info.fio} {info.id}
            </div>
          ))}
        </div> */}
      </div>
      <div className="all_notification">

        <div className="center-content" ref={messageBlockRef}>
          {/* <div className="all_view">
            Показать: <span>Последние уведомления</span>
          </div> */}
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
