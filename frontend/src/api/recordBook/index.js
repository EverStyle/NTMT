import {$api} from "../../boot/axios";

const apiRecordBook = {
    get: request => $api.post('/recordbook/get_info', request),
}

export default apiRecordBook;