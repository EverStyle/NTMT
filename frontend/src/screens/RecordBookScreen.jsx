import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import zach from "../json/zachetka";
import apiRecordBook from "../api/recordBook";
import './style/RecordBookScreen.css';

function RecordBookScreen() {
  const [records, setRecords] = useState([]);

  useEffect(async () => {
    try {
      const request = {

      };
      const response = await apiRecordBook.get(request);
    } catch (error) {
      console.error(error);
      console.error('ERROR GET RECORDS');
    }
  }, [records])
  return (
    <div>
      <div className="recort_header">
      <div className='title'>Зачетная книжка</div>
      <div> <Link to="/adminRecordBook"><button>Редактирование зачетной книжки </button></Link> </div>
      </div>
      <div className='details-record-book'>
        <div className='details-group'>Группа: Т-393901-НТ</div>
        <div className='details-year'>Год: 2021/2022</div>
        <div className='details-semestr'>Семестр: Осенний</div>
      </div>
      <div className='detail-record-book'>
        <div className='detail-napr'>
          <span>Направление обучения:</span> Компьютерные системы и комплексы
        </div>
        <div className='detail-form'>
          <span>Форма обучения:</span> Очная
        </div>
        <div className='detail-time'>
          <span>Срок обучения:</span> 3 года 10 месяцев
        </div>
      </div>
      <div className='details-table'>
        <table className='detail-table'>
          <thead className='detail-thead'>
            <tr>
              <td>Дисциплина</td>
              <td>Общее кол-во часов</td>
              <td>Итоговая оценка</td>
              <td>Дата сдачи</td>
              <td>Форма контроля</td>
              <td>Преподаватель</td>
            </tr>
          </thead>
          <tbody>
            {zach.map((zach, index) => (
              <tr key={index}>
                <td className="zach-detail">{zach.disciplina}</td>
                <td className="zach-detail">{zach.hours}</td>
                <td className="zach-detail">{zach.itog}</td>
                <td className="zach-detail">{zach.date}</td>
                <td className="zach-detail">{zach.control}</td>
                <td className="zach-detail">{zach.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default RecordBookScreen;
