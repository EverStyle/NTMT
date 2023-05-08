import React, { useEffect, useState, useMemo } from "react";
import "./SheduleTable.css";
import apiSchedule from "../../api/schedule";
import SheduleCard from "../SheduleCard/SheduleCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { ToastContainer, toast } from "react-toastify";

function SheduleTable() {
  const [lessons, setLessons] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  registerLocale('ru', ru)

  const formattedDate = startDate.toLocaleDateString('ru', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');
  console.log(startDate)

  console.log("New date:", formattedDate)


  useEffect(async () => {
    try {
      const request = {
        date: formattedDate
      };
      console.log("request", startDate)
      const response = await apiSchedule.get(request);
      setLessons(response.data.message);
    } catch (error) {
      console.error(error);
      console.error('ERROR GET LESSONS');
      toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
    }

  }, [startDate]);


  console.log(lessons)
  return (
    <div className='shedule-table'>

      <div className="date_block" >
        <div className="date_container">
          Выберите дату
        </div>
        <div className="date_container">
          <DatePicker selected={startDate} customInput={<input type="button" value="Select date" />} dateFormat="dd/MM/yyyy" locale="ru" onChange={(date) => setStartDate(date)} />
          {/* <button onClick={() => setStartDate(new Date())}>Reset</button> */}
        </div>
      </div>


      <div className='lessons_container'>
        {/* <div>
          {lessons.date}
        </div> */}
        <div>
          {lessons.day_of_the_week}
        </div>

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
