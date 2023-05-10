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
  const [allGroups, setallGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('ТО - 12901');

  const [sertainGroups, setsertainGroups] = useState({});

  const [switchSchedule, setswitchSchedule] = useState(false);
 
  const handleChange = (event) => {
    setswitchSchedule(true)
    setSelectedGroup(event.target.value);
  };

  const handlscheduleChange = (event) => {
    setswitchSchedule(!switchSchedule)
    setSelectedGroup(event.target.value);
  };
  const formattedDate = startDate.toLocaleDateString('ru', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');

  // let schedules = 0
  // if (trackPress) {
  //   schedules = [lessons]
  //   // console.log(Array.isArray(newarr))
  // }
  // console.log(newarr)
  // console.log(lessons)
  // console.log(trackPress)
  // console.log(selectedGroup)


  useEffect(async () => {
    try {

      // let request
      // if (!trackPress) {
      //   request = {
      //     date: formattedDate,
      //     // group: selectedGroup
      //   };
      // } else {
      //   request = {
      //     date: formattedDate,
      //     group: selectedGroup
      //   };
      // }
      const request = {
        date: formattedDate,
        // group: selectedGroup
      };
      const request2 = {
      };
      const request3 = {
        date: formattedDate,
        group: selectedGroup
      };
      console.log("request", startDate)
      const response = await apiSchedule.get(request);
      const response2 = await apiSchedule.groups(request2);
      const response3 = await apiSchedule.get(request3);
      setLessons(response.data.message);
      setallGroups(response2.data.message);
      setsertainGroups(response3.data.message)
      // console.log(response3.data.message)
    } catch (error) {
      console.error(error);
      console.error('ERROR GET LESSONS');
      toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
    }

  }, [startDate, selectedGroup,switchSchedule]);

  // console.log(sertainGroups)
  // console.log(typeof sertainGroups)
  // console.log(Array.isArray(sertainGroups))


  return (
    <div className='shedule-table'>

      <div className="date_block" >
        <div className="date_container">
          Выберите дату
        </div>
        <div className="date_container">
          <DatePicker selected={startDate} customInput={<input type="button" value="Select date" />} dateFormat="dd/MM/yyyy" locale="ru" onChange={(date) => setStartDate(date)} />
          {/* <button onClick={() => setStartDate(new Date())}>Reset</button> */}
          <div>
            Выберите группу
            <div>
              <select value={selectedGroup} onChange={handleChange}>
                {
                  allGroups?.map(groups => (
                    <option key={groups.id} value={groups.code}>{groups.groupName} ({groups.code})</option>
                  ))
                }
              </select>
              {/* {selectedGroup && <p>You selected {selectedGroup}</p>} */}
            </div>
          </div>
        </div>
      </div>


      <div className='lessons_container'>
        {/* <div>
          {lessons.date}
        </div> */}
        {/* <div>
          {lessons.day_of_the_week}
        </div> */}

        <div>
          {
            !switchSchedule ? lessons.groups?.map(lesson => (
              <SheduleCard {...lesson} />
            )) :
              <div>
                <h2>{sertainGroups && sertainGroups.code}</h2>
                {typeof sertainGroups === 'object' ? (
                  <ul>
                    <button onClick={handlscheduleChange}>
                      Вернуть все расписание
                    </button>
                    {sertainGroups?.schedule && Object.entries(sertainGroups.schedule).map(([key, value]) => (
                      <li key={key}>
                        {value.subject} ({value.fo}) - {value.fio}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>{sertainGroups}</div>
                )}
              </div>
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
