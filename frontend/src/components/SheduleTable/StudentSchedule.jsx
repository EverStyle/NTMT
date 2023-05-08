import React, { useEffect, useState, useMemo } from "react";
import "./SheduleTable.css";
import apiSchedule from "../../api/schedule";
import SheduleCard from "../SheduleCard/SheduleCard";
import { ToastContainer, toast } from "react-toastify";

function SheduleTable() {
  const [lessons, setLessons] = useState([]);
  useEffect(async () => {
    try {
      const request = {
        date: "02.05.2023"
      };
      const response = await apiSchedule.get(request);
      setLessons(response.data.message);
    } catch (error) {
      console.error(error);
      console.error('ERROR GET LESSONS');
      toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
    }
    // console.log("Lessons:", lessons);
    // console.log("Groups:", lessons.groups);
    // console.log("Schedule:", lessons.groups?.[0].schedule);
  }, []);



  return (
    <div className='shedule-table'>
      <div className='lessons_container'>
        <div>
          {
            lessons.groups?.map(lesson => (
              <SheduleCard {...lesson} />
            ))
          }
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

export default SheduleTable;
