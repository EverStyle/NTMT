
import React, { useEffect, useState, useRef } from "react";
import RowNotification from "../components/RowNotification/RowNotification";
import apiMessages from "../api/messages";
import './style/AdminNotification.css';
import { toast, ToastContainer } from "react-toastify";
import { CSSTransition} from 'react-transition-group';

function  NotificationsScreen() {
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const messageBlockRef = useRef(null);
  const [subblockMount, showSubblockMount] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const messageBlockHeight = messageBlockRef.current?.clientHeight;
    if (messageBlockHeight > 500) {
      messageBlockRef.current.style.height = "500px";
    }
    async function getNotifications() {
      try {
        setTimeout(() => {
          showSubblockMount(true);
        }, 50)
        const response = await apiMessages.get(page);
        setNotifications([...response.data.message]);
        setCounter(response.data.count)
      } catch (error) {
        console.error(error);
        console.error('ERROR GET NOTIFICATIONS');
        toast.error('Произошла при получении уведомлений. Попробуйте позже или обратитесь в техподдержку');
      }
    }
    getNotifications();
  }, [page])

   

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

  // const fetchGroups = async () => {
  //   try {
  //     const response = await apiSchedule.groups();
  //     setGroups(response.data.message);
  //   } catch (error) {
  //     console.error(error);
  //     console.error('ERROR GET GROUPS');
  //     toast.error(
  //       'Произошла ошибка при получении групп. Попробуйте позже или обратитесь в техподдержку'
  //     );
  //   }
  // };

   

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

export default NotificationsScreen;



// import React, {useEffect, useState} from "react";
// import RowNotification from "../components/RowNotification/RowNotification";
// import apiMessages from "../api/messages";
// import {toast, ToastContainer} from "react-toastify";

// function NotificationsScreen({ math }) {
//   const [page, setPage] = useState(1);
//   const [count, setCount] = useState(0);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     async function getNotifications() {
//       try {
//         const response = await apiMessages.get(page);
//         setNotifications([...notifications, ...response.data.message]);
//         setCount(response.data.count);
//       } catch(error) {
//         console.error(error);
//         console.error('ERROR GET NOTIFICATIONS');
//         toast.error('Произошла при получении уведомлений. Попробуйте позже или обратитесь в техподдержку');
//       }
//     }
//     getNotifications();
//   }, [page])

//   const handleDeleteNotification = async (notificationId) => {
//     try {
//       const response = await apiMessages.deleteMess({ listMessages: [notificationId] });
//       const data = response.data;
//       toast.success("Уведомление успешно удалено");
//       setNotifications(notifications.filter(notification => notification.id !== notificationId));
//     } catch (error) {
//       console.error(error);
//       console.error('ERROR DOWNLOAD FILE');
//       toast.error('Произошла ошибка при удалении уведомления. Попробуйте позже или обратитесь в техподдержку');
//     }
//   }

//   return (
//     <div>
//       <div className="title">Уведомления</div>
//       <div className="all_notification">

//         <div className="center-content">
//           <div className="all_view">
//             Показать: <span>Последние уведомления</span>
//           </div>
//           {notifications.map((notification, index) => {
//             return <RowNotification key={index} notification={notification} onDeleteNotification={handleDeleteNotification} />
//           })}
//         </div>

//         <div className="all_btn">
//           {count > notifications.length &&
//               <button
//                   onClick={() => setPage(page + 1)}
//                   className="notific-btn"
//               >
//                 Показать больше
//               </button>}
//         </div>
//       </div>

//       <ToastContainer
//           position="bottom-left"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="colored"
//           style={{width: '500px'}}
//       />
//     </div>
//   );
// }

// export default NotificationsScreen;
