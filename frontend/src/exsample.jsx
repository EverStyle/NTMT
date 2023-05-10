// import React, { useEffect, useState } from "react";
// import RowNotification from "../components/RowNotification/RowNotification";
// import apiMessages from "../api/messages";
// import { toast, ToastContainer } from "react-toastify";

// function AdminNotification({ math }) {
//   const [page, setPage] = useState(1);
//   const [notifications, setNotifications] = useState([]);
//   const [newNotificationTitle, setNewNotificationTitle] = useState('')
//   const [newNotificationText, setNewNotificationText] = useState('')

//   useEffect(() => {
//     async function getNotifications() {
//       try {
//         const response = await apiMessages.get(page);
//         setNotifications([...response.data.message]);
       
//       } catch (error) {
//         console.error(error);
//         console.error('ERROR GET NOTIFICATIONS');
//         toast.error('Произошла при получении уведомлений. Попробуйте позже или обратитесь в техподдержку');
//       }
//     }
//     getNotifications();
//   }, [page])

//   async function createNotifiaction(newname, newtext) {
//     //а это типа создание папки в папке студента типо разные папки 
//     const request = {
//       userid: [1],
//       title: newname,
//       text: newtext
//     };

//     try {
//       const response = await apiMessages.newNotf(request);
//       const data = response.data;
//       const response2 = await apiMessages.get(page);
//       setNotifications([...response2.data.message]);
//     } catch (error) {
//       console.error(error);
//       console.error('ERROR DOWNLOAD FILE');
//       toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
//     }
//   }

//   return (
//     <div>
//       <div className="title">Уведомления</div>
//       <div className="create_notifiaction_block">
//         <div className='createFolderBlock'>
//           <input type="text" placeholder='Введите название уведомления' onChange={(e) => setNewNotificationTitle(e.target.value)} />
//           <input type="text" placeholder='Введите текст уведомления' onChange={(e) => setNewNotificationText(e.target.value)} />
//           <button type='button' onClick={() => createNotifiaction(newNotificationTitle, newNotificationText)}>Создать</button>
//           {/* onClick={() => deleteFiles(file.id)} */}
//         </div>
//       </div>
//       <div className="all_notification">

//         <div className="center-content">
//           <div className="all_view">
//             Показать: <span>Последние уведомления</span>
//           </div>
//           {notifications.map((notification, index) => {
//             return <RowNotification key={index} notification={notification} />
//           })}
//         </div>
//       </div>

//       <ToastContainer
//         position="bottom-left"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//         style={{ width: '500px' }}
//       />
//     </div>
//   );
// }

// export default AdminNotification;


// import React, { useEffect, useState, useMemo } from "react";
// import "./SheduleTable.css";
// import apiSchedule from "../../api/schedule";
// import SheduleCard from "../SheduleCard/SheduleCard";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { registerLocale, setDefaultLocale } from "react-datepicker";
// import ru from 'date-fns/locale/ru';
// import { ToastContainer, toast } from "react-toastify";

// function SheduleTable() {
//   const [lessons, setLessons] = useState([]);
//   const [startDate, setStartDate] = useState(new Date());
//   registerLocale('ru', ru)
//   const [allGroups, setallGroups] = useState([]);
//   const [selectedGroup, setSelectedGroup] = useState([]);
//   const [trackPress, settrackPress] = useState(false);
//   const handleChange = (event) => {
//     settrackPress(true)
//     setSelectedGroup(event.target.value);
//   };
//   return (
//     <div className='shedule-table'>
//       <div className="date_block" >
//         <div className="date_container">
//           <div>
//             Выберите группу
//             <div>
//               <select value={selectedGroup} onChange={handleChange}>
//                 {
//                   allGroups?.map(groups => (
//                     <option key={groups.id} value={groups.code}>{groups.groupName} ({groups.code})</option>
//                   ))
//                 }
//               </select>
//               {/* {selectedGroup && <p>You selected {selectedGroup}</p>} */}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='lessons_container'>
//           {
//               lessons.groups?.map(lesson => (
//                 <SheduleCard {...lesson} />
//               ))
//           }
//       </div>
//     </div>
//   );
// }
// export default SheduleTable;


// [
//   [
//       {
//           "code": "ТО - 12901",
//           "schedule": {
//               "1": {
//                   "subject": "Математика ",
//                   "fo": "213",
//                   "fio": "Ведерникова ЕВ"
//               },
//               "2": {
//                   "subject": "Физика",
//                   "fo": "109",
//                   "fio": "Елисеев АВ"
//               },
//               "3": {
//                   "subject": "",
//                   "fo": "",
//                   "fio": ""
//               },
//               "4": {
//                   "subject": "",
//                   "fo": "",
//                   "fio": ""
//               }
//           }
//       },
//       {
//           "code": "ТО - 12902",
//           "schedule": {
//               "1": {
//                   "subject": "Физическая культура",
//                   "fo": "СЗ",
//                   "fio": "Панова АВ"
//               },
//               "2": {
//                   "subject": "Математика ",
//                   "fo": "213",
//                   "fio": "Ведерникова ЕВ"
//               },
//               "3": {
//                   "subject": "Родная литература",
//                   "fo": "313",
//                   "fio": "Шестакова ТА"
//               },
//               "4": {
//                   "subject": "",
//                   "fo": "",
//                   "fio": ""
//               }
//           }
//       }
//   ],
//   "01.05.2023",
//   "ПОНЕДЕЛЬНИК"
// ]


// {
//   "code": "ТО - 21906",
//   "schedule": {
//       "1": {
//           "subject": "Компьютерная графика",
//           "fo": "223/242",
//           "fio": "Семухина ИВ\\\nКиреева НЕ"
//       },
//       "2": {
//           "subject": "Инженерная графика",
//           "fo": "327",
//           "fio": "Семухина ИВ"
//       },
//       "3": {
//           "subject": "Техническая механика",
//           "fo": "327",
//           "fio": "Семухина ИВ"
//       },
//       "4": {
//           "subject": "",
//           "fo": "",
//           "fio": ""
//       }
//   }
// }