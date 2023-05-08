import {$api} from "../../boot/axios";

const apiSchedule = {
    get: request => $api.post('/schedule/get_schedule', request),
}

export default apiSchedule;