import { $api } from "../../boot/axios";

const apiSubject = {
    subjCreate: request => $api.post('/subject/create', request),
    get: request => $api.get('/subject', request),
    exams: request => $api.get('/examtypes', request),
    getuser: request => $api.post('/users/get_by_role', request),
    deleteSubj: request => $api.post('/subject/delete', request),
    updateSubj: request => $api.post('/subject/update', request),
}

export default apiSubject;