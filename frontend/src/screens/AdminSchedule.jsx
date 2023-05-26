import React from "react";
import Headers from "../components/Header/Header";
import SheduleTable from "../components/SheduleTable/SheduleTable";
function AdminSchedule() {

    return (
        <div>
            <div className='shedule__table-wrapper'>
                <SheduleTable />
            </div>
        </div>
    )
}

export default AdminSchedule;