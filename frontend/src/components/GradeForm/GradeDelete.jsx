import React from 'react';

function DeleteZachForm({ zach, deleteZach }) {
  const handleDelete = () => {
    deleteZach(zach.id);
  };

  return (
    <div>
      <p>ID: {zach.id}</p>
      <p>Disciplina: {zach.disciplina}</p>
      <p>Hours: {zach.hours}</p>
      <p>Itog: {zach.itog}</p>
      <p>Date: {zach.date}</p>
      <p>Control: {zach.control}</p>
      <p>Teacher: {zach.teacher}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteZachForm;