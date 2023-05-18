import React from "react";
import SheduleTable from "../components/SheduleTable/SheduleTable";
import StudentSchedule from "../components/SheduleTable/StudentSchedule";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function ScheduleScreen() {
  return (
    <div>
      <div className='title'>Расписание занятий</div>
      <div className='shedule__table-wrapper'>
        <StudentSchedule />
      </div>
    </div>
  );
}

export default ScheduleScreen;
