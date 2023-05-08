import React, { useEffect, useState, useMemo } from "react";
import "./SheduleCard.css";
import apiSchedule from "../../api/schedule";
import { ToastContainer, toast } from "react-toastify";

function SheduleCard(props) {

  // console.log(props)
  const arr = Object.values(props.schedule);
  // console.log(arr)
  // console.log(Array.isArray(arr))

  // useEffect(async () => {
  //   try {
  //     const request = {
  //       files: [{ fileName: 'test2' }]
  //     };
  //     const response = await apiSchedule.get(request);
  //     setLessons(response.data.message[0]);
  //   } catch (error) {
  //     console.error(error);
  //     console.error('ERROR GET LESSONS');
  //     toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
  //   }
  // }, []);

  return (

    <div className="card_container">
      <div className="group_name_block">
        {props.code}
      </div>
      <div >
        <div className="card_lessons_subblock">
          <div className="card_number_block">
            Номер пары
          </div>
          <div className="card_name_block">
            Предмет
          </div>
          <div className="card_number_block">
            Аудитория
          </div>
          <div className="card_name_block">
            Преподаватель
          </div>
        </div>
        {arr?.map((lesson, index) => (
          <div className="card_lessons_subblock">
            <div className="card_number_block">
              {index + 1}
            </div>
            <div className="card_name_block">
              {lesson.subject}
            </div>
            <div className="card_number_block">
              {lesson.fo}
            </div>
            <div className="card_name_block">
              {lesson.fio}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SheduleCard;