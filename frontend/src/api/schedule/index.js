import {$api} from "../../boot/axios";

const apiSchedule = {
    get: request => $api.post('/schedule/get_schedule', request),
    groups: request => $api.get('/groups', request),
}

export default apiSchedule;