
import React, { useState } from 'react';
import logo from '../../img/folder.png';
import filelogo from '../../img/file.png';
import './LessonRow.css';
import file_downloader from '../../scripts/file_downloader';
import { useEffect } from "react";
import apiFiles from "../../api/files";
import { ToastContainer, toast } from "react-toastify";
import UploadIcon from '@mui/icons-material/Upload';
import '../../components/FolderFile/index.css'

function MyFolder({ id, name, files, folders, path, onFolderSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (event) => {
    if (event.detail === 2) {
      if (isOpen) {
        // If the folder is already open, set the current folder ID to the ID of the parent folder
        const parentFolderId = path.substring(0, path.lastIndexOf('/')).split('/').pop();
        onFolderSelect(parentFolderId || null);
        console.log(onFolderSelect)
      } else {
        // Otherwise, set the current folder ID to the ID of the clicked folder
        onFolderSelect(id);
      }
      setIsOpen(!isOpen);
    }
  };

  async function deleteFiles(id) {
    const request = {
      fileId: id
    };
    try {
      const response = await apiFiles.delete(request);
      const data = response.data;

      
      // console.log("data " + data)
      // setFiles(prevFiles => [...prevFiles, { ...data, fileName: data.fileMeta.fileName, }]);
      // //фикс зис щит!!!!!

    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  async function downloadFile(index) {
    const request = {
      fileId: files[index].id,
    };
    console.log(files[index])
    try {
      const response = await apiFiles.download(request);
      const data = response.data;
      const mime = response.headers['content-type'];
      const filename = files[index].fileName;
      const type = files[index].filePath.split('.').pop();
      file_downloader.downloadFiles(data, `${filename}.${type}`.trim(), mime);
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  return (
    <>
      <div className='folderBlock' onClick={handleClick}>
        <img src={logo}></img>
        {name}
      </div>

      {isOpen && (
        <>
          {files.map(file => (
            <div key={file.id}>
              <img src={filelogo}></img>
              <div>Номер = {file.id}</div>
              {file.fileMeta.fileName}
              <button onClick={() => deleteFiles(file.id)}>Удалить</button>
            </div>
          ))}
          {folders.map(folder => (
            <MyFolder
              key={folder.id}
              {...folder}
              path={`${path}/${folder.id}`}
              onFolderSelect={onFolderSelect}
            />
          ))}
        </>
      )}
    </>
  );
}

// function UserRow() {

//   const [files, setFiles] = useState({});
//   const [file, setFile] = useState('');



// //   useEffect(async () => {
// //     const request = {
// //       folderId: 2
// //     };
// //     try {
// //       const response = await apiFiles.getUserList(request);
// //       setFiles(response.data.message);
// //     } catch (error) {
// //       console.error(error);
// //       console.error('ERROR GET FILES');
// //       toast.error('Произошла ошибка при получении файлов. Попробуйте позже или обратитесь в техподдержку');
// //     }
// //   }, []);


//   async function deleteFolderLessons(folderId) {
//     // работает поменяй динамичесоке обновление ИД папки типа добвавь кнопки для папок и туда свяжи
//     const request = {
//       folderId: 3
//     };

//     try {
//       const response = await apiFiles.deleteFolderLessonApi(request);
//       const data = response.data;



//     } catch (error) {
//       console.error(error);
//       console.error('ERROR DOWNLOAD FILE');
//       toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
//     }
//   }

//   async function createFolderStudent(index) {
//     //а это типа создание папки в папке студента типо разные папки 
//     const request = {
//       fileId: files[index].id,
//     };
//     console.log(files[index])
//     try {
//       const response = await apiFiles.download(request);
//       const data = response.data;
//       const mime = response.headers['content-type'];
//       const filename = files[index].fileName;
//       const type = files[index].filePath.split('.').pop();
//       file_downloader.downloadFiles(data, `${filename}.${type}`.trim(), mime);
//     } catch (error) {
//       console.error(error);
//       console.error('ERROR DOWNLOAD FILE');
//       toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
//     }
//   }


//   async function uploadFiles(file) {
//     const requestFolder = 2;
//     const fileTypes = {
//       'txt': 1,
//       'xlsx': 2,
//       'docx': 3,
//     };
//     const request = new FormData();
//     request.append('folderId', requestFolder)
//     request.append('files', file[0])
//     request.append('fileType', fileTypes[file[0].name.split('.').pop()])
//     try {
//       console.log("Это в функции " + requestFolder)
//       const response = await apiFiles.upload(request);
//       const data = response.data.message[0];

//       //крч смотри на то что ты закидываешь в стейт, там объект приходит с бека и ты создал стейт с пустым массивом, и пытался передать в стейт массив, поменяли на объект снизу и вроде работает.
//       setFiles(prevFiles => ({ ...prevFiles, files: [...prevFiles.files, data] }));
//       //ВАЖНО ЗАПОМНИ

//       //фикс тхис щит!!!!!

//       // setFiles([...files, {...data,fileName: data.fileMeta.fileName,}]);
//       // setFile('');

//       // setFiles(prevFiles => [...prevFiles, {
//       //   ...data,
//       //   fileName: data.fileMeta.fileName,
//       // }]);
//       // useEffect(()=>{},[]);

//     } catch (error) {
//       console.error(error);
//       console.error('ERROR UPLOAD FILES');
//       toast.error('Произошла ошибка при загрузке файла. Попробуйте позже или обратитесь в техподдержку');
//     }
//   }
//   const [currentFolderId, setCurrentFolderId] = useState(2);

//   if (currentFolderId === null) {
//     setCurrentFolderId(2)
//   }

//   const handleFolderSelect = (folderId) => {
//     setCurrentFolderId(folderId);
//   }
//   const [newFolderNameLesson, setNewFolderNameLesson] = useState('')

//   return (
//     <>
//       <div>
//         Создание папки
//         <div className='createFolderBlock'>
//           <input type="text" placeholder='Введите название папки' onChange={(e) => setNewFolderNameLesson(e.target.value)} />
//           <button type='button' onClick={() => createFolderStudent(newFolderNameLesson)}>Создать</button>
//           <button type='button' onClick={() => deleteFolderLessons()}>Удалить</button>
//           {/* onClick={() => deleteFiles(file.id)} */}
//         </div>
//       </div>
//       <div>Current folder ID: {currentFolderId}</div>



//       <div
//         style={{ fontSize: '13px', textAlign: 'center', position: 'relative' }}
//         className="file-link"
//       >
//         <label htmlFor="file" style={{ position: 'absolute', opacity: '0', width: '100%', height: '100%', cursor: 'pointer' }}></label>
//         <input
//           value={file}
//           type="file"
//           id="file"
//           style={{ position: 'absolute', display: 'none', width: '100%', height: '100%' }}
//           onChange={(e) => uploadFiles(e.target.files)}
//         />
//         <UploadIcon sx={{ fontSize: '80px' }} color="primary" />
//         <p style={{ textAlign: 'center' }}>Загрузить файлы</p>
//       </div>

//       <div className="folder_row">
//         <Folder {...files} path={files.id} onFolderSelect={handleFolderSelect} />
//       </div>

//     </>
//   );
// }

function StudentRow() {

  const [lessonfiles, setLessonFiles] = useState({});
  const [file, setFile] = useState('');
  const [userfiles, setUserFiles] = useState({});
  const [files, setFiles] = useState({});



  // useEffect(async () => {
  //   const lessonRequest = {
  //     folderId: 1
  //   };
  //   const userRequest = {
  //     folderId: 2
  //   };
  //   const request = {
  //     folderId: 2
  //   };

  //   try {
  //     const lessonResponse = await apiFiles.getList(lessonRequest);
  //     setLessonFiles(lessonResponse.data.message);
  //     console.log(lessonfiles)

  //     const userResponse = await apiFiles.getUserList(userRequest);
  //     setUserFiles(userResponse.data.message);
  //     console.log(userfiles)

  //     const response = await apiFiles.getUserList(request);
  //     setFiles(response.data.message);
  //     console.log(files)

  //   } catch (error) {
  //     console.error(error);
  //     console.error('ERROR GET FILES');
  //     toast.error('Произошла ошибка при получении файлов. Попробуйте позже или обратитесь в техподдержку');
  //   }
  // }, []);





  async function createFolderLessons(newFolderNameLesson) {

    if (newFolderNameLesson === null) {

    }

    //типа создание папки в папке задание 
    const request = {
      name: newFolderNameLesson,
      folderId: 1
    };
    console.log("новое имя папки =" + request)
    try {
      const response = await apiFiles.newFolderLesson(request);
      const data = response.data;

    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  async function createFolderStudent(index) {
    //а это типа создание папки в папке студента типо разные папки 
    const request = {
      fileId: lessonfiles[index].id,
    };
    console.log(lessonfiles[index])
    try {
      const response = await apiFiles.download(request);
      const data = response.data;
      const mime = response.headers['content-type'];
      const filename = lessonfiles[index].fileName;
      const type = lessonfiles[index].filePath.split('.').pop();
      file_downloader.downloadFiles(data, `${filename}.${type}`.trim(), mime);
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }


  async function deleteFolderLessons(folderId) {
    // работает поменяй динамичесоке обновление ИД папки типа добвавь кнопки для папок и туда свяжи
    const request = {
      folderId: 9
    };

    try {
      const response = await apiFiles.deleteFolderLessonApi(request);
      const data = response.data;



    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  async function uploadFiles(file) {
    const requestFolder = 2;
    const fileTypes = {
      'txt': 1,
      'xlsx': 2,
      'docx': 3,
    };

    const request = new FormData();
    request.append('folderId', requestFolder)
    request.append('files', file[0])
    request.append('fileType', fileTypes[file[0].name.split('.').pop()])
    try {
      console.log("Это в папке " + requestFolder)
      const response = await apiFiles.upload(request);
      const data = response.data.message[0];

      //крч смотри на то что ты закидываешь в стейт, там объект приходит с бека и ты создал стейт с пустым массивом, и пытался передать в стейт массив, поменяли на объект снизу и вроде работает.
      // setLessonFiles(prevFiles => ({ ...prevFiles, lessonfiles: [...prevFiles.lessonfiles, data] }));
//вроде исправил !!!!!!!!

      setFiles(prevFiles => ({ ...prevFiles, files: [...prevFiles.files, data] }));
      //ВАЖНО ЗАПОМНИ

      //фикс тхис щит!!!!!

      console.log(requestFolder)
      console.log(response)
      console.log(data)
      
      
    } catch (error) {
      console.error(error);
      console.error('ERROR UPLOAD FILES');
      toast.error('Произошла ошибка при загрузке файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  const [currentFolderId, setCurrentFolderId] = useState(1);

  if (currentFolderId === null) {
    setCurrentFolderId(2)
  }

  const handleFolderSelect = (folderId) => {
    setCurrentFolderId(folderId);
  }
  const [newFolderNameLesson, setNewFolderNameLesson] = useState('')

  return (
    <>
      <div>
        Создание папки
        <div className='createFolderBlock'>
          <input type="text" placeholder='Введите название папки' onChange={(e) => setNewFolderNameLesson(e.target.value)} />
          <button type='button' onClick={() => createFolderLessons(newFolderNameLesson)}>Создать</button>
          <button type='button' onClick={() => deleteFolderLessons()}>Удалить</button>
          {/* onClick={() => deleteFiles(file.id)} */}
        </div>
      </div>
      <div>Current folder ID: {currentFolderId}</div>



      <div
        style={{ fontSize: '13px', textAlign: 'center', position: 'relative' }}
        className="file-link"
      >
        <label htmlFor="file" style={{ position: 'absolute', opacity: '0', width: '100%', height: '100%', cursor: 'pointer' }}></label>
        <input
          value={file}
          type="file"
          id="file"
          style={{ position: 'absolute', display: 'none', width: '100%', height: '100%' }}
          onChange={(e) => uploadFiles(e.target.files)}
        />
        <UploadIcon sx={{ fontSize: '80px' }} color="primary" />
        <p style={{ textAlign: 'center' }}>Загрузить файлы</p>
      </div>

      <div className="folder_row">
        <MyFolder {...userfiles} path={userfiles.id} onFolderSelect={handleFolderSelect} />
      </div>

    </>
  );
}

function MyFileBlock() {


  return (
    <StudentRow></StudentRow>
  )
}
export default MyFileBlock;
