import {$api} from "../../boot/axios";

const apiAccount = {
    info: () => $api.post('/account/user/info', {}),
}

export default apiAccount;