import React, { useEffect, useState, useMemo } from "react";
import Headers from "../components/Header/Header";
import GradeBook from "../components/GradeForm/GradeBook";
import GradeTest from "../components/GradeForm/GradeTest";
import zach from "../json/zachetka";
import './style/AdminRecordBook.css';

function AdminRecordBook() {

    const [grades, setGrades] = useState(zach);

    console.log(grades)


    return (
        <div>
            {grades.length > 0 ? <div>
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
                {/* <GradeUpdate></GradeUpdate> */}
                <h1>Редактирование зачетной книжки</h1>

                {/* <GradeBook></GradeBook> */}

            </div> : <div>Зачетная книжка отсутствует</div>}



        </div>
    )
}

export default AdminRecordBook;