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
      <div className="group_number">
        {props.code}
      </div>
      <div className="all_certain_schedule_subblock" >
        {arr?.map((lesson, index) => (
          <li className={`custom-li ${!lesson.subject && 'no_lessons'}`} key={index}>
            {lesson.subject ? (
              <>
                <div className="rec_shedule">
                  {index + 1}
                </div>
                <div className="rec_shedule">
                  {lesson.subject}
                </div>
                <div className="rec_shedule">
                  {lesson.fo}
                </div>
                <div className="rec_shedule">
                  {lesson.fio}
                </div>
              </>
            ) : (
              <div>Номер пары {index + 1} / Нет занятий</div>
            )}
          </li>
        ))}
      </div>
    </div>
  );
}

export default SheduleCard;

{/* <li className="custom-li" key={key}>
  {value.subject ? (
    <>
      <div className="rec_shedule">
        {key}
      </div>
      <div className="rec_shedule">
        {value.subject}
      </div>
      <div className="rec_shedule">
        ({value.fo})
      </div>
      <div className="rec_shedule">
        {value.fio}
      </div>
    </>
  ) : (
    <div className="no_lessons"> Номер пары {key} / Нет занятий</div>
  )}
</li> */}

 // <div className="card_lessons_subblock">
          //   <div className="card_number_block">
          //     {index + 1}
          //   </div>
          //   <div className="card_name_block">
          //     {lesson.subject}
          //   </div>
          //   <div className="card_number_block">
          //     {lesson.fo}
          //   </div>
          //   <div className="card_name_block">
          //     {lesson.fio}
          //   </div>
          // </div>