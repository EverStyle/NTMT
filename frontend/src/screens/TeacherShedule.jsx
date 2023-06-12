import TeacherScheduleTable from "../components/SheduleTable/TeacherScheduleTable";
import { CSSTransition} from 'react-transition-group';
import React, { useEffect, useState} from "react";
function TeacherSchedule() {
    const [subblockMount, showSubblockMount] = useState(false);
    useEffect(() => {
        async function fetchData() {
          await new Promise((resolve) => setTimeout(resolve, 50));
          showSubblockMount(true);
        }
        fetchData();
      }, []);
    // useEffect(async () => {
    //     setTimeout(() => {
    //         showSubblockMount(true);
    //     }, 50)
    // }, []);
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
                        <TeacherScheduleTable />
                    </div>
                </div>
            </CSSTransition>
        </div>

    )
}

export default TeacherSchedule;

