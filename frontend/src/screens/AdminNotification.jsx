import React, { useEffect, useState, useRef } from "react";
import RowNotification from "../components/RowNotification/RowNotification";
import apiMessages from "../api/messages";
import apiSubject from "../api/subjects";
import './style/AdminNotification.css';
import { toast, ToastContainer } from "react-toastify";
import apiSchedule from "../api/schedule";
import Select from 'react-select';
import { CSSTransition} from 'react-transition-group';

function AdminNotification() {
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  // const [userInfo, setUserInfo] = useState([])
  const [newNotificationTitle, setNewNotificationTitle] = useState('')
  const [newNotificationText, setNewNotificationText] = useState('')
  const messageBlockRef = useRef(null);
  const [groups, setGroups] = useState([]);
  // const [newGroups, setNewGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [subblockMount, showSubblockMount] = useState(false);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const messageBlockHeight = messageBlockRef.current?.clientHeight;
    if (messageBlockHeight > 500) {
      messageBlockRef.current.style.height = "500px";
    }
    async function getNotifications() {
      try {
        const request = {
          roleId: 3
        };
        const request2 = {
          roleId: 1
        };
        const response3 = await apiSubject.getuser(request);
        setTeachers(response3.data.message);
        const response4 = await apiSubject.getuser(request2);
        setAdmins(response4.data.message);
        const response = await apiMessages.get(page);
        setNotifications([...response.data.message]);
        setCounter(response.data.count)
        // const response2 = await apiMessages.newUserInfo();
        // setUserInfo([...response2.data.message]);
        setTimeout(() => {
          showSubblockMount(true);
        }, 50)
      } catch (error) {
        console.error(error);
        console.error('ERROR GET NOTIFICATIONS');
        toast.error('Произошла при получении уведомлений. Попробуйте позже или обратитесь в техподдержку');
      }
    }
    fetchGroups()
    getNotifications();
  }, [page])

   

  async function createNotifiaction(newname, newtext, seluser) {
    const invalidCharsRegex = /[^A-Za-zА-Яа-я0-9\s!?.(),[\]<>{}:;"'@#$%^&*|\\\/~`+=_-]/;

    // Check if the newtext contains any invalid character
    if (invalidCharsRegex.test(newname)) {
      toast.error('Содержит недопустимые символы');
      throw new Error('Содержит недопустимые символы');
    }
    if (invalidCharsRegex.test(newtext)) {
      toast.error('Содержит недопустимые символы');
      throw new Error('Содержит недопустимые символы');
    }

    const request = {
      userid: seluser,
      title: newname,
      text: newtext
    };
    try {
       
      const response = await apiMessages.newNotf(request);
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
    // setNewGroups(groupId);
    if (groupId === "") {
      setStudents([]); // Clear the students array when the default value is selected
    } else {
      fetchStudents(groupId);
    }
  };


  const handleUserSelection = (selectedOptions) => {
     
    const containsSelectAll = selectedOptions.some((option) => option.value === 'all');
    if (containsSelectAll) {
       ;
      // Perform your logic for selecting all students
      setSelectedUserIds(students.map((student) => student.id));
    } else {
       ;
      // Perform your logic for handling individual student selection
      const selectedIds = selectedOptions.map((option) => option.value);
      setSelectedUserIds(selectedIds);
    }
  };

  const [selectedUserIds2, setSelectedUserIds2] = useState([]);
  const [selectedUserIds3, setSelectedUserIds3] = useState([]);

  const handleUserSelection2 = (selectedOptions) => {
     
    const containsSelectAll = selectedOptions.some((option) => option.value === 'all');
    if (containsSelectAll) {
       ;
      // Perform your logic for selecting all students
      setSelectedUserIds2(teachers.map((teacher) => teacher.id));
    } else {
       ;
      // Perform your logic for handling individual student selection
      const selectedIds = selectedOptions.map((option) => option.value);
      setSelectedUserIds2(selectedIds);
    }
  };
  const handleUserSelection3 = (selectedOptions) => {
     
    const containsSelectAll = selectedOptions.some((option) => option.value === 'all');
    if (containsSelectAll) {
       ;
      // Perform your logic for selecting all students
      setSelectedUserIds3(admins.map((admin) => admin.id));
    } else {
       ;
      // Perform your logic for handling individual student selection
      const selectedIds = selectedOptions.map((option) => option.value);
      setSelectedUserIds3(selectedIds);
    }
  };

  const mergedSelectedUserIds = [...selectedUserIds, ...selectedUserIds2, ...selectedUserIds3];
  const uniqueSelectedUserIds = Array.from(new Set(mergedSelectedUserIds));


  const selectAllOption = {
    value: 'all',
    label: 'Выбрать всех',
  };

  const options = [
    { ...selectAllOption },
    ...students.map((user) => ({
      value: user.id,
      label: `${user.fio} ${uniqueSelectedUserIds.includes(user.id) ? '(выбран)' : ''}`,
    })),
  ];
  const options2 = [
    { ...selectAllOption },
    ...teachers.map((user) => ({
      value: user.id,
      label: `${user.fio} ${uniqueSelectedUserIds.includes(user.id) ? '(выбран)' : ''}`,
    })),
  ];
  const options3 = [
    { ...selectAllOption },
    ...admins.map((user) => ({
      value: user.id,
      label: `${user.fio} ${uniqueSelectedUserIds.includes(user.id) ? '(выбран)' : ''}`,
    })),
  ];

   

  // Calculate the total number of pages
  const totalPages = Math.ceil(counter / 5);

  // Generate the array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage);
  };

  const renderPageButtons = pageNumbers.map((pageNumber) => (
    <button
      key={pageNumber}
      className={`button_page ${pageNumber === page ? 'active' : ''}`}
      onClick={() => handlePageClick(pageNumber)}
    >
      {pageNumber}
    </button>
  ));

  return (
    <div>
      <CSSTransition
        in={subblockMount}
        timeout={300}
        classNames="subblock_mount"
        mountOnEnter
        unmountOnExit
      >
        <div>
          <div className="title">Уведомления</div>
          <div className="create_notifiaction_block">
            <div>
              <div className="select-container">
                <h2 className="subblock_text">Выберите группу</h2>
                <Select
                  onChange={handleGroupChange}
                  options={[
                    ...groups.map((grp) => ({
                      value: grp.id,
                      label: `${grp.code} ${grp.groupName} ${grp.type}`,
                    })),
                  ]}
                  placeholder="Выберите группу"
                />
              </div>
              <div className="select-container">
                <h2 className="subblock_text">Выберите пользователя для отправки сообщения</h2>
                <div className="dropdown">
                  <div>
                    <Select
                      onChange={handleUserSelection}
                      options={options}
                      isMulti
                      className="multiple_select"
                      classNamePrefix="select"
                      placeholder="Выберите пользователя"
                    />
                  </div>
                </div>
              </div>
              <div className="select-container">
                <h2 className="subblock_text">Выберите преподавателя </h2>
                <div className="dropdown">
                  <div>
                    <Select
                      onChange={handleUserSelection2}
                      options={options2}
                      isMulti
                      className="multiple_select"
                      classNamePrefix="select"
                      placeholder="Выберите преподавателя"
                    />
                  </div>
                </div>
              </div>
              <div className="select-container">
                <h2 className="subblock_text">Выберите администратора </h2>
                <div className="dropdown">
                  <div>
                    <Select
                      onChange={handleUserSelection3}
                      options={options3}
                      isMulti
                      className="multiple_select"
                      classNamePrefix="select"
                      placeholder="Выберите администратора"
                    />
                  </div>
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
              <button type='button' className="select_block_button_record" onClick={() => createNotifiaction(newNotificationTitle, newNotificationText, uniqueSelectedUserIds)}>Отправить</button>
            </div>
          </div>

          <div className="all_notification">
            <div className="container_page_counter_block">
              <div className="container_page_counter">{renderPageButtons}</div>
            </div>
            <div className="center-content" ref={messageBlockRef}>
              {notifications.map((notification, index) => {
                return <div>
                  <RowNotification key={index} notification={notification} onDeleteNotification={handleDeleteNotification} />
                </div>
              })}
            </div>
          </div>
        </div>
      </CSSTransition>

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
