import React, {useEffect, useState} from "react";
import RowNotification from "../components/RowNotification/RowNotification";
import apiMessages from "../api/messages";
import {toast, ToastContainer} from "react-toastify";

function NotificationsScreen({ math }) {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function getNotifications() {
      try {
        const response = await apiMessages.get(page);
        setNotifications([...notifications, ...response.data.message]);
        setCount(response.data.count);
      } catch(error) {
        console.error(error);
        console.error('ERROR GET NOTIFICATIONS');
        toast.error('Произошла при получении уведомлений. Попробуйте позже или обратитесь в техподдержку');
      }
    }
    getNotifications();
  }, [page])

  return (
    <div>
      <div className="title">Уведомления</div>
      <div className="all_notification">

        <div className="center-content">
          <div className="all_view">
            Показать: <span>Последние уведомления</span>
          </div>
          {notifications.map((notification, index) => {
            return <RowNotification key={index} notification={notification} />
          })}
        </div>

        <div className="all_btn">
          {count > notifications.length &&
              <button
                  onClick={() => setPage(page + 1)}
                  className="notific-btn"
              >
                Показать больше
              </button>}
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
          style={{width: '500px'}}
      />
    </div>
  );
}

export default NotificationsScreen;
