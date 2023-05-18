import { $api } from "../../boot/axios";
const apiFiles = {
    getList: request => $api.post(`/files/get_struct`, request),
    getUserList: request => $api.post(`/files/get_struct`, request),
    upload:  request => $api.post('/files/upload', request ),
    delete: request => $api.post('/files/delete', request),
    download: request => $api.post('/files/download', request, {
        responseType: 'arraybuffer',
    }),
    newFolderLesson: request => $api.post(`/files/create_folder`, request),
    deleteFolderLessonApi: request => $api.post(`/files/delete_folder`, request),
    getAllList: request => $api.post(`/files/get_student_folders`, request),
    getMyFolder: request => $api.get(`/files/get_my_folder`, request),
}

export default apiFiles;