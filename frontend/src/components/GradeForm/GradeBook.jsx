import React, { useState } from 'react';
import GradeAdd from './GradeAdd';
import GradeDelete from './GradeDelete';


function GradeBook() {
  const [gradeBooks, setGradeBooks] = useState([
    { title: 'Math', grades: [90, 85, 95] },
    { title: 'Science', grades: [80, 75, 85] },
    { title: 'History', grades: [95, 90, 85] },
  ]);

  const addGradeBook = (newGradeBookTitle) => {
    setGradeBooks([...gradeBooks, { title: newGradeBookTitle, grades: [] }]);
  };

  const deleteGradeBook = (selectedGradeBookIndex) => {
    setGradeBooks(
      gradeBooks.filter((_, index) => index !== selectedGradeBookIndex)
    );
  };

  const changeGradeBook = (selectedGradeBookIndex, newGradeBookTitle) => {
    setGradeBooks(
      gradeBooks.map((gradeBook, index) =>
        index === selectedGradeBookIndex
          ? { ...gradeBook, title: newGradeBookTitle }
          : gradeBook
      )
    );
  };

  return (
    <div>
      <GradeAdd addGradeBook={addGradeBook} />
      <GradeDelete
        gradeBooks={gradeBooks}
        deleteGradeBook={deleteGradeBook}
      />
      
    </div>
  );
}

export default GradeBook;