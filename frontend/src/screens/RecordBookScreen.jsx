
import React, { useEffect, useState, useMemo } from "react";
import Headers from "../components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import './style/AdminRecordBook.css';
import apiRecordBook from "../api/recordBook";
import apiSchedule from "../api/schedule";
import apiSubject from "../api/subjects";
import apiAccount from "../api/account";

function RecordBookScreen() {
    const [userRecord, setUserRecord] = useState([]);
    const [subject, setSubject] = useState([]);
    const [semester, setSemester] = useState([]);
    const [exams, setExams] = useState([]);
    const [newYear, setNewYear] = useState(0);
    const [newSemesterId, setNewSemesterId] = useState(0);
    const [placeHolder, setplaceHolder] = useState("Нет информации о зачетной книжке");
    const [userGroupInfo, setUserGroupInfo] = useState([]);

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

            const response = await apiSubject.get(request);
            setSubject(response.data.message);

            const response2 = await apiAccount.info();

            setUserGroupInfo(response2.data.message)

            const response4 = await apiSubject.exams(request4);
            setExams(response4.data.message);

            const response5 = await apiRecordBook.getSem(request4);
            setSemester(response5.data.message);

            const response6 = await apiRecordBook.getInf(request5);


            if (response6.data.message.length === 0) {
                setUserRecord([]);
            } else {
                setUserRecord(response6.data.message);
            }

        } catch (error) {
            console.log(error);
            if (error) {
                setUserRecord([]);
                setplaceHolder("Нет информации о зачетной книжке")
            }
            console.error(error);
            console.error('ERROR GET LESSONS');
            // toast.error('Произошла ошибка при получении информации о зачетной книжке студента. Попробуйте позже или обратитесь в техподдержку');
        }

    }, [newSemesterId, newYear]);



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

    console.log(userGroupInfo)


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
                    <div className="title">
                        Зачетная книжка
                    </div>

                    <div className="short_user_info">
                        <div className="short_user_info_subblock">
                            <strong> Номер группы : </strong> {userGroupInfo.code}
                        </div>
                        <select className="select_block_record" value={newSemesterId} onChange={(e) => setNewSemesterId(e.target.value)}>
                            <option value="Some">Выберите семестр</option>
                            {semester.map((sem) => (
                                <option key={sem.id} value={sem.id}>
                                    {sem.value}
                                </option>
                            ))}
                        </select>
                        <select className="select_block_record" value={newYear} onChange={(e) => setNewYear(e.target.value)}>
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





