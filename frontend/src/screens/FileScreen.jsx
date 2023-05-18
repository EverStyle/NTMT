import React, { useState } from "react";
import File from "../components/FolderFile/File";
import file_downloader from "../scripts/file_downloader";
import { useEffect } from "react";
import apiFiles from "../api/files";
import { ToastContainer, toast } from "react-toastify";
import UploadIcon from '@mui/icons-material/Upload';
import LessonBlock from "../components/GradeForm/LessonBlock";
import './style/FileScreen.css';
import MyFileBlock from "../components/GradeForm/MyFileBlock";
import StudentsFilesLessons from "../components/GradeForm/StudentsFilesLessons";


function FileScreen() {
    // const [file, setFile] = useState('');
    // const [files, setFiles] = useState([]);

    // async function uploadFiles(file) {
    //     const fileTypes = {
    //         'txt' : 1,
    //         'xlsx': 2,
    //         'docx': 3,
    //     };
    //     const request = new FormData();
    //     request.append('files', file[0])
    //     request.append('fileType', fileTypes[file[0].name.split('.').pop()]);
    //     // request.append('folderId', folder[???????].id)

    //     try {
    //         const response = await apiFiles.upload(request);
    //         const data = response.data.message[0];
    //         setFiles([...files, {
    //             ...data,
    //             fileName: data.fileMeta.fileName,
    //         }]);
    //         setFile('');
    //     } catch (error) {
    //         console.error(error);
    //         console.error('ERROR UPLOAD FILES');
    //         toast.error('Произошла ошибка при загрузке файла. Попробуйте позже или обратитесь в техподдержку');
    //     }
    // }

    // async function downloadFile(index) {
    //     const request = {
    //         fileId: files[index].id,
    //     };
    //     console.log(files[index])
    //     try {
    //         const response = await apiFiles.download(request);
    //         const data = response.data;
    //         const mime = response.headers['content-type'];
    //         const filename = files[index].fileName;
    //         const type = files[index].filePath.split('.').pop();
    //         file_downloader.downloadFiles(data, `${filename}.${type}`.trim(), mime);
    //     } catch(error) {
    //         console.error(error);
    //         console.error('ERROR DOWNLOAD FILE');
    //         toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    //     }
    // }

    // useEffect(async () => {
    //     try {
    //         const response = await apiFiles.getList();
    //         setFiles(response.data.message);
    //     } catch(error) {
    //         console.error(error);
    //         console.error('ERROR GET FILES');
    //         toast.error('Произошла ошибка при получении файлов. Попробуйте позже или обратитесь в техподдержку');
    //     }
    // }, []);

    return (
        <div>

            {/* <div className='fail-folder'>
          <div className='folder'>
              <div
                  style={{fontSize: '13px', textAlign: 'center', position: 'relative'}}
                  className="file-link"
              >
                  <label htmlFor="file" style={{position: 'absolute', opacity: '0', width: '100%', height: '100%', cursor: 'pointer'}}></label>
                  <input
                      value={file}
                      type="file"
                      id="file"
                      style={{position: 'absolute', display: 'none', width: '100%', height: '100%'}}
                    //   onChange={(e) => uploadFiles(e.target.files)}
                  />
                  <UploadIcon sx={{fontSize: '80px'}} color="primary"/>
                  <p style={{textAlign: 'center'}}>Загрузить файлы</p>
              </div>
              {files.map((file, index) => (
                  <File file={file} key={index} onClick={() => downloadFile(index)}/>
              ))}
          </div>
      </div> */}
            <div className="file_container">
                <div className='title'>Задания</div>
                <StudentsFilesLessons></StudentsFilesLessons>
            </div>

            <div className="file_container">
                <div className='title'>Мои файлы</div>
                <MyFileBlock></MyFileBlock>
            </div>

          

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                style={{ width: '500px' }}
            />
        </div>
    );
}

export default FileScreen;
