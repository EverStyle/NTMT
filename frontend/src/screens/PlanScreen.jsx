import React from "react";
import { useEffect, useState, useMemo } from "react";
import { plan, practise } from "../json/plan";
import { ToastContainer, toast } from "react-toastify";
import apiSubject from "../api/subjects";

function PlanScreen() {
  const { subjects } = plan[0];
  const { subjects_pr } = practise[0];
  const [subject, setSubject] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [exams, setExams] = useState([]);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedExamIds, setSelectedExamIds] = useState([]);

  const [newSubjectTitle, setNewSubjectTitle] = useState('')
  const [newHours, setNewHours] = useState(0)

  const toggleUserSelection = (userId) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(userId);
    }
  };

  const toggleExamSelection = (examId) => {
    if (selectedExamIds === examId) {
      setSelectedExamIds(null);
    } else {
      setSelectedExamIds(examId);
    }
  };

  console.log(selectedUserId)
  console.log(typeof selectedUserId)
  
  useEffect(async () => {
    try {
      const request = {
        roleId: 3
      };
      const response = await apiSubject.get(request);
      setSubject(response.data.message);
      // const response2 = await apiSubject.getuser(request);
      // setTeachers(response2.data.message);
      // const response3 = await apiSubject.exams(request);
      // setExams(response3.data.message);
    } catch (error) {
      console.error(error);
      console.error('ERROR GET LESSONS');
      toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
    }

  }, []);

  async function createSubject(newTitle, newhours, exam, techerselect) {
    //а это типа создание папки в папке студента типо разные папки 
    const request = {
      name: newTitle,
      teacherId: techerselect,
      examType: exam,
      hours: newhours
    };
    const request2 = {};
    try {
      const response = await apiSubject.subjCreate(request);
      toast.success("Data updated successfully");
      const data = response.data;
      const response2 = await apiSubject.get(request2);
      setSubject(response2.data.message);
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  const [editMode, setEditMode] = useState(false);

  const [editableSubject, setEditableSubject] = useState({});

  const [newTitle, setNewTitle] = useState('');
  const [newHoursSubj, setNewHoursSubj] = useState('');
  const [newExamType, setNewExamType] = useState('');
  const [newTeacherId, setNewTeacherId] = useState('');

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
      toast.success("Data updated successfully");
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  return (
    <div>
      <div>
        Создание учебного плана
        <div>
          {subject?.map(subj => (
            <div key={subj.id}>
              {!editableSubject[subj.id] ? (
                <div>
                  {subj.name} {subj.summaryHours} {subj.examType} {subj.teacher}
                  <button className="button_delete" onClick={() => deleteSubject(subj.id)}>
                    Delete
                  </button>
                  <button className="button_delete" onClick={() => handleEditClick(subj.id)}>
                    Update
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder='Введите'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder='Введите'
                    value={newHoursSubj}
                    onChange={(e) => setNewHoursSubj(e.target.value)}
                  />
                  <select value={newExamType} onChange={(e) => setNewExamType(e.target.value)}>
                    <option value="">Select Exam Type</option>
                    {exams.map((exam) => (
                      <option key={exam.id} value={exam.id}>
                        {exam.type}
                      </option>
                    ))}
                  </select>
                  <select value={newTeacherId} onChange={(e) => setNewTeacherId(e.target.value)}>
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => updateSubject(subj.id, newTitle, newTeacherId, newExamType, newHoursSubj)}>Save</button>
                  <button onClick={() => handleEditClickExit(subj.id)}>Exit</button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          {
            teachers?.map(teach => (
              <div key={teach.id} onClick={() => toggleUserSelection(teach.id)}>
                {teach.fio} {selectedUserId === teach.id && '(выбран)'}{teach.id}
              </div>
            ))
          }
        </div>

        <input type="text" placeholder='Введите название уведомления' onChange={(e) => setNewSubjectTitle(e.target.value)} />
        <input id="number" type="number" placeholder='Введите количество часов' onChange={(e) => setNewHours(e.target.value)} />
        {
          exams?.map(ex => (
            <div key={ex.id} onClick={() => toggleExamSelection(ex.id)}>{ex.type} {selectedExamIds === ex.id && '(выбран)'}{ex.id}</div>
          ))
        }
        {/* {
            exams?.map(ex => (
              <div key={teach.id} onClick={() => toggleUserSelection(teach.id)}>
                {teach.fio} {selectedUserId === teach.id && '(выбран)'}
              </div>
            ))
          } */}
        <button type='button' onClick={() => createSubject(newSubjectTitle, newHours, selectedExamIds, selectedUserId)}>Создать</button>
      </div>

      <div className='title'>Учебный план</div>
      <div className='detail-record-book'>
        <div className='detail-napr'>
          <span>Направление:</span> Компьютерные системы и комплексы
        </div>
        <div className='detail-qval'>
          <span>Квалификация:</span> Техник
        </div>
        <div className='detail-form'>
          <span>Выбор семестра:</span> Все семестры
        </div>
      </div>
      <div className='details-table plan-table'>
        <table className='detail-table'>
          <thead className='detail-thead'>
            <tr className='main-tr'>
              <td>Дисциплина</td>
              <td>Кол-во зачетных единиц/часов</td>
              <td>Отчетность</td>
              <td>Семестры</td>
            </tr>
          </thead>
          <tbody>
            <tr className='main-tr'>
              <td className='zach-detail'>{plan[0].disp}</td>
              <td className='zach-detail'>{plan[0].allTime}</td>
              <td className='zach-detail'></td>
              <td className='zach-detail'></td>
            </tr>
            {subjects.map((sub, index) => (
              <tr key={index}>
                <td className='zach-detail'>{sub.subject}</td>
                <td className='zach-detail'>{sub.hours}</td>
                <td className='zach-detail'>{sub.result}</td>
                <td className='zach-detail'>{sub.semestrs}</td>
              </tr>
            ))}
            <tr className='main-tr'>
              <td className='zach-detail'>{practise[0].disp}</td>
              <td className='zach-detail'>{practise[0].allTime}</td>
              <td className='zach-detail'></td>
              <td className='zach-detail'></td>
            </tr>
            {subjects_pr.map((pract, index) => (
              <tr key={index}>
                <td className='zach-detail'>{pract.subject}</td>
                <td className='zach-detail'>{pract.hours}</td>
                <td className='zach-detail'>{pract.result}</td>
                <td className='zach-detail'>{pract.semestrs}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
