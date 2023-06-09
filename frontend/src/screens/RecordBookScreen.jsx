
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import './style/AdminRecordBook.css';
import apiRecordBook from "../api/recordBook";
// import apiSubject from "../api/subjects";
import apiAccount from "../api/account";
import { CSSTransition } from 'react-transition-group';

function RecordBookScreen() {
    const [userRecord, setUserRecord] = useState([]);
    // const [subject, setSubject] = useState([]);
    const [semester, setSemester] = useState([]);
    // const [exams, setExams] = useState([]);
    const [newYear, setNewYear] = useState(0);
    const [newSemesterId, setNewSemesterId] = useState(0);
    const [placeHolder, setplaceHolder] = useState("Нет информации о зачетной книжке");
    const [userGroupInfo, setUserGroupInfo] = useState([]);
    const [subblockMount, showSubblockMount] = useState(false);

    useEffect(() => {
        async function fetchData() {
          try {
            setTimeout(() => {
                showSubblockMount(true);
              }, 50);
            const request4 = {
              roleId: 3
            };
            const request5 = {
              semestrId: newSemesterId,
              year: newYear
            };
            const response2 = await apiAccount.info();
            setUserGroupInfo(response2.data.message);
            const response5 = await apiRecordBook.getSem(request4);
            setSemester(response5.data.message);
            const response6 = await apiRecordBook.getInf(request5);
            if (response6.data.message.length === 0) {
              setUserRecord([]);
              setplaceHolder("Нет информации о зачетной книжке");
            } else {
              setUserRecord(response6.data.message);
            }
            showSubblockMount(true);
          } catch (error) {
            console.error(error);
            console.error('ERROR GET LESSONS');
          }
        }
        fetchData();
      }, [newSemesterId, newYear]);



     

    function getCurrentYear() {
        return new Date().getFullYear();
    }

    function getPreviousYear() {
        return new Date().getFullYear() - 1;
    }

    function getNextYear() {
        return new Date().getFullYear() + 1;
    }

     


    const dateStr = '2023-03-05T05:00:00.000Z';
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

     ; // Output: 03.05.2023

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
                <div>
                    <div className="title">
                        Зачетная книжка
                    </div>
                    <div className="short_user_info">
                        <div className="short_user_info_subblock">
                            <strong> Номер группы : </strong> {userGroupInfo.code}
                        </div>
                        <select className="select_block_record_stud" value={newSemesterId} onChange={(e) => setNewSemesterId(e.target.value)}>
                            <option value="Some">Выберите семестр</option>
                            {semester.map((sem) => (
                                <option key={sem.id} value={sem.id}>
                                    {sem.value}
                                </option>
                            ))}
                        </select>
                        <select className="select_block_record_stud" value={newYear} onChange={(e) => setNewYear(e.target.value)}>
                            <option value="Some">Выберите год</option>
                            <option value={getCurrentYear()}>{getCurrentYear()}</option>
                            <option value={getPreviousYear()}>{getPreviousYear()}</option>
                            <option value={getNextYear()}>{getNextYear()}</option>
                        </select>
                    </div>
                    <div className="short_user_info_subblock">
                        <strong> Направление : </strong>  {userGroupInfo.groupName}
                    </div>
                    <div className="short_user_info_subblock">
                        <strong> Форма обучения : </strong>  {userGroupInfo.type}
                    </div>

                    <div className="short_user_info_subblock">
                        <strong>Срок обучения:</strong> {
                            userGroupInfo.type === 'Очная' ? '3 года' :
                                userGroupInfo.type === 'Заочная' ? '4 года' :
                                    userGroupInfo.type === 'Очно-заочная' ? '5 лет' : ''}
                    </div>
                </div>
                {isMobile ? (
                    // JSX for small screens (width <= 600)
                    <div className="record_container">
                        <div className="heading">
                        </div>
                        {userRecord.length > 0 ? (
                            userRecord.map((record) => (
                                <div key={record.id} className="record_mobile_block">
                                    <div className="schedule_mobile_data">
                                        <div className="rec_shedule">Дисциплина :</div>
                                        <div className="rec_shedule">{record.subjectName}</div>
                                    </div>
                                    <div className="schedule_mobile_data">
                                        <div className="rec_shedule">Количество часов :</div>
                                        <div className="rec_shedule">{record.summaryHours}</div>
                                    </div>
                                    <div className="schedule_mobile_data">
                                        <div className="rec_shedule">Итоговая оценка :</div>
                                        <div className="rec_shedule">{record.endMark}</div>
                                    </div>
                                    <div className="schedule_mobile_data">
                                        <div className="rec_shedule">Дата сдачи :</div>
                                        <div className="rec_shedule">{new Date(record.date).toLocaleDateString('en-US', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}</div>
                                    </div>
                                    <div className="schedule_mobile_data">
                                        <div className="rec_shedule">Преподаватель :</div>
                                        <div className="rec_shedule">{record.teacher}</div>
                                    </div>
                                    {/* <div className="rec_shedule">Номер группы</div> */}
                                </div>
                            ))
                        ) : (
                            <div>{placeHolder}</div>
                        )}
                    </div>
                ) : (
                    // JSX for large screens (width > 600)
                    <div className="record_container">

                        <div className="heading">
                            <div className="rec">Дисциплина</div>
                            <div className="rec">Количество часов</div>
                            <div className="rec">Итоговая оценка</div>
                            <div className="rec">Дата сдачи</div>
                            <div className="rec">Преподаватель</div>
                            {/* <div className="">Действия</div> */}

                        </div>
                        {userRecord.length > 0 ? (
                            userRecord.map((record) => (
                                <div key={record.id} className="record_student_block">
                                    <div className="rec">{record.subjectName}</div>
                                    <div className="rec">{record.summaryHours}</div>
                                    <div className="rec">{record.endMark}</div>
                                    <div className="rec">
                                        {new Date(record.date).toLocaleDateString('en-US', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </div>
                                    <div className="rec">{record.teacher}</div>
                                </div>
                            ))
                        ) : (
                            <div>{placeHolder}</div>
                        )}
                    </div>
                )}
            </div>



            {/* <div className="">
                <input type="text" placeholder='Введите оценку' onChange={(e) => setNewResult(e.target.value)} />
                <input type="date" onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const formattedDate = selectedDate.toLocaleDateString('ru-RU');
                    {   }

                    setNewDate(formattedDate);
                }} />
                <select value={newStudents} onChange={(e) => setNewStudents(e.target.value)}>
                    <option value="Some">Выберите студента</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.fio}
                        </option>
                    ))}
                </select>
                <select value={newSubjectId} onChange={(e) => setNewSubjectId(e.target.value)}>
                    <option value="Some">Выберите предмет</option>
                    {subject.map((subj) => (
                        <option key={subj.id} value={subj.id}>
                            {subj.name}
                        </option>
                    ))}
                </select>
                <select value={newSemesterId} onChange={(e) => setNewSemesterId(e.target.value)}>
                    <option value="Some">Выберите семестр</option>
                    {semester.map((sem) => (
                        <option key={sem.id} value={sem.id}>
                            {sem.value}
                        </option>
                    ))}
                </select>
                <input type="number" placeholder='Введите год' onChange={(e) => setNewYear(e.target.value)} />
                <button type='button' onClick={() => createRecordBook(newResult, newDate, newStudents, newSubjectId, newSemesterId, newYear)}>Создать</button>
            </div> */}

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
    )
}

export default RecordBookScreen;





