import React, { useState } from 'react';

function AddZachForm({ addZach }) {
  const [formData, setFormData] = useState({
    id: '',
    disciplina: '',
    hours: '',
    itog: '',
    date: '',
    control: '',
    teacher: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addZach(formData);
    setFormData({
      id: '',
      disciplina: '',
      hours: '',
      itog: '',
      date: '',
      control: '',
      teacher: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID:
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Disciplina:
        <input
          type="text"
          name="disciplina"
          value={formData.disciplina}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Hours:
        <input
          type="text"
          name="hours"
          value={formData.hours}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Itog:
        <input
          type="text"
          name="itog"
          value={formData.itog}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Date:
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Control:
        <input
          type="text"
          name="control"
          value={formData.control}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Teacher:
        <input
          type="text"
          name="teacher"
          value={formData.teacher}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddZachForm;