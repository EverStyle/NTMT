import React from "react";
import { useEffect, useState, useMemo } from "react";
import { plan, practise } from "../json/plan";
import { ToastContainer, toast } from "react-toastify";
import apiSubject from "../api/subjects";
import apiSchedule from "../api/schedule";
import './style/AdminPlanScreen.css';
import Select from 'react-select';

function TeacherPlanScreen() {
  const { subjects } = plan[0];
  const { subjects_pr } = practise[0];
  const [subject, setSubject] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [exams, setExams] = useState([]);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedExamIds, setSelectedExamIds] = useState([]);

  const [newSubjectTitle, setNewSubjectTitle] = useState('')
  const [newHours, setNewHours] = useState(0)

  const [editMode, setEditMode] = useState(false);

  const [editableSubject, setEditableSubject] = useState({});

  const [newTitle, setNewTitle] = useState('');
  const [newHoursSubj, setNewHoursSubj] = useState('');
  const [newExamType, setNewExamType] = useState('');
  const [newTeacherId, setNewTeacherId] = useState('');


  const [groups, setGroups] = useState([]);
  const [newGroups, setNewGroups] = useState([]);
  const [newMultipleSubjects, setnewMultipleSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState([]);
  const [newteachers, setNewTeachers] = useState([]);
  const [selectSubject, setSelectSubject] = useState([]);
  const [showGroupCurriculum, setShowGroupCurriculum] = useState(false);


  const handleEditClick = (subjId) => {
    setEditableSubject({
      ...editableSubject,
      [subjId]: true,
    });
  };

  const handleEditClickExit = (subjId) => {
    setEditableSubject({
      ...editableSubject,
      [subjId]: false,
    });
  };

  useEffect(async () => {
    try {
      const request = {
        roleId: 3
      };
      const response = await apiSubject.get(request);
      setSubject(response.data.message);
      setSelectSubject(response.data.message);
      const response2 = await apiSubject.getuser(request);
      setTeachers(response2.data.message);
      const response3 = await apiSubject.exams(request);
      setExams(response3.data.message);
      const response4 = await apiSchedule.groups();
      setGroups(response4.data.message);
    } catch (error) {
      console.error(error);
      console.error('ERROR GET LESSONS');
      toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
    }

  }, []);

  async function createSubject(newTitle, newhours, exam, techerselect) {

    const request = {
      name: newTitle,
      teacherId: techerselect,
      examType: exam,
      hours: newhours
    };
    console.log(request);
    const request2 = {};
    try {
      const response = await apiSubject.subjCreate(request);
      toast.success("Data updated successfully");
      const data = response.data;
      const response2 = await apiSubject.get(request2);
      setSubject(response2.data.message);
      setSelectSubject(response2.data.message);
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }



  async function updateSubject(subjId, newTitle, techerselect, exam, newhours) {
    const request = {
      subjectId: subjId,
      name: newTitle,
      teacherId: techerselect,
      examType: exam,
      hours: newhours
    };
    const request2 = {};
    try {
      console.log(request)
      const response = await apiSubject.updateSubj(request);
      handleEditClickExit(subjId);

      const response2 = await apiSubject.get(request2);
      setSubject(response2.data.message);
      toast.success("Data updated successfully");
    } catch (error) {

      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  async function deleteSubject(id) {
    const request = {
      subjectId: id
    };
    const request2 = {};
    const confirmed = window.confirm('Вы точно хотите удалить выбранный файл ?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await apiSubject.deleteSubj(request);
      const data = response.data;

      const response2 = await apiSubject.get(request2);
      setSubject(response2.data.message);
      setSelectSubject(response2.data.message);
      toast.success("Data updated successfully");
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  async function createSubjectForGroup(newGroupId, newSubjId) {
    //а это типа создание папки в папке студента типо разные папки 
    const request = {
      groupId: newGroupId,
      subjects: newSubjId
    };
    const request2 = {
      groupId: newGroupId
    };
    try {
      const response = await apiSubject.addToGroup(request);
      toast.success("Data updated successfully");


      const response2 = await apiSubject.getGroupsSubject(request2);
      console.log(response2);
      setSubject(response2.data.message);


    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }
  async function deleteSubjectFromGroup(id, newGroupId) {
    const request = {
      subjectGroupId: id
    };
    const request2 = {
      groupId: newGroupId
    };
    const confirmed = window.confirm('Вы точно хотите удалить выбранный файл ?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await apiSubject.deleteFromGroup(request);
      toast.success("Data updated successfully");

      const response2 = await apiSubject.getGroupsSubject(request2);
      console.log(response2);
      setSubject(response2.data.message);

    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }
  const [newGroupCode, setNewGroupCode] = useState("");

  const handleGroupChange = async (e) => {
    const selectedGroupId = e.value;
    console.log(selectedGroupId)
    if (selectedGroupId === '') {
      setNewGroupCode(''); // Set empty group code
    } else {
      const selectedGroup = groups.find((grp) => grp.id === selectedGroupId);
      setNewGroupCode(selectedGroup.code);
    }
    const groupId = parseInt(e.value);
    setNewGroups(groupId);
    setShowGroupCurriculum(true);
    // setSubject([])

    try {
      const request = {
        groupId: groupId
      };
      console.log(request);
      const response = await apiSubject.getGroupsSubject(request);
      console.log(response);
      setSubject(response.data.message);

    } catch (error) {
      console.error(error);
      console.error('ERROR GET LESSONS');
      toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
    }
  };
  const handleMultipleGroupChange = async (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedGroups = selectedOptions.map((option) => option.value);
    setnewMultipleSubjects(selectedGroups);
    setShowGroupCurriculum(true);
  };

  const handleSubjectChange = (e) => {
    const subjId = e.target.value;
    setNewSubject(subjId);
    setShowGroupCurriculum(false);
  };
  const handleTeacherChange = (e) => {
    const teachId = e.target.value;
    setNewTeachers(teachId)
  };
  const handleExamChange = (e) => {
    const exId = e.target.value;
    setSelectedExamIds(exId)
  };
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  const handleBlockClick = async (blockId) => {
    if (blockId === selectedBlockId) {
      return; // Do nothing if the block is already selected
    }
    setSubject([])
    setSelectedBlockId(blockId);
    setNewGroups(''); // Assuming an empty string is the default value
    setNewGroupCode('')

    if (blockId === 'plan') {
      try {
        const response = await apiSubject.get();
        setSubject(response.data.message);
      } catch (error) {
        console.error(error);
        console.error('ERROR GET LESSONS');
        toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
      }
    }
  };

  console.log(subject)


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


      <div className="title">
        Учебный план группы
      </div>

      <div className="record_subblock_teacher">

        <button type='button' className="button_create" onClick={() => handleBlockClick('plan')}>Все дисциплины</button>
        <div className="subblock_text">
          Выбор группы
        </div>
        <Select
          className="new_select_subblock"
          onChange={(selectedOption) => {
            handleBlockClick('group');
            handleGroupChange(selectedOption);
          }}
          options={[
            { value: "", label: "Выберите группу" },
            ...groups.map((grp) => ({
              value: grp.id,
              label: `${grp.code} ${grp.groupName} ${grp.type}`,
            })),
          ]}
          placeholder="Выберите группу"
        />
        {/* <select className="select_block" value={newGroups.toString()} onChange={handleGroupChange}>
              <option value="">Выберите группу</option>
              {groups.map((grp) => (
                <option key={grp.id} value={grp.id}>
                  {grp.code} {grp.groupName} {grp.type}
                </option>
              ))}
            </select> */}
      </div>

      {isMobile ? (
        // JSX for small screens (width <= 600)
        <div className="plan_screen_container">
          {/* Render curriculum based on selected block */}
          {selectedBlockId === 'group' ? (
            // Render curriculum for selected group
            <div>
              {/* Render curriculum for selected group here */}
              <div>
                {newGroupCode && <div>Выбранная группа: {newGroupCode}</div>}
                {/* <div className="plan_heading">
                  <div className="plan_rec">Дисциплина</div>
                  <div className="plan_rec">Количество часов</div>
                  <div className="plan_rec">Отчетность</div>
                  <div className="plan_rec">Преподаватель</div>
                </div> */}
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
            </div>
          ) : (
            // Render entire curriculum
            <div>
              Все дисциплины
              {/* Render entire curriculum here */}
              <div>
                {/* <div className="plan_heading">
                  <div className="plan_rec">Дисциплина</div>
                  <div className="plan_rec">Количество часов</div>
                  <div className="plan_rec">Отчетность</div>
                  <div className="plan_rec">Преподаватель</div>
                </div> */}
                {subject?.map(subj => (
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
                    {/* <div className="rec_shedule">Номер группы</div> */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // JSX for large screens (width > 600)
        <div className="plan_screen_container">
          {/* Render curriculum based on selected block */}
          {selectedBlockId === 'group' ? (
            // Render curriculum for selected group
            <div>
              {/* Render curriculum for selected group here */}
              <div>
                {newGroupCode && <div>Выбранная группа: {newGroupCode}</div>}
                <div className="plan_heading">
                  <div className="plan_rec">Дисциплина</div>
                  <div className="plan_rec">Количество часов</div>
                  <div className="plan_rec">Отчетность</div>
                  <div className="plan_rec">Преподаватель</div>
                  {/* <div className="plan_rec">Действия</div> */}
                </div>
                {subject?.map(subj => (
                  <div key={subj.id}>
                    <div className="plan_block">
                      <div className="plan_rec">
                        {subj.name}
                      </div>
                      <div className="plan_rec">
                        {subj.summaryHours}
                      </div>
                      <div className="plan_rec" >
                        {subj.examType}
                      </div>
                      <div className="plan_rec">
                        {subj.teacher}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Render entire curriculum
            <div>
              Все дисциплины
              {/* Render entire curriculum here */}
              <div>
                <div className="plan_heading">
                  <div className="plan_rec">Дисциплина</div>
                  <div className="plan_rec">Количество часов</div>
                  <div className="plan_rec">Отчетность</div>
                  <div className="plan_rec">Преподаватель</div>
                  {/* <div className="plan_rec">Действия</div> */}
                </div>
                {subject?.map(subj => (
                  <div key={subj.id}>
                    <div className="plan_block">
                      <div className="plan_rec">
                        {subj.name}
                      </div>
                      <div className="plan_rec">
                        {subj.summaryHours}
                      </div>
                      <div className="plan_rec" >
                        {subj.examType}
                      </div>
                      <div className="plan_rec">
                        {subj.teacher}
                      </div>
                    </div>
                  </div>
                ))}
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
  );
}

export default TeacherPlanScreen;