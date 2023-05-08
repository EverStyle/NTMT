import React from "react";
import { plan, practise } from "../json/plan";

function PlanScreen() {
  const { subjects } = plan[0];
  const { subjects_pr } = practise[0];
  return (
    <div>
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
    </div>
  );
}

export default PlanScreen;
