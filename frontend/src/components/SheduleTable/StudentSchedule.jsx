import React, { useEffect, useState, useMemo } from "react";
import "./SheduleTable.css";
import apiSchedule from "../../api/schedule";
import SheduleCard from "../SheduleCard/SheduleCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { ToastContainer, toast } from "react-toastify";
import UploadIcon from '@mui/icons-material/Upload';

function StudentSchedule() {
  const [lessons, setLessons] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  registerLocale('ru', ru)
  const [allGroups, setallGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('ТО - 12901');

  const [sertainGroups, setsertainGroups] = useState({});

  const [switchSchedule, setswitchSchedule] = useState(false);
  const [file, setFile] = useState('');

  const handleChange = (event) => {
    const selectedGroup = event.target.value;
    if (selectedGroup == "retShedule") {
      setswitchSchedule(false)
      setSelectedGroup(event.target.value);
    } else {
      setswitchSchedule(true)
      setSelectedGroup(event.target.value);
    }

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

  }, [startDate, selectedGroup, switchSchedule, file]);

  // console.log(sertainGroups)
  // console.log(typeof sertainGroups)
  // console.log(Array.isArray(sertainGroups))

  async function uploadSchedule(file) {

    const fileTypes = {
      'txt': 1,
      'xlsx': 2,
      'docx': 3,
    };
    const request = new FormData();
    request.append('files', file[0])
    request.append('fileType', fileTypes[file[0].name.split('.').pop()])

    const request2 = {
    };

    try {
      const response = await apiSchedule.sendSched(request);
      const data = response.data.message[0];

      const response2 = await apiSchedule.get(request2);
      console.log(data)
      toast.success("Загрузка успешна, обновите дату");
    } catch (error) {
      console.error(error);
      console.error('ERROR UPLOAD FILES');
      toast.error('Произошла ошибка при загрузке файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }
  console.log(sertainGroups.schedule)
  console.log(lessons)
  return (
    <div className='shedule-table'>

      <div className="date_block" >
        <div className="date_container">

          <div className="subblock_text">
            Выберите дату
          </div>
          <DatePicker selected={startDate} customInput={<input type="button" value="Select date" />} dateFormat="dd/MM/yyyy" locale="ru" onChange={(date) => setStartDate(date)} />
        </div>
        <div className="date_container">
          {/* <button onClick={() => setStartDate(new Date())}>Reset</button> */}
          <div>

            <div className="subblock_text">
              Выберите группу
            </div>
            <div >
              <select className="select_block" value={selectedGroup} onChange={handleChange}>
                <option value="retShedule">Рассписание всех групп</option>
                {allGroups?.map(groups => (
                  <option key={groups.id} value={groups.code}>{groups.groupName} ({groups.code})</option>
                ))}
              </select>
              {/* {selectedGroup && <p>You selected {selectedGroup}</p>} */}
            </div>
          </div>
        </div>

        {/* <div className="lexa">
          <div
            style={{ fontSize: '13px', textAlign: 'center', position: 'relative' }}
            className="file-link"
          >
            <label htmlFor="file2" style={{ position: 'absolute', opacity: '0', width: '100%', height: '100%', cursor: 'pointer' }}></label>
            <input
              value={file}
              type="file"
              id="file2"
              //Важно id html и id input изменить и все работает
              style={{ position: 'absolute', display: 'none', width: '100%', height: '100%' }}
              onChange={(e) => uploadSchedule(e.target.files)}
            />
            <UploadIcon sx={{ fontSize: '80px' }} color="primary" />
            <p style={{ textAlign: 'center' }}>Загрузить расписание</p>
          </div>
        </div> */}

      </div>



      <div className='lessons_container'>



        {/* <div className="sub_text_schedule">
          <div>
            Выбранная дата {lessons.date}
          </div>
          <div>
            День недели {lessons.day_of_the_week}
          </div>
        </div> */}
        {lessons.length == 0 ? <div className="subblock_text">Не выбранна дата или нет данных </div> : <div className="sub_text_schedule">
          <div className="subblock_text">
            Выбранная дата / {lessons.date}
          </div>
          <div className="subblock_text">
            День недели / {lessons.day_of_the_week}
          </div>
        </div>}

        <div className="all_schedule_block">

          <div className="heading_shedule">
            <div className="rec_shedule"> Номер группы</div>
            <div className="rec_shedule"> Номер пары</div>
            <div className="rec_shedule"> Предмет</div>
            <div className="rec_shedule"> Аудитория</div>
            <div className="rec_shedule">Преподаватель</div>
          </div>
          {
            !switchSchedule ? (
              lessons.groups?.map((lesson) => <SheduleCard {...lesson} />)
            ) : lessons.length === 0 ? (
              <div className="subblock_text">Нет данных</div>
            ) : (
              <div>
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
              </div>
            )
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

export default StudentSchedule;
