import React, { useEffect, useState, useMemo } from "react";
import Headers from "../components/Header/Header";
import zach from "../json/zachetka";
import { ToastContainer, toast } from "react-toastify";
import './style/AdminRecordBook.css';
import apiRecordBook from "../api/recordBook";
import apiSubject from "../api/subjects";
import apiAccount from "../api/account";
import apiSchedule from "../api/schedule";

function AdminRecordBook() {


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
            const request4 = {
                roleId: 3
            };

            const response = await apiSubject.get(request);
            setSubject(response.data.message);

            const response3 = await apiSubject.getuser(request4);
            setTeachers(response3.data.message);

            const response4 = await apiSubject.exams(request4);
            setExams(response4.data.message);

            const response5 = await apiRecordBook.getSem(request4);
            setSemester(response5.data.message);

            fetchGroups()

        } catch (error) {
            console.error(error);
            console.error('ERROR GET LESSONS');
            toast.error('Произошла ошибка при получении информации о зачетных книжек. Попробуйте позже или обратитесь в техподдержку');
        }

    }, []);


    // console.log(userInfo)
    // console.log(subject)
    // console.log(teachers)
    // console.log(students)
    // console.log(semester)
    // console.log(exams)



    async function createRecordBook(mark, newdate, userselect, selectsubj, selectsem, newyear) {
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
            toast.success("Данные успешно добавленны");

            const response6 = await apiRecordBook.get(request2);
            setUserRecord(response6.data.message);
        } catch (error) {
            console.error(error);
            console.error('ERROR DOWNLOAD FILE');
            toast.error('Произошла ошибка при создании зачетной книжки. Попробуйте позже или обратитесь в техподдержку');
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
            toast.success("Данные успешно обновлены");
        } catch (error) {

            console.error(error);
            console.error('ERROR DOWNLOAD FILE');
            toast.error('Произошла ошибка при обновлении. Попробуйте позже или обратитесь в техподдержку');
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
        const confirmed = window.confirm('Вы точно хотите удалить выбранную зачетную книжку ?');
        if (!confirmed) {
            return;
        }
        try {
            const response = await apiRecordBook.deleteRecord(request);
            const data = response.data;
            toast.success("Данные успешно удаленны");
        } catch (error) {
            console.error(error);
            console.error('ERROR DOWNLOAD FILE');
            toast.error('Произошла ошибка при удалении. Попробуйте позже или обратитесь в техподдержку');
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
        const groupId = e.target.value;
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
        const studentId = e.target.value;
        setNewStudents2(studentId);
    };

    console.log(newDateUpd)


    return (
        <div>
            <div>
                <div className="title">
                    Создание зачетной книжки
                </div>
                <div className="create_record_block">
                    <div className="record_subblock">
                        <div className="subblock_text">
                            Введите оценку студенту
                        </div>
                        <div className="lock_input">
                            <input className="select_block" type="text" placeholder='Введите оценку' onChange={(e) => setNewResult(e.target.value)} />
                        </div>
                    </div>
                    <div className="record_subblock">
                        <div className="subblock_text">
                            Введите дату сдачи предмета
                        </div>

                        <div className="lock_input">
                            <input className="select_block" type="date" onChange={(e) => {
                                const selectedDate = new Date(e.target.value);
                                const formattedDate = selectedDate.toLocaleDateString('ru-RU');
                                { console.log(formattedDate) }

                                setNewDate(formattedDate);
                            }} />
                        </div>
                    </div>
                    <div className="record_subblock">
                        <div className="subblock_text">
                            Выберите группу необходимого студента
                        </div>

                        <div className="lock_input">
                            <select className="select_block" value={newGroups} onChange={handleGroupChange}>
                                <option value="">Выберите группу</option>
                                {groups.map((grp) => (
                                    <option key={grp.id} value={grp.id}>
                                        {grp.code} {grp.groupName} {grp.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="record_subblock">
                        <div className="subblock_text">
                            Выберите студента, которому будет назначенна зачетная книжка
                        </div>

                        <div className="lock_input">
                            <select className="select_block" value={newStudents} onChange={(e) => setNewStudents(e.target.value)}>
                                <option value="Some">Выберите студента</option>
                                {students.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.fio}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="record_subblock">
                        <div className="subblock_text">
                            Выберите предмет по которому будет назначен результат
                        </div>

                        <div className="lock_input">
                            <select className="select_block" value={newSubjectId} onChange={(e) => setNewSubjectId(e.target.value)}>
                                <option value="Some">Выберите предмет</option>
                                {subject.map((subj) => (
                                    <option key={subj.id} value={subj.id}>
                                        {subj.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="record_subblock">
                        <div className="subblock_text">
                            Выберите семестр
                        </div>
                        <div className="lock_input">
                            <select className="select_block" value={newSemesterId} onChange={(e) => setNewSemesterId(e.target.value)}>
                                <option value="Some">Выберите семестр</option>
                                {semester.map((sem) => (
                                    <option key={sem.id} value={sem.id}>
                                        {sem.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* <div className="record_subblock">
                        <div className="subblock_text">
                            Выберите год
                        </div>

                        <div className="lock_input">
                            <input className="select_block" type="number" placeholder='Введите год' onChange={(e) => setNewYear(e.target.value)} />
                        </div>
                    </div> */}
                    <div className="select_block_button">
                        <button className="select_block" type='button' onClick={() => createRecordBook(newResult, newDate, newStudents, newSubjectId, newSemesterId, newYear)}>Создать</button>
                    </div>

                </div>


                <div>
                    <select className="select_block" value={newGroups} onChange={handleGroupChange}>
                        <option value="">Выберите группу</option>
                        {groups.map((grp) => (
                            <option key={grp.id} value={grp.id}>
                                {grp.code} {grp.groupName} {grp.type}
                            </option>
                        ))}
                    </select>

                    <select className="select_block" value={newStudents2} onChange={(e) => {
                        setNewStudents2(e.target.value);
                        uploadStudents(e.target.value);
                        handleStudentChange(e); // Call the function here
                    }}>
                        <option value={0}>Выберите студента</option>
                        {students.map((std) => (
                            <option key={std.id} value={std.id}>
                                {std.fio}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="record_container">
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
                                {/* Тут скажи тохе шоб добавил тип экзамена  */}
                                <div>
                                    <button className="recordbook_buttons" onClick={() => deleteRecordBook(records.id)}>
                                        Удалить
                                    </button>
                                    <button className="recordbook_buttons" onClick={() => handleEditClick(records.id)}>
                                        Обновить
                                    </button>
                                </div>
                            </div>
                            {/* <button className="button_delete" onClick={() => deleteRecordBook(records.id)}>
                                Delete
                            </button>
                            <button className="button_delete" onClick={() => handleEditClick(records.id)}>
                                Update
                            </button> */}
                            {!editableSubject[records.id] ? (
                                <div className="record_buttons">

                                </div>
                            ) : (
                                <div>
                                    <select className="select_block" value={newSubjectIdUpd} onChange={(e) => setNewSubjectIdUpd(e.target.value)}>
                                        <option value="Some">Выберите предмет</option>
                                        {subject.map((subj) => (
                                            <option key={subj.id} value={subj.id}>
                                                {subj.name}
                                            </option>
                                        ))}
                                    </select>
                                    <select className="select_block" value={newStudentsUpd} onChange={(e) => setNewStudentsUpd(e.target.value)}>
                                        <option value="Some">Выберите студента</option>
                                        {students.map((student) => (
                                            <option key={student.id} value={student.id}>
                                                {student.fio}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Вопрос, тут не обязательно добавлять студентов на редактировании, вполне может вызвать баг или ошибки ЖЕЛАТЕЛЬНО УБРАТЬ */}

                                    <select className="select_block" value={newSemesterIdUpd} onChange={(e) => setNewSemesterIdUpd(e.target.value)}>
                                        <option value="Some">Выберите семестр</option>
                                        {semester.map((sem) => (
                                            <option key={sem.id} value={sem.id}>
                                                {sem.value}
                                            </option>
                                        ))}
                                    </select>
                                    <input className="select_block"
                                        type="text"
                                        placeholder='Введите результат'
                                        value={newResultUpd}
                                        onChange={(e) => setNewResultUpd(e.target.value)}
                                    />
                                    <input className="select_block" type="date" onChange={(e) => {
                                        const selectedDate = new Date(e.target.value);
                                        const formattedDate = selectedDate.toLocaleDateString('ru-RU');
                                        setNewDateUpd(formattedDate);
                                    }} />

                                    <input className="select_block" type="number" placeholder='Введите год' onChange={(e) => setNewYearUpd(e.target.value)} />

                                    <button className="select_block" onClick={() => updateRecordBook(records.id, newResultUpd, newDateUpd, newStudentsUpd, newSubjectIdUpd, newSemesterIdUpd, newYearUpd)}>Сохранить</button>
                                    <button className="select_block" onClick={() => handleEditClickExit(records.id)}>Отмена</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
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

            <div>


                {/* const [newYearUpd, setNewYearUpd] = useState([]);
    const [newDateUpd, setNewDateUpd] = useState([]);
    const [newSubjectIdUpd, setNewSubjectIdUpd] = useState([]);
    const [newSemesterIdUpd, setNewSemesterIdUpd] = useState([]);
    const [newResultUpd, setNewResultUpd] = useState([]); */}
                {/* const [newStudentsUpd, setNewStudentsUpd] = useState(0); */}

                {/* {userRecord.map((records) => (
                    <div key={records.id}>{records.groupName}{records.endMark}{records.secondName}
                        {!editableSubject[records.id] ? (
                            <div>
                                <button className="button_delete" onClick={() => deleteSubject(records.id)}>
                                    Delete
                                </button>
                                <button className="button_delete" onClick={() => handleEditClick(records.id)}>
                                    Update
                                </button>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="text"
                                    placeholder='Введите результат'
                                    value={newResultUpd}
                                    onChange={(e) => setNewResultUpd(e.target.value)}
                                />
                                <input type="date" onChange={(e) => {
                                    const selectedDate = new Date(e.target.value);
                                    const formattedDate = selectedDate.toLocaleDateString('ru-RU');
                                    setNewDateUpd(formattedDate);
                                }} />
                                <select value={newStudentsUpd} onChange={(e) => setNewStudentsUpd(e.target.value)}>
                                    <option value="Some">Выберите студента</option>
                                    {students.map((student) => (
                                        <option key={student.id} value={student.id}>
                                            {student.fio}
                                        </option>
                                    ))}
                                </select>
                                <select value={newSubjectIdUpd} onChange={(e) => setNewSubjectIdUpd(e.target.value)}>
                                    <option value="Some">Выберите предмет</option>
                                    {subject.map((subj) => (
                                        <option key={subj.id} value={subj.id}>
                                            {subj.name}
                                        </option>
                                    ))}
                                </select>
                                <select value={newSemesterIdUpd} onChange={(e) => setNewSemesterIdUpd(e.target.value)}>
                                    <option value="Some">Выберите семестр</option>
                                    {semester.map((sem) => (
                                        <option key={sem.id} value={sem.id}>
                                            {sem.value}
                                        </option>
                                    ))}
                                </select>
                                <input type="number" placeholder='Введите год' onChange={(e) => setNewYearUpd(e.target.value)} />

                                <button onClick={() => updateRecordBook(records.id,newResultUpd,newDateUpd,newStudentsUpd,newSubjectIdUpd,newSemesterIdUpd,newYearUpd)}>Save</button>
                                <button onClick={() => handleEditClickExit(records.id)}>Exit</button>
                            </div>
                        )}
                    </div>
                ))} */}


                {/* {subject?.map(subj => (
                    <div key={subj.id}>
                        {!editableSubject[subj.id] ? (
                            <div>
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
                ))} */}


            </div>



            {/* {grades.length > 0 ? <div>
                <div>
                    <tbody>
                        {grades.map((data, index) => (
                            <tr key={index}>
                                <td className="zach-detail2">
                                    <div className="edit_label">
                                        {data.disciplina}
                                    </div>
                                </td>
                                <td className="zach-detail2">{data.hours}</td>
                                <td className="zach-detail2">{data.itog}</td>
                                <td className="zach-detail2">{data.date}</td>
                                <td className="zach-detail2">{data.control}</td>
                                <td className="zach-detail2">{data.teacher}</td>
                            </tr>
                        ))}
                    </tbody>
                </div>
                <GradeTest></GradeTest>
                <GradeUpdate></GradeUpdate>
                <h1>Редактирование зачетной книжки</h1>

                <GradeBook></GradeBook>

            </div> : <div>Зачетная книжка отсутствует</div>}
 */}

        </div>
    )
}

export default AdminRecordBook;