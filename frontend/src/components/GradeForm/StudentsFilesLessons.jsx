
import React, { useState } from 'react';
import './LessonRow.css';
import file_downloader from '../../scripts/file_downloader';
import { useEffect } from "react";
import apiFiles from "../../api/files";
import { toast } from "react-toastify";
import folderClosed from '../../img/folderClose.png';
import filelogo from '../../img/file.png';
import folderOpen from '../../img/icon_nb.png';


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
              {files.map((file, index) => (
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

          {folders.map(folder => (
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

  useEffect(() => {
    const fetchData = async () => {
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
    };
  
    fetchData();
  }, []);


  const handleDataChange = (newData) => {
    setFiles(newData);
  };

  return (
    <>
      <div><strong>Ваша текущая папка : </strong> {currentFolderName}</div>

      <div className="folder_row">
        <Folder {...files} onDataChanged={handleDataChange} path={files.id} onFolderSelect={handleFolderSelect} onFolderName={handleFolderSelectName} selectedFolderId={currentFolderId} depth={1} />
      </div>

    </>
  );
}

function StudentsFilesLessons() {

  return (
    <div className='ffff'>
      <LessonRow></LessonRow>
    </div>

  )
}
export default StudentsFilesLessons;
