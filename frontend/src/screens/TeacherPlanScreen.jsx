import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiSubject from "../api/subjects";
import apiSchedule from "../api/schedule";
import './style/AdminPlanScreen.css';
import Select from 'react-select';
import { CSSTransition } from 'react-transition-group';

function TeacherPlanScreen() {

  const [subject, setSubject] = useState([]);
  // const [teachers, setTeachers] = useState([]);
  // const [exams, setExams] = useState([]);

  // const [editableSubject, setEditableSubject] = useState({});
  const [groups, setGroups] = useState([]);
  // const [newGroups, setNewGroups] = useState([]);
  // const [newMultipleSubjects, setnewMultipleSubjects] = useState([]);
  // const [newSubject, setNewSubject] = useState([]);
  // const [newteachers, setNewTeachers] = useState([]);
  // const [selectSubject, setSelectSubject] = useState([]);
  // const [showGroupCurriculum, setShowGroupCurriculum] = useState(false);

  const [subblockMount, showSubblockMount] = useState(false);

  // const handleEditClick = (subjId) => {
  //   setEditableSubject({
  //     ...editableSubject,
  //     [subjId]: true,
  //   });
  // };

  // const handleEditClickExit = (subjId) => {
  //   setEditableSubject({
  //     ...editableSubject,
  //     [subjId]: false,
  //   });
  // };

  useEffect(() => {
    async function fetchData() {
      try {
        const request = {
          roleId: 3
        };
        const response = await apiSubject.get(request);
        setSubject(response.data.message);
        const response4 = await apiSchedule.groups();
        setGroups(response4.data.message);
        showSubblockMount(true);
      } catch (error) {
        console.error(error);
        console.error('ERROR GET LESSONS');
        toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
      }
    }
    fetchData();
  }, []);

  const [newGroupCode, setNewGroupCode] = useState("");

  const handleGroupChange = async (e) => {
    const selectedGroupId = e.value;
     
    if (selectedGroupId === 'plan') {
      setNewGroupCode(''); // Set empty group code
    } else {
      const selectedGroup = groups.find((grp) => grp.id === selectedGroupId);
      setNewGroupCode(selectedGroup.code);
      const groupId = parseInt(e.value);
      try {
        const request = {
          groupId: groupId
        };
         ;
        const response = await apiSubject.getGroupsSubject(request);
         ;
        setSubject(response.data.message);

      } catch (error) {
        console.error(error);
        console.error('ERROR GET LESSONS');
        toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
      }
    }

    // setNewGroups(groupId);
    // setShowGroupCurriculum(true);
    // setSubject([])

  };


  const [selectedBlockId, setSelectedBlockId] = useState({value: "plan", label: "Все дисциплины"});

  const handleBlockClick = async (blockId) => {

    if (blockId.value === selectedBlockId) {
       
      return; // Do nothing if the block is already selected
    }
     
    if (blockId.value === 'plan') {
      setSelectedBlockId(blockId);
      try {
        const response = await apiSubject.get();
        setSubject(response.data.message);
      } catch (error) {
        console.error(error);
        console.error('ERROR GET LESSONS');
        toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
      }
    } else {
      setSubject([])
      setSelectedBlockId(blockId);
      // setNewGroups(''); // Assuming an empty string is the default value
      setNewGroupCode('')
    }
  };

   
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
    <CSSTransition
      in={subblockMount}
      timeout={300}
      classNames="subblock_mount"
      mountOnEnter
      unmountOnExit
    >
      <div>
        <div className="title">
          Учебный план группы
        </div>
        <div className="record_subblock_teacher">

          {/* <button type='button' className="button_create" onClick={() => handleBlockClick('plan')}>Все дисциплины</button> */}
          <div className="subblock_text">
            Выбор группы
          </div>
          <Select
            className="new_select_subblock"
            onChange={(selectedOption) => {
              handleBlockClick(selectedOption);
              handleGroupChange(selectedOption);
               
            }}
            options={[
              { value: "plan", label: "Все дисциплины" },
              ...groups.map((grp) => ({
                value: grp.id,
                label: `${grp.code} ${grp.groupName} ${grp.type}`,
              })),
            ]}
            placeholder="Выберите группу"
          />

        </div>

        {isMobile ? (
          // JSX for small screens (width <= 600)
          <div className="plan_screen_container">
            {/* Render curriculum based on selected block */}
            {selectedBlockId.value !== 'plan' ? (
              // Render curriculum for selected group
              <div>
                { }
                {/* Render curriculum for selected group here */}
                <div>
                  {/* {newGroupCode && <div>Выбранная группа: {newGroupCode}</div>} */}
                  {/* <div className="plan_heading">
                  <div className="plan_rec">Дисциплина</div>
                  <div className="plan_rec">Количество часов</div>
                  <div className="plan_rec">Отчетность</div>
                  <div className="plan_rec">Преподаватель</div>
                </div> */}
                  {subject && subject.length > 0 ? (
                    subject.map((subj) => (
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
                      </div>
                    ))
                  ) : (
                    <div className="subblock_text">Нет информации</div>
                  )}
                </div>
              </div>
            ) : (
              // Render entire curriculum
              <div>
                Все дисциплины
                {/* Render entire curriculum here */}
                <div>
                  { }
                  {/* <div className="plan_heading">
                  <div className="plan_rec">Дисциплина</div>
                  <div className="plan_rec">Количество часов</div>
                  <div className="plan_rec">Отчетность</div>
                  <div className="plan_rec">Преподаватель</div>
                </div> */}
                  {subject && subject.length > 0 ? (
                    subject.map((subj) => (
                      <div key={subj.id} className="record_mobile_block">
                        <div className="schedule_mobile_data">
                          <div className="rec_shedule">Дисциплина :</div>
                          <div className="rec_shedule">{subj.name}</div>
                        </div>
                        <div className="schedule_mobile_data">
                          <div className="rec_shedule">Количество часов :</div>
                          <div className="rec_shedule">{subj.summaryHours}</div>
                        </div>
                        <div className="schedule_mobile_data">
                          <div className="rec_shedule">Отчетность :</div>
                          <div className="rec_shedule">{subj.examType}</div>
                        </div>
                        <div className="schedule_mobile_data">
                          <div className="rec_shedule">Преподаватель :</div>
                          <div className="rec_shedule">{subj.teacher}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="subblock_text">Нет информации</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          // JSX for large screens (width > 600)
          <div className="plan_screen_container">
            {/* Render curriculum based on selected block */}
            {selectedBlockId.value !== 'plan' ? (
              // Render curriculum for selected group
              <div>
                { }
                {/* Render curriculum for selected group here */}
                <div>
                  {/* {newGroupCode && <div>Выбранная группа: {newGroupCode}</div>} */}
                  <div className="plan_heading">
                    <div className="plan_rec">Дисциплина</div>
                    <div className="plan_rec">Количество часов</div>
                    <div className="plan_rec">Отчетность</div>
                    <div className="plan_rec">Преподаватель</div>
                    {/* <div className="plan_rec">Действия</div> */}
                  </div>
                  {subject && subject.length > 0 ? (
                    subject.map((subj) => (
                      <div key={subj.id}>
                        <div className="plan_block">
                          <div className="plan_rec">{subj.subjectName}</div>
                          <div className="plan_rec">{subj.summaryHours}</div>
                          <div className="plan_rec">{subj.type}</div>
                          <div className="plan_rec">{subj.teacher}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="subblock_text">Нет информации</div>
                  )}
                </div>
              </div>
            ) : (
              // Render entire curriculum
              <div>
                { }
                
                {/* Render entire curriculum here */}
                <div>
                  <div className="plan_heading">
                    <div className="plan_rec">Дисциплина</div>
                    <div className="plan_rec">Количество часов</div>
                    <div className="plan_rec">Отчетность</div>
                    <div className="plan_rec">Преподаватель</div>
                    {/* <div className="plan_rec">Действия</div> */}
                  </div>
                  {subject && subject.length > 0 ? (
                    subject.map((subj) => (
                      <div key={subj.id}>
                        <div className="plan_block">
                          <div className="plan_rec">{subj.name}</div>
                          <div className="plan_rec">{subj.summaryHours}</div>
                          <div className="plan_rec">{subj.examType}</div>
                          <div className="plan_rec">{subj.teacher}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="subblock_text">Нет информации</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

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

export default TeacherPlanScreen;