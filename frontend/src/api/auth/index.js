import {$api} from "../../boot/axios";

const apiAuth = {
    login: request => $api.post('/auth/login', request),
}

export default apiAuth;