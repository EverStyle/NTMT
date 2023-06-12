import React, { useEffect, useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import './style/AdminRecordBook.css';
import apiRecordBook from "../api/recordBook";
import apiSubject from "../api/subjects";
import apiSchedule from "../api/schedule";
import Select from 'react-select';
import { CSSTransition} from 'react-transition-group';

function AdminRecordBook() {
    const [userRecord, setUserRecord] = useState([]);
    const [subject, setSubject] = useState([]);
    const [students, setStudents] = useState([]);
    const [semester, setSemester] = useState([]);
    const [newStudents, setNewStudents] = useState(0);
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

    // useEffect(async () => {
    //     try {
    //         const request = {
    //             userId: 0
    //         };
    //         const request4 = {
    //             roleId: 3
    //         };
    //         setTimeout(() => {
    //             showSubblockMount(true);
    //         }, 100);
    //         const response = await apiSubject.get(request);
    //         setSubject(response.data.message);
    //         const response5 = await apiRecordBook.getSem(request4);
    //         setSemester(response5.data.message);
    //         fetchGroups()
    //     } catch (error) {
    //         console.error(error);
    //         console.error('ERROR GET LESSONS');
    //         toast.error('Произошла ошибка при получении информации о зачетных книжек. Попробуйте позже или обратитесь в техподдержку');
    //     }
    // }, []);
    useEffect(() => {
        async function fetchData() {
          try {
            const request = {
              userId: 0
            };
            const request4 = {
              roleId: 3
            };
            const response = await apiSubject.get(request);
            setSubject(response.data.message);
            const response5 = await apiRecordBook.getSem(request4);
            setSemester(response5.data.message);
            fetchGroups();
          } catch (error) {
            console.error(error);
            console.error('ERROR GET LESSONS');
            toast.error('Произошла ошибка при получении информации о зачетных книжек. Попробуйте позже или обратитесь в техподдержку');
          }
        }
        setTimeout(() => {
          showSubblockMount(true);
        }, 100);
        fetchData();
      }, []);

    //   useEffect(() => {
    //     async function fetchData() {
          
    //     }
    //     setTimeout(() => {
    //       showSubblockMount(true);
    //     }, 100);
    //     fetchData();
    //   }, []);

    async function createRecordBook(mark, newdate, userselect, selectsubj, selectsem) {
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

    async function updateRecordBook(recId, mark, newdate, userselect, selectsubj, selectsem) {
        const request = {
            recordId: recId,
            endMark: mark,
            date: newdate,
            userId: userselect,
            subjectId: selectsubj,
            semestrId: selectsem,
            year: newdate.split('.')[2]
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
        console.log(groupId);
        if (groupId === "") {
            console.log("Stud CLEAR")
            setUserRecord([]);
            setStudents([]); // Clear the students array when the default value is selected
            setNewStudents([]); // Clear the students array when the default value 

        } else {
            fetchStudents(groupId);
            setUserRecord([]); // Send an empty array when the group changes

        }
        setNewStudents("Some"); // Reset the selected student to the default value
    };

    // const handleStudentChange = (e) => {
    //     const studentId = e.value;
    //     // setNewStudents2(studentId);
    // };


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
                    <div className="title">
                        Создание зачетной книжки
                    </div>
                    <div className="create_record_block">
                        <div className="record_subblock">
                            <div className="subblock_text">
                                Введите оценку студенту
                            </div>
                            <div className="lock_input">
                                <input className="select_block_record" type="text" placeholder='Введите оценку' onChange={(e) => setNewResult(e.target.value)} />
                            </div>
                        </div>
                        <div className="record_subblock">
                            <div className="subblock_text">
                                Введите дату сдачи предмета
                            </div>
                            <div className="lock_input">
                                <input className="select_block_record" type="date" onChange={(e) => {
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
                        </div>
                        <div className="record_subblock">
                            <div className="subblock_text">
                                Выберите студента, которому будет назначенна зачетная книжка
                            </div>
                            <div className="lock_input">
                                <Select
                                    className="new_select_subblock"
                                    onChange={(selectedOption) => setNewStudents(selectedOption.value)}
                                    options={[
                                        { value: "Some", label: "Выберите студента" },
                                        ...students.map((student) => ({
                                            value: student.id,
                                            label: student.fio,
                                        })),
                                    ]}
                                    placeholder="Выберите студента"
                                />
                            </div>
                        </div>
                        <div className="record_subblock">
                            <div className="subblock_text">
                                Выберите предмет по которому будет назначен результат
                            </div>
                            <div className="lock_input">
                                <Select
                                    className="new_select_subblock"
                                    onChange={(selectedOption) => setNewSubjectId(selectedOption.value)}
                                    options={[

                                        ...subject.map((subj) => ({
                                            value: subj.id,
                                            label: subj.name,
                                        })),
                                    ]}
                                    placeholder="Выберите предмет"
                                />
                            </div>
                        </div>
                        <div className="record_subblock">
                            <div className="subblock_text">
                                Выберите семестр
                            </div>
                            <div className="lock_input">
                                <select className="select_block_record" value={newSemesterId} onChange={(e) => setNewSemesterId(e.target.value)}>
                                    <option value="Some">Выберите семестр</option>
                                    {semester.map((sem) => (
                                        <option key={sem.id} value={sem.id}>
                                            {sem.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="select_block_button">
                            <button className="select_block_button_record" type='button' onClick={() => createRecordBook(newResult, newDate, newStudents, newSubjectId, newSemesterId, newYear)}>Создать</button>
                        </div>

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
                                // handleStudentChange(selectedOption);
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
                                    <div className="rec">
                                        <button className="recordbook_buttons_delete" onClick={() => deleteRecordBook(records.id)}>
                                            Удалить
                                        </button>
                                        <button className="recordbook_buttons_create" onClick={() => handleEditClick(records.id)}>
                                            Обновить
                                        </button>
                                    </div>
                                </div>
                                {!editableSubject[records.id] ? (
                                    <div className="record_buttons">

                                    </div>
                                ) : (
                                    <div className="update_record_block">
                                        <Select
                                            className="new_select_subblock"
                                            onChange={(selectedOption) => setNewSubjectIdUpd(selectedOption.value)}
                                            placeholder="Выберите предмет"
                                            options={[
                                                { value: "Some", label: "Выберите предмет" },
                                                ...subject.map((subj) => ({
                                                    value: subj.id,
                                                    label: subj.name,
                                                })),
                                            ]}
                                        />
                                        <Select
                                            className="new_select_subblock"
                                            placeholder="Выберите студента"
                                            onChange={(selectedOption) => setNewStudentsUpd(selectedOption.value)}
                                            options={[
                                                { value: "Some", label: "Выберите студента" },
                                                ...students.map((student) => ({
                                                    value: student.id,
                                                    label: student.fio,
                                                })),
                                            ]}
                                        />
                                        {/* Вопрос, тут не обязательно добавлять студентов на редактировании, вполне может вызвать баг или ошибки ЖЕЛАТЕЛЬНО УБРАТЬ */}

                                        <select className="select_block_record" value={newSemesterIdUpd} onChange={(e) => setNewSemesterIdUpd(e.target.value)}>
                                            <option value="Some">Выберите семестр</option>
                                            {semester.map((sem) => (
                                                <option key={sem.id} value={sem.id}>
                                                    {sem.value}
                                                </option>
                                            ))}
                                        </select>
                                        <input className="select_block_record"
                                            type="text"
                                            placeholder='Введите результат'
                                            value={newResultUpd}
                                            onChange={(e) => setNewResultUpd(e.target.value)}
                                        />
                                        <input className="select_block_record" type="date" onChange={(e) => {
                                            const selectedDate = new Date(e.target.value);
                                            const formattedDate = selectedDate.toLocaleDateString('ru-RU');
                                            setNewDateUpd(formattedDate);
                                        }} />

                                        <button className="select_block_button_record" onClick={() => updateRecordBook(records.id, newResultUpd, newDateUpd, newStudentsUpd, newSubjectIdUpd, newSemesterIdUpd, newYearUpd)}>Сохранить</button>
                                        <button className="select_block_button_record_delete" onClick={() => handleEditClickExit(records.id)}>Отмена</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
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

            <div>
            </div>
        </div>
    )
}

export default AdminRecordBook;