import React, { useEffect, useState, useMemo } from "react";
import "./SheduleTable.css";
import apiSchedule from "../../api/schedule";
import SheduleCard from "../SheduleCard/SheduleCard";
import { ToastContainer, toast } from "react-toastify";

function ShedExm() {
  const [lessons, setLessons] = useState([]);

  const nextDayLessons = useMemo(() => {
    return lessons.filter(lesson => {
      return new Date(lesson.date).getDay() === new Date().getDay() + 1;
    });
  }, [lessons]);

  const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const day = new Date().getDay();

  useEffect(async () => {
    try {
      const request = {
        files: [{ fileName: 'test2' }]
      };
      // const response = await apiSchedule.get(request);
      // setLessons(response.data.message[0]);
    } catch (error) {
      console.error(error);
      console.error('ERROR GET LESSONS');
      toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
    }
  }, []);

  return (
    <div className='shedule-table'>
      <table className='table'>
        <thead>
          <tr className='table-tr'>
            {/* <td className='table-td'>{days[day]}</td>
            <td className='table-td'>{days[day + 1] ? days[day + 1] : days[0]}</td> */}
            <td className='table-td'>{days[0]}</td>
            <td className='table-td'>{days[1]}</td>
            <td className='table-td'>{days[2]}</td>
            <td className='table-td'>{days[3]}</td>
            <td className='table-td'>{days[4]}</td>
            <td className='table-td'>{days[5]}</td>

          </tr>
        </thead>

        {/* <thead>
          <tr className='table-tr2'>
            <div className='table-td2'>
              Номер пары
            </div>
            <div className='table-td2'>
              Номер группы
            </div>
            <div className='table-td2'>
              Предмет
            </div>
            <div className='table-td2'>
              Преподаватель
            </div>
            <div className='table-td2'>
              Аудитория
            </div>

          </tr>

        </thead> */}



        {/* {lessons.map((lesson, index) => (
          <SheduleCard count={"№" + lesson.count} lesson={lesson.lesson} fo={lesson.fo} teacher={lesson.teacher}>


            {console.log(lessons)}

          </SheduleCard>
        ))} */}



        <tbody>

          <tr className='table-tr'>
            <td className='table-td'>
            {lessons.map((lesson, index) => (
          <SheduleCard count={"№" + lesson.count} lesson={lesson.lesson} fo={"Ауд №" + lesson.fo} teacher={lesson.teacher}>

            {console.log(lessons)}

          </SheduleCard>
        ))}
            </td>
            <td className='table-td'>
            {lessons.map((lesson, index) => (
          <SheduleCard count={"№" + lesson.count} lesson={lesson.lesson} fo={"Ауд №" + lesson.fo} teacher={lesson.teacher}>


            {console.log(lessons)}

          </SheduleCard>
        ))}
            </td>
            <td className='table-td'>
            {lessons.map((lesson, index) => (
          <SheduleCard count={"№" + lesson.count} lesson={lesson.lesson} fo={"Ауд №" + lesson.fo} teacher={lesson.teacher}>


            {console.log(lessons)}

          </SheduleCard>
        ))}
            </td>
            <td className='table-td'>
            {lessons.map((lesson, index) => (
          <SheduleCard count={"№" + lesson.count} lesson={lesson.lesson} fo={"Ауд №" + lesson.fo} teacher={lesson.teacher}>


            {console.log(lessons)}

          </SheduleCard>
        ))}
            </td>
            <td className='table-td'>
            {lessons.map((lesson, index) => (
          <SheduleCard count={"№" + lesson.count} lesson={lesson.lesson} fo={"Ауд №" + lesson.fo} teacher={lesson.teacher}>


            {console.log(lessons)}

          </SheduleCard>
        ))}
            </td>
            <td className='table-td'>
            {lessons.map((lesson, index) => (
          <SheduleCard count={"№" + lesson.count} lesson={lesson.lesson} fo={"Ауд №" + lesson.fo} teacher={lesson.teacher}>


            {console.log(lessons)}

          </SheduleCard>
        ))}
            </td>
            
          </tr>



          {/* <tr className='table-tr'>
            <td className='table-td'>
              {lessons.map((lesson, index) => (
                // new Date().getDay() === new Date(lesson.date).getDay() &&
                // <li key={index}>{lesson.lesson}</li>



                <tr className="shedule_card_container" key={index}>
                  <div className="number_of_lesson" >

                    <div>
                      {"№" + lesson.count}

                    </div>

                  </div>

                  <div className="number_of_lesson" >

                    {lesson.group}
                  </div>

                  <div className="number_of_lesson" >

                    {lesson.lesson}
                  </div>

                  <div className="number_of_lesson" >

                    {lesson.teacher}
                  </div>
                  <div className="number_of_lesson" >

                    {lesson.fo}
                  </div>
                </tr>

              ))}

            </td>

            <td className='table-td'>
              <thead>
                <tr className='table-tr2'>
                  <div className='table-td2'>
                    Номер пары
                  </div>
                  <div className='table-td2'>
                    Номер группы
                  </div>
                  <div className='table-td2'>
                    Предмет
                  </div>
                  <div className='table-td2'>
                    Преподаватель
                  </div>
                  <div className='table-td2'>
                    Аудитория
                  </div>

                </tr>

              </thead>
              {lessons.map((lesson, index) => (
                // new Date().getDay() === new Date(lesson.date).getDay() &&
                // <li key={index}>{lesson.lesson}</li>
                <tr className="shedule_card_container" key={index}>
                  <div className="number_of_lesson" >
                    <div className="number_of_lesson_title">Номер пары</div>
                    {"№" + lesson.count}
                    {lesson.group}
                    {lesson.lesson}
                    {lesson.teacher}
                  </div>

                  <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Номер группы</div>
                      {lesson.group}
                    </div>

                    <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Предмет</div>
                      {lesson.lesson}
                    </div>

                    <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Преподаватель</div>
                      {lesson.teacher}
                    </div>
                </tr>

              ))}

            </td>
            <td className='table-td'>
              {lessons.map((lesson, index) => (
                // new Date().getDay() === new Date(lesson.date).getDay() &&
                // <li key={index}>{lesson.lesson}</li>
                <tr className="shedule_card_container" key={index}>
                  <div className="number_of_lesson" >
                    <div className="number_of_lesson_title">Номер пары</div>
                    {"№" + lesson.count}
                    {lesson.group}
                    {lesson.lesson}
                    {lesson.teacher}
                  </div>

                  <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Номер группы</div>
                      {lesson.group}
                    </div>

                    <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Предмет</div>
                      {lesson.lesson}
                    </div>

                    <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Преподаватель</div>
                      {lesson.teacher}
                    </div>
                </tr>

              ))}

            </td>
            <td className='table-td'>
              {lessons.map((lesson, index) => (
                // new Date().getDay() === new Date(lesson.date).getDay() &&
                // <li key={index}>{lesson.lesson}</li>
                <tr className="shedule_card_container" key={index}>
                  <div className="number_of_lesson" >
                    <div className="number_of_lesson_title">Номер пары</div>
                    {"№" + lesson.count}
                    {lesson.group}
                    {lesson.lesson}
                    {lesson.teacher}
                  </div>

                  <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Номер группы</div>
                      {lesson.group}
                    </div>

                    <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Предмет</div>
                      {lesson.lesson}
                    </div>

                    <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Преподаватель</div>
                      {lesson.teacher}
                    </div>
                </tr>

              ))}

            </td>
            <td className='table-td'>
              {lessons.map((lesson, index) => (
                // new Date().getDay() === new Date(lesson.date).getDay() &&
                // <li key={index}>{lesson.lesson}</li>
                <tr className="shedule_card_container" key={index}>
                  <div className="number_of_lesson" >
                    <div className="number_of_lesson_title">Номер пары</div>
                    {"№" + lesson.count}
                    {lesson.group}
                    {lesson.lesson}
                    {lesson.teacher}
                  </div>

                  <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Номер группы</div>
                      {lesson.group}
                    </div>

                    <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Предмет</div>
                      {lesson.lesson}
                    </div>

                    <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Преподаватель</div>
                      {lesson.teacher}
                    </div>
                </tr>

              ))}

            </td>
            <td className='table-td'>
              {lessons.map((lesson, index) => (
                // new Date().getDay() === new Date(lesson.date).getDay() &&
                // <li key={index}>{lesson.lesson}</li>
                <tr className="shedule_card_container" key={index}>
                  <div className="number_of_lesson" >
                    <div className="number_of_lesson_title">Номер пары</div>
                    {"№" + lesson.count}
                    {lesson.group}
                    {lesson.lesson}
                    {lesson.teacher}
                  </div>

                  <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Номер группы</div>
                      {lesson.group}
                    </div>

                    <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Предмет</div>
                      {lesson.lesson}
                    </div>

                    <div className="number_of_lesson" >
                      <div className="number_of_lesson_title">Преподаватель</div>
                      {lesson.teacher}
                    </div>
                </tr>

              ))}

            </td>
            <td className='table-td'>
              {nextDayLessons.length ?
                  <ul>
                    {nextDayLessons.map((lesson, index) => (
                        <li key={index}>{lesson.lesson}</li>
                    ))}
                  </ul>
                  :
                  'Нет занятий'
              }

              {console.log(lessons)}

            </td>


          </tr> */}
        </tbody>
      </table>

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

export default ShedExm;
