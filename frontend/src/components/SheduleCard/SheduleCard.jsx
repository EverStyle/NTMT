import React, { useEffect, useState} from "react";
import "./SheduleCard.css";


function SheduleCard(props) {

  //  
  const arr = Object.values(props.schedule);
  //  
  //  

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


  return (
    <div className="all_blocks_schedule"> 
      {isMobile ? (
        // JSX for small screens (width <= 600)
        <div className="all_certain_schedule_subblock" >
          <div className="group_number">
            {props.code}
          </div>
          {arr?.map((lesson, index) => (
            <li className={`custom-li ${!lesson.subject && 'no_lessons'}`} key={index}>
              {lesson.subject ? (
                <div className="schedule_mobile_block">
                  <div className="schedule_mobile_data">
                    <div className="rec_shedule">Номер пары :</div>
                    <div className="rec_shedule">{index + 1}</div>
                  </div>
                  <div className="schedule_mobile_data">
                    <div className="rec_shedule">Предмет :</div>
                    <div className="rec_shedule">{lesson.subject}</div>
                  </div>
                  <div className="schedule_mobile_data">
                    <div className="rec_shedule">Аудитория :</div>
                    <div className="rec_shedule">{lesson.fo}</div>
                  </div>
                  <div className="schedule_mobile_data">
                    <div className="rec_shedule">Преподаватель :</div>
                    <div className="rec_shedule">{lesson.fio}</div>
                  </div>
                  {/* <div className="rec_shedule">Номер группы</div> */}
                </div>
              ) : (
                <div>Номер пары {index + 1} / Нет занятий</div>
              )}
            </li>
          ))}
        </div>
      ) : (
        // JSX for large screens (width > 600)
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
      )}
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