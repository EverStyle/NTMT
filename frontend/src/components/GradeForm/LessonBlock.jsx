
import React, { useState } from 'react';
import folderOpen from '../../img/icon_nb.png';
import folderClosed from '../../img/folderClose.png';
import filelogo from '../../img/file.png';
import './LessonRow.css';
import file_downloader from '../../scripts/file_downloader';
import { useEffect } from "react";
import apiFiles from "../../api/files";
import { toast } from "react-toastify";
import UploadIcon from '@mui/icons-material/Upload';



function Folder({ id, name, files, folders, path, onFolderSelect, onFolderName, onDataChanged, selectedFolderId, depth }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (event) => {
    if (event.detail === 1) {
      if (isOpen) {
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
      folderId: 1
    };
    const confirmed = window.confirm('Вы точно хотите удалить выбранный файл ?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await apiFiles.delete(request);
      const response2 = await apiFiles.getList(request2);
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
     
    try {
      const response = await apiFiles.download(request);
      const data = response.data;
      const mime = response.headers['content-type'];
      const filename = files[index].fileMeta.fileName;
      const type = files[index].filePath.split('.').pop();
      file_downloader.downloadFiles(data, `${filename}.${type}`.trim(), mime);
      toast.success("Файл скачан");
    } catch (error) {
      console.error(error);
      console.error('ERROR DOWNLOAD FILE');
      toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    }
  }

  const folderImageSrc = isOpen ? folderOpen : folderClosed;
  const folderImageStyle = isOpen ? { width: '40px', height: '40px' } : { width: '30px', height: '30px' };

  return (
    <div style={{ marginLeft: window.innerWidth >= 600 ? `${depth + 10}px` : 0 }}>
      <div className={`folder_container ${folderClass}`} onClick={handleClick}>
        <div className="folder_name">
          <div className='folder_block_component'>
            <img src={folderImageSrc} style={folderImageStyle} alt={isOpen ? 'Open Folder' : 'Closed Folder'} />
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

            <ul className='files_supblock'>
              {files?.map((file, index) => (
                <li key={file.id}>
                  <div className='file_block'>
                    <div className='file_two_components'>
                      <div className='file_block_components'>
                        <img className='img_file' src={filelogo} style={{ width: '33px', height: '33px' }} />
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
}


function LessonRow() {

  const [file, setFile] = useState('');
  const [files, setFiles] = useState({});
  const [currentFolderId, setCurrentFolderId] = useState(1);
  if (currentFolderId === null) {
    setCurrentFolderId(1)
  }
  const handleFolderSelect = (folderId) => {
    setCurrentFolderId(folderId);
  }
  const [currentFolderName, setCurrentFolderName] = useState("")
  const handleFolderSelectName = (folderName) => {
    setCurrentFolderName(folderName);
  }
  const [newFolderNameLesson, setNewFolderNameLesson] = useState('')

  // ВАЖНО!!! НЕ УДАЛЯТЬ ФИКСИТ ПРОБЛЕМУ С ПОДЗАГРУЗКОЙ

  // async function fetchFiles() {
  //   const request = {
  //     folderId: 1
  //   };
  //   try {
  //     const response = await apiFiles.getList(request);
  //     setFiles(response.data.message);
  //      ;
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
  //    ;
  // }, [files]);

  // ВАЖНО!!!! НЕ УДАЛЯТЬ ФИКСИТ ПРОБЛЕМУ С ПОДЗАГРУЗКОЙ

  useEffect(async () => {
    const request = {
      folderId: 1
    };
    try {

      const response = await apiFiles.getList(request);
      setFiles(response.data.message);

    } catch (error) {
      console.error(error);
      console.error('ERROR GET FILES');
      toast.error('Произошла ошибка при получении информации о файловой системе. Попробуйте позже или обратитесь в техподдержку');
    }
  }, []);

  const validateFolderName = (folderName) => {
    const forbiddenCharactersRegex = /[^\wа-яА-Я0-9\s]/;
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
    const request = {
      name: newFolderNameLesson,
      folderId: nextFolderid
    };
    const request2 = {
      folderId: 1
    };
    try {
      validateFolderName(newFolderNameLesson);
      const response = await apiFiles.newFolderLesson(request);
      const response2 = await apiFiles.getList(request2);
      setFiles(response2.data.message)
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
      folderId: 1
    };
    const confirmed = window.confirm('Вы точно хотите удалить выбранную папку ? Все находящиеся там файлы будут удалены !!');
    if (!confirmed) {
      return;
    }
    try {
      const response = await apiFiles.deleteFolderLessonApi(request);
      const response2 = await apiFiles.getList(request2);
      setFiles(response2.data.message)

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
      'doc': 4,
    };
    const request2 = {
      folderId: 1
    };
    const request = new FormData();
    request.append('folderId', requestFolder)
    request.append('files', file[0])
    request.append('fileType', fileTypes[file[0].name.split('.').pop()])
    try {

      const response = await apiFiles.upload(request);
      const response2 = await apiFiles.getList(request2);
      setFiles(response2.data.message)
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
              <input type="text" placeholder='Введите название папки' className='create_input' style={{ width: '300px' }} onChange={(e) => setNewFolderNameLesson(e.target.value)} />
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
            <label htmlFor="file2" style={{ position: 'absolute', opacity: '0', width: '100%', height: '100%', cursor: 'pointer' }}></label>
            <input
              value={file}
              type="file"
              id="file2"
              //Важно id html и id input изменить и все работает
              style={{ position: 'absolute', display: 'none', width: '100%', height: '100%' }}
              onChange={(e) => uploadFilesLesson(e.target.files, currentFolderId)}
            />
            <UploadIcon sx={{ fontSize: '80px' }} color="primary" />
            <p style={{ textAlign: 'center' }}>Загрузить файлы</p>
          </div>
        </div>
      </div>




      {/* <div>Текущий номер папки: {currentFolderId}</div> */}
      <div>Название текущей папки: {currentFolderName}</div>


      <div className="folder_row">
        <Folder {...files} onDataChanged={handleDataChange} path={files.id} onFolderSelect={handleFolderSelect} onFolderName={handleFolderSelectName} selectedFolderId={currentFolderId} depth={1} />
      </div>

    </>
  );
}

function LessonBlock() {

  return (
    <div className='ffff'>
      <LessonRow></LessonRow>
    </div>

  )
}
export default LessonBlock;
