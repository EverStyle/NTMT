import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiSubject from "../api/subjects";
import apiSchedule from "../api/schedule";
import apiAccount from "../api/account";
import './style/PlanScreen.css';
import { CSSTransition } from 'react-transition-group';

function PlanScreen() {
  const [subject, setSubject] = useState([]);
  const [userGroupInfo, setUserGroupInfo] = useState([]);
  const [subblockMount, showSubblockMount] = useState(false);

  function findMatchingGroupId(apiResponse1, apiResponse2) {
    const groupCode = apiResponse1.code;
    for (let i = 0; i < apiResponse2.length; i++) {
      if (apiResponse2[i].code === groupCode) {
        return apiResponse2[i].id;
      }
    }
    return null; 
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setTimeout(() => {
          showSubblockMount(true);
        }, 50);
        const response = await apiAccount.info();
        console.log(response.data.message);
        setUserGroupInfo(response.data.message);
        const response2 = await apiSchedule.groups();
        const matchingGroupId = findMatchingGroupId(response.data.message, response2.data.message);
        console.log(matchingGroupId);
        const request2 = {
          groupId: matchingGroupId
        };
        const response3 = await apiSubject.getGroupsSubject(request2);
        console.log(response3.data.message);
        setSubject(response3.data.message);
      } catch (error) {
        console.error(error);
        console.error('ERROR GET LESSONS');
        toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
      }
    }
    fetchData();
  }, []);

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
    <CSSTransition
                in={subblockMount}
                timeout={300}
                classNames="subblock_mount"
                mountOnEnter
                unmountOnExit
            >
    <div>
      <div>
        <div className="title">
          Учебный план
        </div>
        <div>
          <strong>Номер группы : </strong> {userGroupInfo.code}
        </div>
        <div>
          <strong>Направление : </strong>  {userGroupInfo.groupName}
        </div>

        {isMobile ? (
          // JSX for small screens (width <= 600)
          <div className="plan_screen_container">
            <div className="plan_heading">
            
            </div>
            {subject?.map(subj => (
              <div key={subj.id} className="record_mobile_block">
                <div className="schedule_mobile_data">
                  <div className="rec_shedule">Дисциплина :</div>
                  <div className="rec_shedule">{subj.subjectName}</div>
                </div>
                <div className="schedule_mobile_data">
                  <div className="rec_shedule">Количество часов :</div>
                  <div className="rec_shedule">{subj.summaryHours}</div>
                </div>
                <div className="schedule_mobile_data">
                  <div className="rec_shedule">Отчетность :</div>
                  <div className="rec_shedule">{subj.type}</div>
                </div>
                <div className="schedule_mobile_data">
                  <div className="rec_shedule">Преподаватель :</div>
                  <div className="rec_shedule">{subj.teacher}</div>
                </div>
                {/* <div className="rec_shedule">Номер группы</div> */}
              </div>
            ))}
          </div>
        ) : (
          // JSX for large screens (width > 600)
          <div className="plan_screen_container">
            <div className="plan_heading">
              <div className="plan_rec">Дисциплина</div>
              <div className="plan_rec">Количество часов</div>
              <div className="plan_rec">Отчетность</div>
              <div className="plan_rec">Преподаватель</div>
            </div>
            {subject?.map(subj => (
              <div key={subj.id}>
                <div className="plan_block">
                  <div className="plan_rec">
                    {subj.subjectName}
                  </div>
                  <div className="plan_rec">
                    {subj.summaryHours}
                  </div>
                  <div className="plan_rec" >
                    {subj.type}
                  </div>
                  <div className="plan_rec">
                    {subj.teacher}
                  </div>
                </div>
              </div>
            ))}
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
    </CSSTransition>
  );
}

export default PlanScreen;




