import React, { useEffect, useState } from "react";
import "./SheduleTable.css";
import apiSchedule from "../../api/schedule";
import SheduleCard from "../SheduleCard/SheduleCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { ToastContainer, toast } from "react-toastify";
import Select from 'react-select';


function StudentSchedule() {
  const [lessons, setLessons] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  registerLocale('ru', ru)
  const [allGroups, setallGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('ТО-12901');

  const [sertainGroups, setsertainGroups] = useState({});

  const [switchSchedule, setSwitchSchedule] = useState(false);
  const [file, setFile] = useState('');


  const handleChange = (selectedOption) => {
    const selectedGroup = selectedOption.value;
    ;
    ;

    if (selectedGroup === "retShedule") {
      setSwitchSchedule(false);
      setSelectedGroup(selectedGroup);
    } else {
      setSwitchSchedule(true);
      setSelectedGroup(selectedGroup);
    }
  };

  const formattedDate = startDate.toLocaleDateString('ru', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');

  useEffect(() => {
    async function fetchData() {
      try {
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

        const response = await apiSchedule.get(request);
        const response2 = await apiSchedule.groups(request2);
        const response3 = await apiSchedule.get(request3);
        setLessons(response.data.message);
        setallGroups(response2.data.message);
        setsertainGroups(response3.data.message)
        //  
      } catch (error) {
        console.error(error);
        console.error('ERROR GET LESSONS');
        toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
      }
    }
    fetchData();
  }, [startDate, selectedGroup, switchSchedule, file]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log(sertainGroups)

  return (
    // {isMobile ? (
    //   // JSX for small screens (width <= 600)
    //   <div>Mobile view</div>
    // ) : (
    //   // JSX for large screens (width > 600)
    //   <div>Desktop view</div>
    // )}


    <div className='shedule-table'>
      <div className="date_block_student" >
        <div className="date_container">
          <div className="subblock_text">
            Выберите дату
            <DatePicker selected={startDate} customInput={<input type="button" value="Select date" />} dateFormat="dd/MM/yyyy" locale="ru" onChange={(date) => setStartDate(date)} />
          </div>
        </div>
        <div className="date_container">
          <div>
            <div className="subblock_text">
              Выберите группу
            </div>
            <div>
              <Select
                onChange={handleChange}
                options={[
                  { value: "retShedule", label: "Рассписание всех групп" },
                  ...allGroups?.map(group => ({
                    value: group.code,
                    label: `${group.groupName} (${group.code})`,
                  }))
                ]}
                placeholder="Выберите группу"
              />
            </div>
          </div>
        </div>
      </div>

      <div className='lessons_container'>
        {lessons.length == 0 ? <div className="subblock_text">Не выбранна дата или нет данных </div> : <div className="sub_text_schedule">
          <div className="subblock_text">
            Выбранная дата / {lessons.date}
          </div>
          <div className="subblock_text">
            День недели / {lessons.day_of_the_week}
          </div>
        </div>}

        {isMobile ? (
          // JSX for small screens (width <= 600)
          <div className="heading_shedule-container">
            {
              !switchSchedule ? (
                lessons.groups?.map((lesson) => <SheduleCard {...lesson} />)
              ) : lessons.length === 0 ? (
                <div className="subblock_text">Нет данных</div>
              ) : (
                <div className="certain_schedule">
                  {typeof sertainGroups === 'object' ? (
                    <ul className="custom-ul">
                      <div className="group_number_mobile">
                        <strong>Выбранная группа / {sertainGroups.code}</strong>
                      </div>
                      <div className="all_certain_schedule_block">


                        <div className="all_certain_schedule_subblock">
                          {sertainGroups?.schedule &&
                            Object.entries(sertainGroups.schedule).map(
                              ([key, value]) => (
                                <li className="custom-li" key={key}>
                                  {value.subject ? (
                                    <>
                                      <div className="schedule_mobile_block">

                                        <div className="schedule_mobile_data">
                                          <div className="rec_shedule">Номер пары :</div>
                                          <div className="rec_shedule">{key}</div>
                                        </div>
                                        <div className="schedule_mobile_data">
                                          <div className="rec_shedule">Предмет :</div>
                                          <div className="rec_shedule">{value.subject}</div>
                                        </div>
                                        <div className="schedule_mobile_data">
                                          <div className="rec_shedule">Аудитория :</div>
                                          <div className="rec_shedule">({value.fo})</div>
                                        </div>
                                        <div className="schedule_mobile_data">
                                          <div className="rec_shedule">Преподаватель :</div>
                                          <div className="rec_shedule">{value.fio}</div>
                                        </div>
                                      </div>

                                    </>
                                  ) : (
                                    <div className="no_lessons">
                                      Номер пары {key} / Нет занятий
                                    </div>
                                  )}
                                </li>
                              )
                            )}
                        </div>
                      </div>
                    </ul>
                  ) : (
                    <div>{sertainGroups}</div>
                  )}
                </div>
              )
            }
          </div>
        ) : (
          // JSX for large screens (width > 600)
          <div className="heading_shedule-container">

            <div className="heading_shedule">
              <div className="rec_shedule">Номер группы</div>
              <div className="rec_shedule">Номер пары</div>
              <div className="rec_shedule">Предмет</div>
              <div className="rec_shedule">Аудитория</div>
              <div className="rec_shedule">Преподаватель</div>
            </div>

            {
              !switchSchedule ? (
                lessons.groups?.map((lesson) => <SheduleCard {...lesson} />)
              ) : lessons.length === 0 ? (
                <div className="subblock_text">Нет данных</div>
              ) : (
                <div className="certain_schedule">
                  {typeof sertainGroups === 'object' ? (
                    <ul className="custom-ul">
                      {!sertainGroups ? (
                        <div className="heading_shedule">
                          <div className="rec_shedule"> Номер группы</div>
                          <div className="rec_shedule"> Номер пары</div>
                          <div className="rec_shedule"> Предмет</div>
                          <div className="rec_shedule"> Аудитория</div>
                          <div className="rec_shedule">Преподаватель</div>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <div className="all_certain_schedule_block">
                        <div className="group_number">
                          {sertainGroups && sertainGroups.code}
                        </div>

                        <div className="all_certain_schedule_subblock">
                          {sertainGroups?.schedule &&
                            Object.entries(sertainGroups.schedule).map(
                              ([key, value]) => (
                                <li className="custom-li" key={key}>
                                  {value.subject ? (
                                    <>
                                      <div className="rec_shedule">{key}</div>
                                      <div className="rec_shedule">{value.subject}</div>
                                      <div className="rec_shedule">({value.fo})</div>
                                      <div className="rec_shedule">{value.fio}</div>
                                    </>
                                  ) : (
                                    <div className="no_lessons">
                                      Номер пары {key} / Нет занятий
                                    </div>
                                  )}
                                </li>
                              )
                            )}
                        </div>
                      </div>
                    </ul>
                  ) : (
                    <div>{sertainGroups}</div>
                  )}
                </div>
              )
            }
          </div>
        )}

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

export default StudentSchedule;

