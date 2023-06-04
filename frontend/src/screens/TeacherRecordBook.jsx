import React, { useEffect, useState, useMemo } from "react";
import Headers from "../components/Header/Header";
import zach from "../json/zachetka";
import { ToastContainer, toast } from "react-toastify";
import './style/AdminRecordBook.css';
import apiRecordBook from "../api/recordBook";
import apiSubject from "../api/subjects";
import apiAccount from "../api/account";
import apiSchedule from "../api/schedule";
import Select from 'react-select';

function TeacherRecordBook() {


    const [userRecord, setUserRecord] = useState([]);

    const [subject, setSubject] = useState([]);

    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [semester, setSemester] = useState([]);
    const [exams, setExams] = useState([]);

    const [newStudents, setNewStudents] = useState(0);
    const [newStudents2, setNewStudents2] = useState(0);

    const [newYear, setNewYear] = useState([]);
    const [newDate, setNewDate] = useState([]);
    const [newSubjectId, setNewSubjectId] = useState([]);
    const [newSemesterId, setNewSemesterId] = useState([]);
    const [newResult, setNewResult] = useState([]);

    const [newStudentsUpd, setNewStudentsUpd] = useState(0);
    const [newYearUpd, setNewYearUpd] = useState([]);
    const [newDateUpd, setNewDateUpd] = useState([]);
    const [newSubjectIdUpd, setNewSubjectIdUpd] = useState([]);
    const [newSemesterIdUpd, setNewSemesterIdUpd] = useState([]);
    const [newResultUpd, setNewResultUpd] = useState([]);

    const [editableSubject, setEditableSubject] = useState({});

    const [groups, setGroups] = useState([]);
    const [newGroups, setNewGroups] = useState([]);
    const [newGroups2, setNewGroups2] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    const [placeHolder, setplaceHolder] = useState("Нет информации о зачетной книжке");

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
                userId: 0
            };
            const request2 = {
                semestrId: 0,
                year: 0
            };
            const request3 = {
                roleId: 4
            };
            const request4 = {
                roleId: 3
            };
            const request5 = {
                userId: 3
            };
            // const response = await apiRecordBook.get(request);
            // setUserRecord(response.data.message);
            // const response4 = await apiRecordBook.getInf(request2);
            // setYearGrades(response4.data.message);
            //   const response5 = await apiSubject.get(request);
            //   setSubject(response.data.message);
            const response = await apiSubject.get(request);
            setSubject(response.data.message);

            // const response2 = await apiSubject.getuser(request3);
            // setStudents(response2.data.message);

            const response3 = await apiSubject.getuser(request4);
            setTeachers(response3.data.message);

            const response4 = await apiSubject.exams(request4);
            setExams(response4.data.message);

            const response5 = await apiRecordBook.getSem(request4);
            setSemester(response5.data.message);

            // const response6 = await apiAccount.info();
            // setUserInfo(response6.data.message);

            // const response7 = await apiSchedule.groups();
            // setGroups(response7.data.message);

            // const response6 = await apiRecordBook.get(request5);
            // setUserRecord(response6.data.message);
            fetchGroups()

        } catch (error) {
            console.error(error);
            console.error('ERROR GET LESSONS');
            toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
        }

    }, []);


    console.log(userRecord)
    // console.log(subject)
    // console.log(teachers)
    // console.log(students)
    // console.log(semester)
    // console.log(exams)



    async function createRecordBook(mark, newdate, userselect, selectsubj, selectsem, newyear) {
        //а это типа создание папки в папке студента типо разные папки 
        const request = {
            endMark: mark,
            date: newdate,
            userId: userselect,
            subjectId: selectsubj,
            semestrId: selectsem,
            year: newdate.split('.')[2]
        };
        const request2 = { userId: userselect, };
        try {
            console.log(request)
            const response = await apiRecordBook.createRecord(request);
            toast.success("Data updated successfully");

            const response6 = await apiRecordBook.get(request2);
            setUserRecord(response6.data.message);
        } catch (error) {
            console.error(error);
            console.error('ERROR DOWNLOAD FILE');
            toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
        }
    }

    async function updateRecordBook(recId, mark, userselect) {
        const request = {
            recordId: recId,
            endMark: mark,
        };
        const request2 = {
            userId: userselect
        };
        try {
            console.log(request)
            console.log(request2)
            const response = await apiRecordBook.updateTeacherRecord(request);
            //   handleEditClickExit(subjId);

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

    async function deleteRecordBook(id) {
        const request = {
            recordId: id
        };
        const request2 = {};
        const confirmed = window.confirm('Вы точно хотите удалить выбранный файл ?');
        if (!confirmed) {
            return;
        }
        try {
            const response = await apiRecordBook.deleteRecord(request);
            const data = response.data;

            // const response6 = await apiRecordBook.get(request);
            // setUserRecord(response6.data.message);

            toast.success("Data updated successfully");
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
        setNewGroups(groupId);

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
                            setNewStudents(selectedOption.value);
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
                            <div>{placeHolder}</div>
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
    )
}

export default TeacherRecordBook;

{/* <div className="record_container">
    <div className="heading">
        <div className="rec">Дисциплина</div>
        <div className="rec">Количество часов</div>
        <div className="rec">Итоговая оценка</div>
        <div className="rec">Дата сдачи</div>
        <div className="rec">Преподаватель</div>
        <div className="">Действия</div>
    </div>
    {userRecord.map((records) => (
        <div key={records.id}>
            <div className="record_student_block">
                <div className="rec">{records.subjectName}</div>
                <div className="rec">{records.summaryHours}</div>
                <div className="rec">{records.endMark}</div>
                <div className="rec">{records.date}</div>
                <div className="rec">{records.teacher}</div>
                <div>
                    <button className="recordbook_buttons" onClick={() => handleEditClick(records.id)}>
                        Обновить
                    </button>
                </div>
            </div>
            {!editableSubject[records.id] ? (
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
                    <button className="select_block_button_record" onClick={() => updateRecordBook(records.id, newResultUpd, newStudents2)}>Сохранить</button>
                    <button className="select_block_button_record_delete" onClick={() => handleEditClickExit(records.id)}>Отмена</button>
                </div>
            )}
        </div>
    ))}
</div>  */}