
import StudentSchedule from "../components/SheduleTable/StudentSchedule";
import { CSSTransition} from 'react-transition-group';
import React, { useEffect, useState } from "react";
function ScheduleScreen() {
  const [subblockMount, showSubblockMount] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await new Promise((resolve) => setTimeout(resolve, 50));
      showSubblockMount(true);
    }
    fetchData();
  }, []);

  return (
    <div>
      <CSSTransition
        in={subblockMount}
        timeout={300}
        classNames="subblock_mount"
        mountOnEnter
        unmountOnExit
      ><div>
          <div className='title'>Расписание занятий</div>
          <div className='shedule__table-wrapper'>
            <StudentSchedule />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default ScheduleScreen;
