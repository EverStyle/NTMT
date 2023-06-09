import React, { useState } from 'react';


function GradeTest({ addGradeBook }) {
  const [newGradeBookTitle, setNewGradeBookTitle] = useState('');
  const [formData, setFormData] = useState({
    disciplina: '',
    hours: 0,
    itog: '',
    date: '',
    control: '',
    teacher: '',
  });
 
  const handleSubmit = (e) => {
    e.preventDefault();
    addGradeBook(newGradeBookTitle);
    setNewGradeBookTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input placeholder='Введите назавание предмета' type="text" onChange={(e)=>setFormData({disciplina:e.target.value})}/>
        <input placeholder='Введите количесво часов' type="number"onChange={(e)=>setFormData({hours:e.target.value})}/>
        <input placeholder='Введите итоговую оценку'onChange={(e)=>setFormData({itog:e.target.value})}/>
        <input placeholder='Введите дату сдачи'type="date"onChange={(e)=>setFormData({date:e.target.value})}/>
        <input placeholder='Введите тип сдачи'type="text"onChange={(e)=>setFormData({control:e.target.value})}/>
        <input placeholder='Введите Преподавателя' type="text"onChange={(e)=>setFormData({teacher:e.target.value})}/>
        <button type="button">Добавить</button>

{/* 
        onClick={()=> setFormData({
           disciplina: '',
           hours: 0,
           itog: '',
           date: '',
           control: '',
           teacher: '',  
        })} */}



        {/* крч введенные данные отсюда надо пробросить в Json ну или на сервак если тоха очнется, между ними поставить useState чтоб после введения ререндерилась страница и 
        выводила введенные данные на локалке ничего держать не надо надо сразу все обновлять   */}
      </label> 
      {/* <button type="submit">Add Grade Book</button> */}
    </form>
  );
}

export default GradeTest;