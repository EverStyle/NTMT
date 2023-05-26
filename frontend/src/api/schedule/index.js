import {$api} from "../../boot/axios";
const apiSchedule = {
    get: request => $api.post('/schedule/get_schedule', request),
    sendSched: request => $api.post('/schedule/send_schedule', request),
    groups: request => $api.get('/groups', request),
    certainGroups: groupId => $api.get(`/groups/${groupId}`, {}),
}
export default apiSchedule;