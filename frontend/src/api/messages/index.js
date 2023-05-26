import {$api} from "../../boot/axios";
const apiMessages = {
    get: page => $api.post(`/messages/get_all_messages/${page}`, {}),
    newNotf: request => $api.post(`/messages/create_message`, request),
    newUserInfo: request => $api.get(`/users`, request),
    deleteMess: request => $api.post(`/messages/disable_views`, request),
}
export default apiMessages;