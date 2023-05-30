import React from "react";
import { useEffect, useState, useMemo } from "react";
import { plan, practise } from "../json/plan";
import { ToastContainer, toast } from "react-toastify";
import apiSubject from "../api/subjects";
import apiSchedule from "../api/schedule";
import apiAccount from "../api/account";
import './style/PlanScreen.css';

function PlanScreen() {
  const [subject, setSubject] = useState([]);
  const [groups, setGroups] = useState([]);
  const [userGroupInfo, setUserGroupInfo] = useState([]);


  function findMatchingGroupId(apiResponse1, apiResponse2) {
    const groupCode = apiResponse1.code;
    for (let i = 0; i < apiResponse2.length; i++) {
      if (apiResponse2[i].code === groupCode) {
        return apiResponse2[i].id;
      }
    }
    return null; // Return null if no matching group is found
  }

  useEffect(async (newGroupId) => {
    try {
      const response = await apiAccount.info();
      console.log(response.data.message);
      setUserGroupInfo(response.data.message)
      const response2 = await apiSchedule.groups();
      console.log(response2.data.message);
      setGroups(response2.data.message);
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
  );
}

export default PlanScreen;





// import React from "react";
// // import { plan, practise } from "../json/plan";

// function PlanScreen() {
//   // const { subjects } = plan[0];
//   // const { subjects_pr } = practise[0];
//   return (
//     <div>
//       {/* <div className='title'>Учебный план</div>
//       <div className='detail-record-book'>
//         <div className='detail-napr'>
//           <span>Направление:</span> Компьютерные системы и комплексы
//         </div>
//         <div className='detail-qval'>
//           <span>Квалификация:</span> Техник
//         </div>
//         <div className='detail-form'>
//           <span>Выбор семестра:</span> Все семестры
//         </div>
//       </div>
//       <div className='details-table plan-table'>
//         <table className='detail-table'>
//           <thead className='detail-thead'>
//             <tr className='main-tr'>
//               <td>Дисциплина</td>
//               <td>Кол-во зачетных единиц/часов</td>
//               <td>Отчетность</td>
//               <td>Семестры</td>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className='main-tr'>
//               <td className='zach-detail'>{plan[0].disp}</td>
//               <td className='zach-detail'>{plan[0].allTime}</td>
//               <td className='zach-detail'></td>
//               <td className='zach-detail'></td>
//             </tr>
//             {subjects.map((sub, index) => (
//               <tr key={index}>
//                 <td className='zach-detail'>{sub.subject}</td>
//                 <td className='zach-detail'>{sub.hours}</td>
//                 <td className='zach-detail'>{sub.result}</td>
//                 <td className='zach-detail'>{sub.semestrs}</td>
//               </tr>
//             ))}
//             <tr className='main-tr'>
//               <td className='zach-detail'>{practise[0].disp}</td>
//               <td className='zach-detail'>{practise[0].allTime}</td>
//               <td className='zach-detail'></td>
//               <td className='zach-detail'></td>
//             </tr>
//             {subjects_pr.map((pract, index) => (
//               <tr key={index}>
//                 <td className='zach-detail'>{pract.subject}</td>
//                 <td className='zach-detail'>{pract.hours}</td>
//                 <td className='zach-detail'>{pract.result}</td>
//                 <td className='zach-detail'>{pract.semestrs}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div> */}
//     </div>
//   );
// }

// export default PlanScreen;
