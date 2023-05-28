import React, { useEffect, useState, useRef } from "react";
import RowNotification from "../components/RowNotification/RowNotification";
import apiMessages from "../api/messages";
import './style/AdminNotification.css';
import { toast, ToastContainer } from "react-toastify";
import apiSchedule from "../api/schedule";

function AdminNotification({ math }) {
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [userInfo, setUserInfo] = useState([])
  const [newNotificationTitle, setNewNotificationTitle] = useState('')
  const [newNotificationText, setNewNotificationText] = useState('')
  const messageBlockRef = useRef(null);
  const [currentUserId, setCurrentUserId] = useState(1);

  const [groups, setGroups] = useState([]);
  const [newGroups, setNewGroups] = useState([]);
  const [students, setStudents] = useState([]);

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
      } catch (error) {
        console.error(error);
        console.error('ERROR GET NOTIFICATIONS');
        toast.error('Произошла при получении уведомлений. Попробуйте позже или обратитесь в техподдержку');
      }
    }
    fetchGroups()
    getNotifications();
  }, [page])

  console.log(userInfo)

  async function createNotifiaction(newname, newtext, seluser) {

    const request = {
      userid: seluser,
      title: newname,
      text: newtext
    };

    try {
      console.log(request)
      const response = await apiMessages.newNotf(request);
      const data = response.data;
      const response2 = await apiMessages.get(page);
      setNotifications([...response2.data.message]);
      toast.success("Уведомление успешно созданно и отправленно");
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при создании уведомления. Попробуйте позже или обратитесь в техподдержку');
    }
  }


  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // const toggleUserSelection = (userId) => {
  //   if (selectedUserIds.includes(userId)) {
  //     setSelectedUserIds(selectedUserIds.filter(id => id !== userId));
  //   } else {
  //     setSelectedUserIds([...selectedUserIds, userId]);
  //   }
  // };



  const handleDeleteNotification = async (notificationId) => {
    try {
      const response = await apiMessages.deleteMess({ listMessages: [notificationId] });
      const data = response.data;
      toast.success("Уведомление успешно удалено");
      setNotifications(notifications.filter(notification => notification.id !== notificationId));
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при удалении уведомления. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  const fetchGroups = async () => {
    try {
      const response = await apiSchedule.groups();
      setGroups(response.data.message);
    } catch (error) {
      console.error(error);
      console.error('ERROR GET GROUPS');
      toast.error(
        'Произошла ошибка при получении групп. Попробуйте позже или обратитесь в техподдержку'
      );
    }
  };

  const fetchStudents = async (groupId) => {
    try {
      const response = await apiSchedule.certainGroups(groupId);
      console.log(response.data.message)
      setStudents(response.data.message);
    } catch (error) {
      console.error(error);
      console.error('ERROR GET STUDENTS');
      toast.error(
        'Произошла ошибка при получении студентов. Попробуйте позже или обратитесь в техподдержку'
      );
    }
  };

  const handleGroupChange = (e) => {
    const groupId = e.target.value;
    setNewGroups(groupId);

    if (groupId === "") {
      setStudents([]); // Clear the students array when the default value is selected

    } else {
      fetchStudents(groupId);
    }
  };


  const handleMultipleGroupChange = async (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedGroups = selectedOptions.map((option) => option.value);
    setSelectedUserIds(selectedGroups);
    // setShowGroupCurriculum(true);
  };

  console.log(selectedUserIds)

  return (
    <div>
      <div className="title">Уведомления</div>
      <div className="create_notifiaction_block">
        <div className='createNotifBlock'>
          <textarea
            className="input_block"
            placeholder="Введите название уведомления"
            onChange={(e) => setNewNotificationTitle(e.target.value)}
          />
          <textarea
            className="input_block"
            placeholder="Введите текст уведомления"
            onChange={(e) => setNewNotificationText(e.target.value)}
          />
          <button type='button' className="button_create" onClick={() => createNotifiaction(newNotificationTitle, newNotificationText, selectedUserIds)}>Отправить</button>
        </div>
        <div>
          <div className="select-container">
            <select className="custom-select" value={newGroups} onChange={handleGroupChange}>
              <option value="">Выберите группу</option>
              {groups.map((grp) => (
                <option key={grp.id} value={grp.id}>
                  {grp.code} {grp.groupName} {grp.type}
                </option>
              ))}
            </select>
          </div>

          {/* там 70 групп сделай скролл на селектор!!!!! */}

          <h2 className="subblock_text">Выберите пользователя для отправки сообщения</h2>
          {/* {students.map(user => (
          <div className={`stud_select ${selectedUserIds.includes(user.id) ? 'active' : ''}`} key={user.id} onClick={() => toggleUserSelection(user.id)}>
            {user.fio} {selectedUserIds.includes(user.id) && '(выбран)'}
          </div>

        ))} */}
          <div className="dropdown">
            <select className="multiple_select" value={selectedUserIds} onChange={handleMultipleGroupChange} size={10} multiple>
              {/* <option value="">Выберите группу</option> */}
              {students.map((user) => (
                <option className={`stud_select ${selectedUserIds.includes(user.id) ? 'active' : ''}`} key={user.id} value={user.id}>
                  {user.fio} {selectedUserIds.includes(user.id) && '(выбран)'}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>
      <div className="all_notification">

        <div className="center-content" ref={messageBlockRef}>
          {/* <div className="all_view">
            Показать: <span>Последние уведомления</span>
          </div> */}
          {notifications.map((notification, index) => {

            return <div>
              <RowNotification key={index} notification={notification} onDeleteNotification={handleDeleteNotification} />
            </div>

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
