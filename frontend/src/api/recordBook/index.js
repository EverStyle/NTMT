import {$api} from "../../boot/axios";

const apiRecordBook = {
    get: request => $api.post('/recordbook/get', request),
    getInf: request => $api.post('/recordbook/get_info', request),
    createRecord: request => $api.post('/recordbook/create', request),
    updateRecord: request => $api.post('/recordbook/update', request),
    deleteRecord: request => $api.post('/recordbook/delete', request),
    getSem: request => $api.get('/semesters', request),
    getStudents: request => $api.get('/semesters', request),
}

export default apiRecordBook;