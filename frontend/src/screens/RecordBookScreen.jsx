
import React, { useEffect, useState, useMemo } from "react";
import Headers from "../components/Header/Header";
import zach from "../json/zachetka";
import { ToastContainer, toast } from "react-toastify";
import './style/AdminRecordBook.css';
import apiRecordBook from "../api/recordBook";
import apiSchedule from "../api/schedule";
import apiSubject from "../api/subjects";

function RecordBookScreen() {

    const [yearGrades, setYearGrades] = useState(zach);
    const [userRecord, setUserRecord] = useState([]);

    const [subject, setSubject] = useState([]);

    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [semester, setSemester] = useState([]);
    const [exams, setExams] = useState([]);

    // const [newTitle, setNewTitle] = useState('');
    // const [newHoursSubj, setNewHoursSubj] = useState('');
    // const [newExamType, setNewExamType] = useState('');
    // const [newTeacherId, setNewTeacherId] = useState('');

    const [newStudents, setNewStudents] = useState(0);
    const [newStudents2, setNewStudents2] = useState(0);

    const [newYear, setNewYear] = useState(0);
    const [newDate, setNewDate] = useState([]);
    const [newSubjectId, setNewSubjectId] = useState([]);
    const [newSemesterId, setNewSemesterId] = useState(0);
    const [newResult, setNewResult] = useState([]);

    const [newStudentsUpd, setNewStudentsUpd] = useState(0);
    const [newYearUpd, setNewYearUpd] = useState([]);
    const [newDateUpd, setNewDateUpd] = useState([]);
    const [newSubjectIdUpd, setNewSubjectIdUpd] = useState([]);
    const [newSemesterIdUpd, setNewSemesterIdUpd] = useState([]);
    const [newResultUpd, setNewResultUpd] = useState([]);

    const [editableSubject, setEditableSubject] = useState({});


    const [placeHolder, setplaceHolder] = useState("");

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
                semestrId: newSemesterId,
                year: newYear
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

            // const response3 = await apiSubject.getuser(request4);
            // setTeachers(response3.data.message);

            const response4 = await apiSubject.exams(request4);
            setExams(response4.data.message);

            const response5 = await apiRecordBook.getSem(request4);
            setSemester(response5.data.message);
            // ТОХА РАЗЛОЧИТ


            const response6 = await apiRecordBook.getInf(request5);
            console.log(response6);


            if (response6.data.message.length === 0) {
                setUserRecord([]);
            } else {
                setUserRecord(response6.data.message);
            }

            // const response6 = await apiRecordBook.get(request5);
            // setUserRecord(response6.data.message);

        } catch (error) {
            console.log(error);
            if (error) {
                setUserRecord([]);
                setplaceHolder("Нет информации о зачетной книжке")
            }
            console.error(error);
            console.error('ERROR GET LESSONS');
            // toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
        }

    }, [newSemesterId, newYear]);


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
            year: newyear
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

    async function updateRecordBook(recId, mark, newdate, userselect, selectsubj, selectsem, newyear) {
        const request = {
            recordId: recId,
            endMark: mark,
            date: newdate,
            userId: userselect,
            subjectId: selectsubj,
            semestrId: selectsem,
            year: newyear
        };
        const request2 = {
            userId: userselect
        };
        try {
            console.log(request)
            const response = await apiRecordBook.updateRecord(request);
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

    async function uploadStudents(semId, yearId) {
        const request = {
            semestrId: semId,
            year: yearId
        };
        try {
            console.log(request)
            const response6 = await apiRecordBook.getInf(request);
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

    console.log(userRecord)

    function getCurrentYear() {
        return new Date().getFullYear();
    }

    function getPreviousYear() {
        return new Date().getFullYear() - 1;
    }

    function getNextYear() {
        return new Date().getFullYear() + 1;
    }

    console.log(userRecord.date)


    const dateStr = '2023-03-05T05:00:00.000Z';
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    console.log(formattedDate); // Output: 03.05.2023
    return (
        <div>


            <div>


                <div>
                    <div>

                        <select value={newSemesterId} onChange={(e) => setNewSemesterId(e.target.value)}>
                            <option value="Some">Выберите семестр</option>
                            {semester.map((sem) => (
                                <option key={sem.id} value={sem.id}>
                                    {sem.value}
                                </option>
                            ))}
                        </select>
                        <select value={newYear} onChange={(e) => setNewYear(e.target.value)}>
                            <option value="Some">Выберите год</option>
                            <option value={getCurrentYear()}>{getCurrentYear()}</option>
                            <option value={getPreviousYear()}>{getPreviousYear()}</option>
                            <option value={getNextYear()}>{getNextYear()}</option>
                        </select>
                    </div>


                </div>

                <div className="record_container">

                    <div className="heading">
                        <div className="rec">Дисциплина</div>
                        <div className="rec">Количество часов</div>
                        <div className="rec">Итоговая оценка</div>
                        <div className="rec">Дата сдачи</div>
                        <div className="rec">Преподаватель</div>
                        {/* <div className="">Действия</div> */}

                    </div>
                    {userRecord.map((record) => (
                        <div key={record.id}>
                            <div className="record_student_block">
                                <div className="rec">{record.groupName}</div>
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
                        </div>
                    ))}
                </div>

            </div>



            {/* <div className="">
                <input type="text" placeholder='Введите оценку' onChange={(e) => setNewResult(e.target.value)} />
                <input type="date" onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const formattedDate = selectedDate.toLocaleDateString('ru-RU');
                    { console.log(formattedDate) }

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
    )
}

export default RecordBookScreen;





