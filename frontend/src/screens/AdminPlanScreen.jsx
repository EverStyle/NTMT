import React from "react";
import { useEffect, useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import apiSubject from "../api/subjects";
import apiSchedule from "../api/schedule";
import './style/AdminPlanScreen.css';
import Select from 'react-select';
import { CSSTransition } from 'react-transition-group';

function AdminPlanScreen() {
  const [subject, setSubject] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExamIds, setSelectedExamIds] = useState([]);
  const [newSubjectTitle, setNewSubjectTitle] = useState('')
  const [newHours, setNewHours] = useState(0)
  const [editableSubject, setEditableSubject] = useState({});
  const [newTitle, setNewTitle] = useState('');
  const [newHoursSubj, setNewHoursSubj] = useState('');
  const [newExamType, setNewExamType] = useState('');
  const [newTeacherId, setNewTeacherId] = useState('');
  const [groups, setGroups] = useState([]);
  const [newGroups, setNewGroups] = useState([]);
  const [newMultipleSubjects, setnewMultipleSubjects] = useState([]);
  const [newteachers, setNewTeachers] = useState([]);
  const [selectSubject, setSelectSubject] = useState([]);



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
  const [subblockMount, showSubblockMount] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = {
          roleId: 3
        };
        setTimeout(() => {
          showSubblockMount(true);
        }, 100);
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
        toast.error('Произошла ошибка при получении информации о учебном плане. Попробуйте позже или обратитесь в техподдержку');
      }
    }
    setTimeout(() => {
      showSubblockMount(true);
    }, 100);
    fetchData();
  }, []);

  async function createSubject(newTitle, newhours, exam, techerselect) {

    const request = {
      name: newTitle,
      teacherId: techerselect,
      examType: exam,
      hours: newhours
    };
     ;
    const request2 = {};
    try {
      const response = await apiSubject.subjCreate(request);
      toast.success("Создание успешно");
      const data = response.data;
      const response2 = await apiSubject.get(request2);
      setSubject(response2.data.message);
      setSelectSubject(response2.data.message);
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при создании учебного плана. Попробуйте позже или обратитесь в техподдержку');
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
       
      const response = await apiSubject.updateSubj(request);
      handleEditClickExit(subjId);
      const response2 = await apiSubject.get(request2);
      setSubject(response2.data.message);
      setSelectSubject(response2.data.message);
      toast.success("Обновление успешно");
    } catch (error) {

      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при обновлении учебного плана. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  async function deleteSubject(id) {
    const request = {
      subjectId: id
    };
    const request2 = {};
    const confirmed = window.confirm('Вы точно хотите удалить выбранный учебный план ?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await apiSubject.deleteSubj(request);
      const response2 = await apiSubject.get(request2);
      setSubject(response2.data.message);
      setSelectSubject(response2.data.message);
      toast.success("Удаление успешно");
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при удалении учебного плана. Попробуйте позже или обратитесь в техподдержку');
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
      toast.success("Присвоение успешно");
      const response2 = await apiSubject.getGroupsSubject(request2);
       ;
      setSubject(response2.data.message);
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при получении информации ог учебном плане группы. Попробуйте позже или обратитесь в техподдержку');
    }
  }
  async function deleteSubjectFromGroup(id, newGroupId) {
    const request = {
      subjectGroupId: id
    };
    const request2 = {
      groupId: newGroupId
    };
    const confirmed = window.confirm('Вы точно хотите удалить выбранный учебный план ?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await apiSubject.deleteFromGroup(request);
      toast.success("Удаление успешно");

      const response2 = await apiSubject.getGroupsSubject(request2);
       ;
      setSubject(response2.data.message);

    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка удалении. Попробуйте позже или обратитесь в техподдержку');
    }
  }
  const [newGroupCode, setNewGroupCode] = useState("");

  const handleGroupChange = async (e) => {
    const selectedGroupId = e.value;
     
    if (selectedGroupId === '') {
      setNewGroupCode(''); // Set empty group code
    } else {
      const selectedGroup = groups.find((grp) => grp.id === selectedGroupId);
      setNewGroupCode(selectedGroup.code);
    }

    const groupId = parseInt(e.value);
    setNewGroups(groupId);
    // setShowGroupCurriculum(true);
    // setSubject([])
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
  };

  const handleTeacherChange = (e) => {
    const teachId = e.value;
    setNewTeachers(teachId)
  };
  const handleTeacherChange2 = (e) => {
    const teachId = e.value;
    setNewTeacherId(teachId)
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

  return (
    <div>
      <CSSTransition
        in={subblockMount}
        timeout={300}
        classNames="subblock_mount"
        mountOnEnter
        unmountOnExit
      >
        <div>

          <div className="all_create_block">
            <div className={`create_subj_block ${selectedBlockId === 'group' ? 'active' : ''}`}
              onClick={() => handleBlockClick('group')}>
              <div className="title">
                Присвоение дисциплины к группе
              </div>
              <div className="subj_subblock">
                <div className="subblock_text_subject">
                  Выбор дисциплин
                </div>
                <Select
                  onChange={(selectedOptions) => {
                    const newMultipleSubjects = selectedOptions.map((option) => option.value);
                    setnewMultipleSubjects(newMultipleSubjects);
                  }}
                  options={selectSubject.map((subj) => ({
                    value: subj.id,
                    label: `${subj.name} ${subj.teacher}`,
                  }))}
                  isMulti
                  className="new_select_subblock"
                  classNamePrefix="select"
                  placeholder="Выберите предмет"
                />
              </div>
              <div className="subj_subblock">
                <div className="subblock_text">
                  Выбор группы
                </div>
                <Select
                  className="new_select_subblock"
                  onChange={handleGroupChange}
                  options={[
                    { value: "", label: "Выберите группу" },
                    ...groups.map((grp) => ({
                      value: grp.id,
                      label: `${grp.code} ${grp.groupName} ${grp.type}`,
                    })),
                  ]}
                  placeholder="Выберите группу"
                />
              </div>
              <button type='button' className="select_block_button_record" onClick={() => createSubjectForGroup(newGroups, newMultipleSubjects)}>Создать</button>
            </div>

            <div className={`create_subj_block ${selectedBlockId === 'plan' ? 'active' : ''}`}
              onClick={() => handleBlockClick('plan')}>
              <div>
                <div className="title">
                  Создание учебного плана
                </div>

                <div>
                  <div className="subj_subblock">
                    <div className="subblock_text">
                      Выберите преподавателя для новой дисциплины
                    </div>
                    <Select
                      className="new_select_subblock"
                      onChange={handleTeacherChange}
                      placeholder="Выберите преподавателя"
                      options={[
                        { value: "", label: "Выберите прeподавателя" },
                        ...(teachers || []).map((teach) => ({
                          value: teach.id,
                          label: teach.fio,
                        })),
                      ]}
                    />
                  </div>
                  <div className="subj_subblock">
                    <div className="subblock_text">
                      Выберите название дисциплины
                    </div>
                    <div>
                      <input type="text" className="select_block_record" placeholder='Введите название дисциплины' onChange={(e) => setNewSubjectTitle(e.target.value)} />
                    </div>
                  </div>
                  <div className="subj_subblock">
                    <div className="subblock_text">
                      Введите количество часов
                    </div>
                    <div>
                      <input id="number" className="select_block_record" type="number" placeholder='Введите количество часов' onChange={(e) => setNewHours(e.target.value)} />
                    </div>
                  </div>
                  <div className="subj_subblock">
                    <div className="subblock_text">
                      Выберите тип сдачи дисциплины
                    </div>
                    <select className="select_block_record" value={selectedExamIds} onChange={handleExamChange}>
                      <option value="">Выберите тип</option>
                      {exams?.map((ex) => (
                        <option key={ex.id} value={ex.id}>
                          {ex.type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type='button' className="select_block_button_record" onClick={() => createSubject(newSubjectTitle, newHours, selectedExamIds, newteachers)}>Создать</button>
              </div>
            </div>
          </div>

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
                  <div className="plan_rec">Действия</div>
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

                      <div> 
                        <button className="recordbook_buttons_delete" onClick={() => deleteSubjectFromGroup(subj.id, newGroups)}>
                        Удалить
                      </button>
                        {/* <button className="recordbook_buttons_create" onClick={() => handleEditClick(subj.id)}>
                          Обновить
                        </button> */}
                      </div>
                    </div>
                    {!editableSubject[subj.id] ? (
                      <div>
                      </div>
                    ) : (
                      <div>
                        <input
                          className="select_block_record"
                          type="text"
                          placeholder='Введите новое назавние'
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <input
                          className="select_block_record"
                          type="number"
                          placeholder='Введите новое количество часов'
                          value={newHoursSubj}
                          onChange={(e) => setNewHoursSubj(e.target.value)}
                        />
                        <select className="select_block_record" value={newExamType} onChange={(e) => setNewExamType(e.target.value)}>
                          <option value="">Выберите тип экзамена</option>
                          {exams.map((exam) => (
                            <option key={exam.id} value={exam.id}>
                              {exam.type}
                            </option>
                          ))}
                        </select>
                        {/* <select className="select_block_record" value={newTeacherId} onChange={(e) => setNewTeacherId(e.target.value)}>
                          <option value="">Select Teacher</option>
                          {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                              {teacher.name}
                            </option>
                          ))}
                        </select> */}
                        <Select
                      className="new_select_subblock"
                      onChange={handleTeacherChange2}
                      placeholder="Выберите преподавателя"
                      options={[
                        { value: "", label: "Выберите прeподавателя" },
                        ...(teachers || []).map((teach) => ({
                          value: teach.id,
                          label: teach.fio,
                        })),
                      ]}
                    />
                        <button className="select_block_button_record" onClick={() => updateSubject(subj.id, newTitle, newTeacherId, newExamType, newHoursSubj)}>Сохранить</button>
                        <button className="select_block_button_record_delete" onClick={() => handleEditClickExit(subj.id)}>Отмена</button>
                      </div>
                    )}
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
                  <div className="plan_rec">Действия</div>
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

                      <div> <button className="recordbook_buttons_delete" onClick={() => deleteSubject(subj.id)}>
                        Удалить
                      </button>
                        <button className="recordbook_buttons_create" onClick={() => handleEditClick(subj.id)}>
                          Обновить
                        </button></div>
                    </div>
                    {!editableSubject[subj.id] ? (
                      <div></div>
                    ) : (
                      <div className="edit_sibj_block">
                        <input
                          className="select_block_record"
                          type="text"
                          placeholder='Введите название дициплины'
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <input
                          className="select_block_record"
                          type="number"
                          placeholder='Введите количество часов'
                          value={newHoursSubj}
                          onChange={(e) => setNewHoursSubj(e.target.value)}
                        />
                        <select className="select_block_record" value={newExamType} onChange={(e) => setNewExamType(e.target.value)}>
                          <option value="">Выберите тип экзамена</option>
                          {exams.map((exam) => (
                            <option key={exam.id} value={exam.id}>
                              {exam.type}
                            </option>
                          ))}
                        </select>
                        <Select
                          className="new_select_subblock"
                          onChange={(selectedOption) => setNewTeacherId(selectedOption.value)}
                          placeholder="Выберите преподавателя"
                          options={[
                            { value: "", label: "Выберите преподавателя" },
                            ...teachers.map((teacher) => ({
                              value: teacher.id,
                              label: teacher.fio,
                            })),
                          ]}
                        />
                        <button className="select_block_button_record" onClick={() => updateSubject(subj.id, newTitle, newTeacherId, newExamType, newHoursSubj)}>Сохранить</button>
                        <button className="select_block_button_record_delete" onClick={() => handleEditClickExit(subj.id)}>Отмена</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CSSTransition>


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

export default AdminPlanScreen;