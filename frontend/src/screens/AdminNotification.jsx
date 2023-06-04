import React, { useEffect, useState, useRef } from "react";
import RowNotification from "../components/RowNotification/RowNotification";
import apiMessages from "../api/messages";
import './style/AdminNotification.css';
import { toast, ToastContainer } from "react-toastify";
import apiSchedule from "../api/schedule";
import Select from 'react-select';

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
    const groupId = e.value;
    setNewGroups(groupId);
    if (groupId === "") {
      setStudents([]); // Clear the students array when the default value is selected
    } else {
      fetchStudents(groupId);
    }
  };


  // const handleMultipleGroupChange = async (e) => {
  //   const selectedOptions = Array.from(e.selectedOptions);
  //   const selectedGroups = selectedOptions.map((option) => option.value);
  //   setSelectedUserIds(selectedGroups);
  //   // setShowGroupCurriculum(true);
  // };


  const handleUserSelection = (selectedOptions) => {
    console.log(selectedOptions)
    const containsSelectAll = selectedOptions.some((option) => option.value === 'all');
    if (containsSelectAll) {
      console.log('Select All option selected');
      // Perform your logic for selecting all students
      setSelectedUserIds(students.map((student) => student.id));
    } else {
      console.log('Individual student(s) selected');
      // Perform your logic for handling individual student selection
      const selectedIds = selectedOptions.map((option) => option.value);
      setSelectedUserIds(selectedIds);
    }
  };

  const selectAllOption = {
    value: 'all',
    label: 'Выбрать всех студентов',
  };

  const options = [
    { ...selectAllOption},
    ...students.map((user) => ({
      value: user.id,
      label: `${user.fio} ${selectedUserIds.includes(user.id) ? '(выбран)' : ''}`,
    })),
  ];

  console.log(selectedUserIds)

  return (
    <div>
      <div className="title">Уведомления</div>
      <div className="create_notifiaction_block">

        <div>
          <div className="select-container">
            <h2 className="subblock_text">Выберите группу</h2>
            <Select
              // Заманался забывать меняй функцию приема инфы в handleGroupChange убери там таргет имхо в новом он не пашет
              onChange={handleGroupChange}
              options={[
                { value: "", label: "Выберите группу" },
                ...groups.map((grp) => ({
                  value: grp.id,
                  label: `${grp.code} ${grp.groupName} ${grp.type}`,
                })),
              ]}
              placeholder="Enter a group"
            />
          </div>

          <h2 className="subblock_text">Выберите пользователя для отправки сообщения</h2>
          <div className="dropdown">
            {/* 
            <Select
              onChange={(selectedOptions) => {
                const selectedUserIds = selectedOptions.map((option) => option.value);
                setSelectedUserIds(selectedUserIds);
              }}
              options={students.map((user) => ({
                value: user.id,
                label: `${user.fio} ${selectedUserIds.includes(user.id) ? '(выбран)' : ''}`,
              }))}
              isMulti
              className="multiple_select"
              classNamePrefix="select"
            /> */}

            <div>
              {/* <button onClick={handleSelectAll}>
                {selectAll ? 'Deselect All' : 'Select All'}
              </button> */}
              <Select
                onChange={handleUserSelection}
                options={options}
                isMulti
                className="multiple_select"
                classNamePrefix="select"
              />
            </div>

          </div>
        </div>
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
