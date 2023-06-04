
import React, { useState } from 'react';
import logo from '../../img/icon_nb.png';
import filelogo from '../../img/file.png';
import './LessonRow.css';
import file_downloader from '../../scripts/file_downloader';
import { useEffect } from "react";
import apiFiles from "../../api/files";
import { ToastContainer, toast } from "react-toastify";
import UploadIcon from '@mui/icons-material/Upload';
import { Button } from '@mui/material';
import '../../components/FolderFile/index.css'

// import React, { useState } from 'react';
// import logo from '../../img/folder.png';
// import filelogo from '../../img/file.png';
// import './LessonRow.css';
// import file_downloader from '../../scripts/file_downloader';
// import { useEffect } from "react";
// import apiFiles from "../../api/files";
// import { ToastContainer, toast } from "react-toastify";
// import UploadIcon from '@mui/icons-material/Upload';
// import '../../components/FolderFile/index.css'


function Folder({ id, name, files, folders, path, onFolderSelect, onFolderName, onDataChanged, selectedFolderId, depth }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (event) => {
    if (event.detail === 1) {
      if (isOpen) {
        const parentFolderId = path.substring(0, path.lastIndexOf('/')).split('/').pop();
        // onFolderSelect(parentFolderId || null);
        onFolderSelect(id);
        onFolderName(name)
      } else {
        onFolderSelect(id);
        onFolderName(name)
      }
      setIsOpen(!isOpen);
    }
  };
  const folderClass = selectedFolderId === id ? 'selected' : 'folder_container';

  async function deleteFiles(id) {
    const request = {
      fileId: id
    };
    const request2 = {
      
    };

    const confirmed = window.confirm('Вы точно хотите удалить выбранный файл ?');

    if (!confirmed) {
      return;
    }

    try {
      const response = await apiFiles.delete(request);
      const data = response.data;

      const response2 = await apiFiles.getMyFolder(request2);
      
      // setFiles(response2.data.message);

      onDataChanged(response2.data.message)
      toast.success("Файл успешно удален");
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при удалении файла. Попробуйте позже или обратитесь в техподдержку');
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
      toast.success("Файл скачан");
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }
  const indentation = depth * 8; // 10 pixels per level

  return (
    <div style={{ marginLeft: window.innerWidth >= 600 ? `${depth + 10}px` : 0 }}>
      <div className={`folder_container ${folderClass}`} onClick={handleClick}>
        <div className="folder_name">
          <div className='folder_block_component'>
            <img src={logo} style={{ width: '30px', height: '30px' }} />
          </div>
          <div className='folder_block_component'>
            {name}
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          {files.length === 0 && <div>В папке отсутствуют файлы  </div>}

          {files.length > 0 && (

            <ul>
              {files?.map((file, index) => (
                <li key={file.id}>
                  <div className='file_block'>
                    <div className='file_two_components'>
                    <div className='file_block_components'>
                      <img className='img_file' src={filelogo} style={{ width: '30px', height: '30px' }} />
                    </div>
                    <div className='file_block_components'>
                    {file.id && (
                        <button className='button_upload' onClick={() => downloadFile(index)}>Скачать</button>
                      )}
                      <button className='button_delete_file' onClick={() => deleteFiles(file.id)}>Удалить</button>
                      
                    </div>
                    </div>

                    {/* <div className='file_block_components'>Номер = {file.id}</div> */}
                    <div className='file_block_components'>
                      {file.fileMeta.fileName}
                    </div>

                    
                  </div>
                </li>
              ))}
            </ul>
            
          )}

          {folders?.map(folder => (
            <Folder
              key={folder.id}
              {...folder}
              path={`${path}/${folder.id}`}
              onFolderSelect={onFolderSelect}
              onFolderName={onFolderName}
              selectedFolderId={selectedFolderId}
              onDataChanged={onDataChanged}
              depth={depth}
            />
          ))}
          
        </>
      )}
    </div>
  );
  // return (
  //   <div>
  //     <div className={folderClass} onClick={handleClick}>
  //     <img src={logo} style={{ width: '30px', height: '30px' }} />
  //       {name}
  //     </div>

  //     {isOpen && (
  //       <>
  //         {folders.map(folder => (
  //           <Folder
  //             key={folder.id}
  //             {...folder}
  //             path={`${path}/${folder.id}`}
  //             onFolderSelect={onFolderSelect}
  //             selectedFolderId={selectedFolderId}
  //             onDataChanged={onDataChanged}
  //           />
  //         ))}
  //       </>
  //     )}

  //     {isOpen && (

  //       <ul>
  //         {files.map(file => (
  //             <li>
  //               <div key={file.id}>
  //               <img src={filelogo}></img>
  //               <div>Номер = {file.id}</div>
  //               {file.fileMeta.fileName}

  //               <div>
  //                 <button className='button_delete' onDoubleClick={(event) => {
  //                   if (event.detail === 2) {
  //                     deleteFiles(file.id);
  //                   }
  //                 }}>Удалить</button>
  //               </div>
  //             </div>
  //             </li>

  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );
}


