import React, { useEffect, useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import './style/AdminRecordBook.css';
import apiRecordBook from "../api/recordBook";
// import apiSubject from "../api/subjects";
import apiSchedule from "../api/schedule";
import Select from 'react-select';
import { CSSTransition} from 'react-transition-group';

function TeacherRecordBook() {


    const [userRecord, setUserRecord] = useState([]);

    // const [subject, setSubject] = useState([]);

    // const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    // const [semester, setSemester] = useState([]);
    // const [exams, setExams] = useState([]);

    // const [newStudents, setNewStudents] = useState(0);
    const [newStudents2, setNewStudents2] = useState(0);

    const [newResultUpd, setNewResultUpd] = useState([]);

    const [editableSubject, setEditableSubject] = useState({});

    const [groups, setGroups] = useState([]);
    // const [newGroups, setNewGroups] = useState([]);


    const [subblockMount, showSubblockMount] = useState(false);

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

    useEffect(() => {
        const fetchData = async () => {
          try {
            setTimeout(() => {
              showSubblockMount(true);
            }, 100);
            await fetchGroups();
          } catch (error) {
            console.error(error);
            console.error('ERROR GET LESSONS');
            toast.error(
              'Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку'
            );
          }
        };
      
        fetchData();
      }, []);

    async function updateRecordBook(recId, mark, userselect) {
        const request = {
            recordId: recId,
            endMark: mark,
        };
        const request2 = {
            userId: userselect
        };
        try {
            const response = await apiRecordBook.updateTeacherRecord(request);
            const response6 = await apiRecordBook.get(request2);
            setUserRecord(response6.data.message);
            toast.success("Data updated successfully");
        } catch (error) {

            console.error(error);
            console.error('ERROR DOWNLOAD FILE');
            toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
        }
    }

    async function uploadStudents(studId) {
        const request = {
            userId: studId
        };
        try {
            console.log(request)
            const response6 = await apiRecordBook.get(request);
            setUserRecord(response6.data.message);

        } catch (error) {

            console.error(error);
            console.error('ERROR DOWNLOAD FILE');
            toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
        }
    }


    const fetchGroups = async () => {
        try {
            const response = await apiSchedule.groups();
            setGroups(response.data.message);
        } catch (error) {
            console.error(error);
            console.error('ERROR GET GROUPS');
            toast.error(
                'Произошла ошибка при получении групп. Попробуйте позже или обратитесь в техподдержку'
            );
        }
    };

    const fetchStudents = async (groupId) => {
        try {
            const response = await apiSchedule.certainGroups(groupId);
            console.log(response.data.message)
            setStudents(response.data.message);
        } catch (error) {
            console.error(error);
            console.error('ERROR GET STUDENTS');
            toast.error(
                'Произошла ошибка при получении студентов. Попробуйте позже или обратитесь в техподдержку'
            );
        }
    };

    const handleGroupChange = (e) => {
        const groupId = e.value;
        // setNewGroups(groupId);

        if (groupId === "") {
            setUserRecord([]);
            setStudents([]); // Clear the students array when the default value is selected

        } else {
            fetchStudents(groupId);
            setUserRecord([]); // Send an empty array when the group changes
        }
    };

    const handleStudentChange = (e) => {
        const studentId = e.value;
        setNewStudents2(studentId);
    };

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
                    Зачетная книжка студентов
                </div>
                <div className="two_group_selector">
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
                    <Select
                        className="new_select_subblock"
                        onChange={(selectedOption) => {
                            // setNewStudents(selectedOption.value);
                            uploadStudents(selectedOption.value);
                            handleStudentChange(selectedOption);
                        }}
                        options={[
                            { value: 0, label: "Выберите студента" },
                            ...students.map((student) => ({
                                value: student.id,
                                label: student.fio,
                            })),
                        ]}
                        placeholder="Выберите студента"
                    />
                </div>

                {isMobile ? (
                    // JSX for small screens (width <= 600)
                    <div className="record_container">
                        <div className="heading">
                        </div>
                        {userRecord.length > 0 ? (
                            userRecord.map((record) => (
                                <div>
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
                                            <div className="rec_shedule">{record.date}</div>
                                            {/* <div className="rec_shedule">{new Date(record.date).toLocaleDateString('en-US', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}</div> */}
                                        </div>
                                        <div className="schedule_mobile_data">
                                            <div className="rec_shedule">Преподаватель :</div>
                                            <div className="rec_shedule">{record.teacher}</div>
                                        </div>
                                        <div className="schedule_mobile_data">
                                            <div className="rec_shedule">Действия :</div>
                                            <button style={{ textAlign: 'left' }} className="recordbook_buttons" onClick={() => handleEditClick(record.id)}>
                                            <span>Сменить оценку</span>
                                            </button>
                                        </div>
                                    </div>
                                    {!editableSubject[record.id] ? (
                                        <div className="record_buttons">

                                        </div>
                                    ) : (
                                        <div>
                                            <input className="select_block_record"
                                                type="text"
                                                placeholder='Введите результат'
                                                value={newResultUpd}
                                                onChange={(e) => setNewResultUpd(e.target.value)}
                                            />
                                            <button className="select_block_button_record" onClick={() => updateRecordBook(record.id, newResultUpd, newStudents2)}>Сохранить</button>
                                            <button className="select_block_button_record_delete" onClick={() => handleEditClickExit(record.id)}>Отмена</button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div>Нет информации о зачетной книжке</div>
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
                                <div>
                                    <div key={record.id} className="record_student_block">
                                        <div className="rec">{record.subjectName}</div>
                                        <div className="rec">{record.summaryHours}</div>
                                        <div className="rec">{record.endMark}</div>
                                        <div className="rec">{record.date}</div>
                                        <div className="rec">{record.teacher}</div>
                                        <div>
                                            <button className="recordbook_buttons" onClick={() => handleEditClick(record.id)}>
                                            Сменить оценку
                                            </button>
                                        </div>
                                    </div>
                                    {!editableSubject[record.id] ? (
                                        <div className="record_buttons">

                                        </div>
                                    ) : (
                                        <div>
                                            <input className="select_block_record"
                                                type="text"
                                                placeholder='Введите результат'
                                                value={newResultUpd}
                                                onChange={(e) => setNewResultUpd(e.target.value)}
                                            />
                                            <button className="select_block_button_record" onClick={() => updateRecordBook(record.id, newResultUpd, newStudents2)}>Сохранить</button>
                                            <button className="select_block_button_record_delete" onClick={() => handleEditClickExit(record.id)}>Отмена</button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div>Нет информации о зачетной книжке</div>
                        )}
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
    )
}

export default TeacherRecordBook;