function StudentRow() {

  const [file, setFile] = useState('');
  const [files, setFiles] = useState({});

  const [currentFolderId, setCurrentFolderId] = useState(files.id);

  if (currentFolderId === null) {
    setCurrentFolderId(files.id)
  }

  const handleFolderSelect = (folderId) => {
    setCurrentFolderId(folderId);
  }
  const [currentFolderName, setCurrentFolderName] = useState("")

  const handleFolderSelectName = (folderName) => {
    setCurrentFolderName(folderName);
  }
  const [newFolderNameLesson, setNewFolderNameLesson] = useState('')

  const [allfiles, setAllFiles] = useState({});

// ВАЖНО!!! НЕ УДАЛЯТЬ ФИКСИТ ПРОБЛЕМУ С ПОДЗАГРУЗКОЙ
  // async function fetchFiles() {
  //   const request = {
  //     folderId: 1
  //   };
  //   try {
  //     const response = await apiFiles.getList(request);
  //     setFiles(response.data.message);
  //     console.log(response.data.message);
  //   } catch (error) {
  //     console.error(error);
  //     console.error('ERROR GET FILES');
  //     toast.error('Произошла ошибка при получении файлов. Попробуйте позже или обратитесь в техподдержку');
  //   }
  // }
  
  // useEffect(() => {
  //   fetchFiles();
  // }, []);
  
  // useEffect(() => {
  //   console.log(files);
  // }, [files]);
// ВАЖНО!!!! НЕ УДАЛЯТЬ ФИКСИТ ПРОБЛЕМУ С ПОДЗАГРУЗКОЙ

  useEffect(async () => {
    const request = {
      
    };
    try {

      const response = await apiFiles.getMyFolder(request);
      setFiles(response.data.message);
      // console.log(response.data.message)
      
    } catch (error) {
      console.error(error);
      console.error('ERROR GET FILES');
      toast.error('Произошла ошибка при получении информации о файловой системе. Попробуйте позже или обратитесь в техподдержку');
    }
  }, []);

  // console.log(files)

  const validateFolderName = (folderName) => {
    const forbiddenCharactersRegex = /[^a-zA-Z0-9а-яА-Я]/;
    const isForbidden = forbiddenCharactersRegex.test(folderName);
    const isTooLong = folderName.length > 30;
    const isEmpty = folderName.trim().length === 0;
  
    if (isForbidden) {
      toast.error('Содержит недопустимые символы');
      throw new Error('Folder name contains forbidden characters');
      
    }
  
    if (isTooLong) {
      toast.error('Название слишком длинное');
      throw new Error('Folder name is too long');
    }
  
    if (isEmpty) {
      toast.error('Пустые названия недопустимы');
      throw new Error('Folder name cannot be empty');
    }
  };

  async function createFolderLessons(newFolderNameLesson, nextFolderid) {
    //типа создание папки в папке задание 
    const request = {
      name: newFolderNameLesson,
      folderId: nextFolderid
    };
    const request2 = {
      
    };

    try {
      validateFolderName(newFolderNameLesson);
      const response = await apiFiles.newFolderLesson(request);
      const data = response.data.message[0];

      const response2 = await apiFiles.getMyFolder(request2);
      setFiles(response2.data.message);
      // console.log(data)
      // setFiles(prevFiles => {
      //   const newFolder = {
      //     id: data.id,
      //     name: data.name,
      //     files: [],
      //     folders: []
      //   };
      //   return { ...prevFiles, folders: [...prevFiles.folders, newFolder] };
      // });

      toast.success("Папка успешно созданна");
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Ошибка при создании папки. Проверьте правильность названия и попробуйте еще раз');
    }
  }

  // async function deleteFolderLessons(folderId) {
  //   const request = {
  //     folderId: 3
  //   };
  //   const request2 = {
  //     folderId: 1
  //   };
  //   try {
  //     const response = await apiFiles.deleteFolderLessonApi(request);
  //     const deletedFolderId = response.data.message[0]; // get the ID of the deleted folder

  //     // create a new object with the modified state
  //     // const updatedFiles = {...files, folders: files.folders.filter(folder => folder.id !== request)};

  //     // update the state using the setter function
  //     // setFiles(updatedFiles);

  //     const response2 = await apiFiles.getList(request2);
  //     setFiles(response2.data.message);

  //     // КОСТЫЛЬ ПОТОМ ЗАМАЖ ИЛИ ПОМЕНЯЙ ЕСЛИ СМОЖЕШЬ НО РАБОТАЕТ

  //   } catch (error) {
  //     console.error(error);
  //     console.error('ERROR DOWNLOAD FILE');
  //     toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
  //   }
  // }

  async function deleteFolderLessons(newfolderId) {
    const request = {
      folderId: newfolderId
    };
    const request2 = {
      
    };

    const confirmed = window.confirm('Вы точно хотите удалить выбранную папку ? Все находящиеся там файлы будут удалены !!');

    if (!confirmed) {
      return;
    }
    try {
      const response = await apiFiles.deleteFolderLessonApi(request);
      const deletedFolderId = response.data.message[0]; // get the ID of the deleted folder

      // create a new object with the modified state
      // const updatedFiles = {...files, folders: files.folders.filter(folder => folder.id !== request)};

      // update the state using the setter function
      // setFiles(updatedFiles);

      const response2 = await apiFiles.getMyFolder(request2);
      setFiles(response2.data.message);

      // КОСТЫЛЬ ПОТОМ ЗАМАЖ ИЛИ ПОМЕНЯЙ ЕСЛИ СМОЖЕШЬ НО РАБОТАЕТ

      toast.success("Папка успешно удалена");
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при удалении папки. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  async function uploadFilesLesson(file, newfolderId) {
    const requestFolder = newfolderId;
    const fileTypes = {
      'txt': 1,
      'xlsx': 2,
      'docx': 3,
    };
    const request2 = {
      
    };
    const request = new FormData();
    request.append('folderId', requestFolder)
    request.append('files', file[0])
    request.append('fileType', fileTypes[file[0].name.split('.').pop()])
    try {

      const response = await apiFiles.upload(request);
      const data = response.data.message[0];
      const response2 = await apiFiles.getMyFolder(request2);
      setFiles(response2.data.message);
      //крч смотри на то что ты закидываешь в стейт, там объект приходит с бека и ты создал стейт с пустым массивом, и пытался передать в стейт массив, поменяли на объект снизу и вроде работает.
      // setFiles(prevFiles => ({ ...prevFiles, files: [...prevFiles.files, data] }));
      //ВАЖНО ЗАПОМНИ

      toast.success("Файл успешно загружен");
    } catch (error) {
      console.error(error);
      console.error('ERROR UPLOAD FILES');
      toast.error('Произошла ошибка при загрузке файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  const handleDataChange = (newData) => {
    setFiles(newData);
  };

  return (
    <>

      <div className='folder_create_block'>
        <div>

          <div className='createFolderBlock'>
            <div className='create_folder_block_component'>
              <input type="text" placeholder='Введите название папки' style={{ width: '300px' }} onChange={(e) => setNewFolderNameLesson(e.target.value)} />
            </div>
            <div className='create_folder_block_component'>
            <button type='button' className='button_create' onClick={() => createFolderLessons(newFolderNameLesson, currentFolderId)}>Создать</button>
              <button className='button_delete' onClick={(event) => {
                if (event.detail === 1) {
                  deleteFolderLessons(currentFolderId);
                }
              }}>Удалить</button>
            </div>

          </div>
        </div>
        <div className='Lexa'>
          <div
            style={{ fontSize: '13px', textAlign: 'center', position: 'relative' }}
            className="file-link"
          >
            <label htmlFor="file3" style={{ position: 'absolute', opacity: '0', width: '100%', height: '100%', cursor: 'pointer' }}></label>
            <input
              value={file}
              type="file"
              id="file3"
              //Важно id html и id input изменить и все работает
              style={{ position: 'absolute', display: 'none', width: '100%', height: '100%' }}
              onChange={(e) => uploadFilesLesson(e.target.files, currentFolderId)}
            />
            <UploadIcon sx={{ fontSize: '80px' }} color="primary" />
            <p style={{ textAlign: 'center' }}>Загрузить файлы</p>
          </div>
        </div>
      </div>





      <div>
        <strong>Ваша текущая папка : </strong>{currentFolderName}</div>


      <div className="folder_row">
        <Folder {...files} onDataChanged={handleDataChange} path={files.id} onFolderSelect={handleFolderSelect} onFolderName={handleFolderSelectName} selectedFolderId={currentFolderId} depth={1} />
      </div>

    </>
  );
}

function MyFileBlock() {


  return (
    <div className='ffff'>
<StudentRow></StudentRow>
    </div>
    
  )
}
export default MyFileBlock;

// import React, { useState } from 'react';
// import logo from '../../img/folder.png';
// import filelogo from '../../img/file.png';
// import './LessonRow.css';
// import file_downloader from '../../scripts/file_downloader';
// import { useEffect } from "react";
// import apiFiles from "../../api/files";
// import { ToastContainer, toast } from "react-toastify";
// import UploadIcon from '@mui/icons-material/Upload';
// import '../../components/FolderFile/index.css'

// function MyFolder({ id, name, files, folders, path, onFolderSelect }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const handleClick = (event) => {
//     if (event.detail === 2) {
//       if (isOpen) {
//         // If the folder is already open, set the current folder ID to the ID of the parent folder
//         const parentFolderId = path.substring(0, path.lastIndexOf('/')).split('/').pop();
//         onFolderSelect(parentFolderId || null);
//         console.log(onFolderSelect)
//       } else {
//         // Otherwise, set the current folder ID to the ID of the clicked folder
//         onFolderSelect(id);
//       }
//       setIsOpen(!isOpen);
//     }
//   };

//   async function deleteFiles(id) {
//     const request = {
//       fileId: id
//     };
//     try {
//       const response = await apiFiles.delete(request);
//       const data = response.data;

      
//       // console.log("data " + data)
//       // setFiles(prevFiles => [...prevFiles, { ...data, fileName: data.fileMeta.fileName, }]);
//       // //фикс зис щит!!!!!

//     } catch (error) {
//       console.error(error);
//       console.error('ERROR DOWNLOAD FILE');
//       toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
//     }
//   }

//   async function downloadFile(index) {
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

//   return (
//     <>
//       <div className='folderBlock' onClick={handleClick}>
//         <img src={logo}></img>
//         {name}
//       </div>

//       {isOpen && (
//         <>
//           {files.map(file => (
//             <div key={file.id}>
//               <img src={filelogo}></img>
//               <div>Номер = {file.id}</div>
//               {file.fileMeta.fileName}
//               <button onClick={() => deleteFiles(file.id)}>Удалить</button>
//             </div>
//           ))}
//           {folders.map(folder => (
//             <MyFolder
//               key={folder.id}
//               {...folder}
//               path={`${path}/${folder.id}`}
//               onFolderSelect={onFolderSelect}
//             />
//           ))}
//         </>
//       )}
//     </>
//   );
// }

// // function UserRow() {

// //   const [files, setFiles] = useState({});
// //   const [file, setFile] = useState('');



// // //   useEffect(async () => {
// // //     const request = {
// // //       folderId: 2
// // //     };
// // //     try {
// // //       const response = await apiFiles.getUserList(request);
// // //       setFiles(response.data.message);
// // //     } catch (error) {
// // //       console.error(error);
// // //       console.error('ERROR GET FILES');
// // //       toast.error('Произошла ошибка при получении файлов. Попробуйте позже или обратитесь в техподдержку');
// // //     }
// // //   }, []);


// //   async function deleteFolderLessons(folderId) {
// //     // работает поменяй динамичесоке обновление ИД папки типа добвавь кнопки для папок и туда свяжи
// //     const request = {
// //       folderId: 3
// //     };

// //     try {
// //       const response = await apiFiles.deleteFolderLessonApi(request);
// //       const data = response.data;



// //     } catch (error) {
// //       console.error(error);
// //       console.error('ERROR DOWNLOAD FILE');
// //       toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
// //     }
// //   }

// //   async function createFolderStudent(index) {
// //     //а это типа создание папки в папке студента типо разные папки 
// //     const request = {
// //       fileId: files[index].id,
// //     };
// //     console.log(files[index])
// //     try {
// //       const response = await apiFiles.download(request);
// //       const data = response.data;
// //       const mime = response.headers['content-type'];
// //       const filename = files[index].fileName;
// //       const type = files[index].filePath.split('.').pop();
// //       file_downloader.downloadFiles(data, `${filename}.${type}`.trim(), mime);
// //     } catch (error) {
// //       console.error(error);
// //       console.error('ERROR DOWNLOAD FILE');
// //       toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
// //     }
// //   }


// //   async function uploadFiles(file) {
// //     const requestFolder = 2;
// //     const fileTypes = {
// //       'txt': 1,
// //       'xlsx': 2,
// //       'docx': 3,
// //     };
// //     const request = new FormData();
// //     request.append('folderId', requestFolder)
// //     request.append('files', file[0])
// //     request.append('fileType', fileTypes[file[0].name.split('.').pop()])
// //     try {
// //       console.log("Это в функции " + requestFolder)
// //       const response = await apiFiles.upload(request);
// //       const data = response.data.message[0];

// //       //крч смотри на то что ты закидываешь в стейт, там объект приходит с бека и ты создал стейт с пустым массивом, и пытался передать в стейт массив, поменяли на объект снизу и вроде работает.
// //       setFiles(prevFiles => ({ ...prevFiles, files: [...prevFiles.files, data] }));
// //       //ВАЖНО ЗАПОМНИ

// //       //фикс тхис щит!!!!!

// //       // setFiles([...files, {...data,fileName: data.fileMeta.fileName,}]);
// //       // setFile('');

// //       // setFiles(prevFiles => [...prevFiles, {
// //       //   ...data,
// //       //   fileName: data.fileMeta.fileName,
// //       // }]);
// //       // useEffect(()=>{},[]);

// //     } catch (error) {
// //       console.error(error);
// //       console.error('ERROR UPLOAD FILES');
// //       toast.error('Произошла ошибка при загрузке файла. Попробуйте позже или обратитесь в техподдержку');
// //     }
// //   }
// //   const [currentFolderId, setCurrentFolderId] = useState(2);

// //   if (currentFolderId === null) {
// //     setCurrentFolderId(2)
// //   }

// //   const handleFolderSelect = (folderId) => {
// //     setCurrentFolderId(folderId);
// //   }
// //   const [newFolderNameLesson, setNewFolderNameLesson] = useState('')

// //   return (
// //     <>
// //       <div>
// //         Создание папки
// //         <div className='createFolderBlock'>
// //           <input type="text" placeholder='Введите название папки' onChange={(e) => setNewFolderNameLesson(e.target.value)} />
// //           <button type='button' onClick={() => createFolderStudent(newFolderNameLesson)}>Создать</button>
// //           <button type='button' onClick={() => deleteFolderLessons()}>Удалить</button>
// //           {/* onClick={() => deleteFiles(file.id)} */}
// //         </div>
// //       </div>
// //       <div>Current folder ID: {currentFolderId}</div>



// //       <div
// //         style={{ fontSize: '13px', textAlign: 'center', position: 'relative' }}
// //         className="file-link"
// //       >
// //         <label htmlFor="file" style={{ position: 'absolute', opacity: '0', width: '100%', height: '100%', cursor: 'pointer' }}></label>
// //         <input
// //           value={file}
// //           type="file"
// //           id="file"
// //           style={{ position: 'absolute', display: 'none', width: '100%', height: '100%' }}
// //           onChange={(e) => uploadFiles(e.target.files)}
// //         />
// //         <UploadIcon sx={{ fontSize: '80px' }} color="primary" />
// //         <p style={{ textAlign: 'center' }}>Загрузить файлы</p>
// //       </div>

// //       <div className="folder_row">
// //         <Folder {...files} path={files.id} onFolderSelect={handleFolderSelect} />
// //       </div>

// //     </>
// //   );
// // }

// function StudentRow() {

//   const [lessonfiles, setLessonFiles] = useState({});
//   const [file, setFile] = useState('');
//   const [userfiles, setUserFiles] = useState({});
//   const [files, setFiles] = useState({});



//   // useEffect(async () => {
//   //   const lessonRequest = {
//   //     folderId: 1
//   //   };
//   //   const userRequest = {
//   //     folderId: 2
//   //   };
//   //   const request = {
//   //     folderId: 2
//   //   };

//   //   try {
//   //     const lessonResponse = await apiFiles.getList(lessonRequest);
//   //     setLessonFiles(lessonResponse.data.message);
//   //     console.log(lessonfiles)

//   //     const userResponse = await apiFiles.getUserList(userRequest);
//   //     setUserFiles(userResponse.data.message);
//   //     console.log(userfiles)

//   //     const response = await apiFiles.getUserList(request);
//   //     setFiles(response.data.message);
//   //     console.log(files)

//   //   } catch (error) {
//   //     console.error(error);
//   //     console.error('ERROR GET FILES');
//   //     toast.error('Произошла ошибка при получении файлов. Попробуйте позже или обратитесь в техподдержку');
//   //   }
//   // }, []);





//   async function createFolderLessons(newFolderNameLesson) {

//     if (newFolderNameLesson === null) {

//     }

//     //типа создание папки в папке задание 
//     const request = {
//       name: newFolderNameLesson,
//       folderId: 1
//     };
//     console.log("новое имя папки =" + request)
//     try {
//       const response = await apiFiles.newFolderLesson(request);
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
//       fileId: lessonfiles[index].id,
//     };
//     console.log(lessonfiles[index])
//     try {
//       const response = await apiFiles.download(request);
//       const data = response.data;
//       const mime = response.headers['content-type'];
//       const filename = lessonfiles[index].fileName;
//       const type = lessonfiles[index].filePath.split('.').pop();
//       file_downloader.downloadFiles(data, `${filename}.${type}`.trim(), mime);
//     } catch (error) {
//       console.error(error);
//       console.error('ERROR DOWNLOAD FILE');
//       toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
//     }
//   }


//   async function deleteFolderLessons(folderId) {
//     // работает поменяй динамичесоке обновление ИД папки типа добвавь кнопки для папок и туда свяжи
//     const request = {
//       folderId: 9
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
//       console.log("Это в папке " + requestFolder)
//       const response = await apiFiles.upload(request);
//       const data = response.data.message[0];

//       //крч смотри на то что ты закидываешь в стейт, там объект приходит с бека и ты создал стейт с пустым массивом, и пытался передать в стейт массив, поменяли на объект снизу и вроде работает.
//       // setLessonFiles(prevFiles => ({ ...prevFiles, lessonfiles: [...prevFiles.lessonfiles, data] }));
// //вроде исправил !!!!!!!!

//       setFiles(prevFiles => ({ ...prevFiles, files: [...prevFiles.files, data] }));
//       //ВАЖНО ЗАПОМНИ

//       //фикс тхис щит!!!!!

//       console.log(requestFolder)
//       console.log(response)
//       console.log(data)
      
      
//     } catch (error) {
//       console.error(error);
//       console.error('ERROR UPLOAD FILES');
//       toast.error('Произошла ошибка при загрузке файла. Попробуйте позже или обратитесь в техподдержку');
//     }
//   }

//   const [currentFolderId, setCurrentFolderId] = useState(1);

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
//           <button type='button' onClick={() => createFolderLessons(newFolderNameLesson)}>Создать</button>
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
//         <MyFolder {...userfiles} path={userfiles.id} onFolderSelect={handleFolderSelect} />
//       </div>

//     </>
//   );
// }

// function MyFileBlock() {


//   return (
//     <StudentRow></StudentRow>
//   )
// }
// export default MyFileBlock;
