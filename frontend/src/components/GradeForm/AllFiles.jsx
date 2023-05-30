import React, { useState } from 'react';
import logo from '../../img/icon_nb.png';
import filelogo from '../../img/file.png';
import './LessonRow.css';
import file_downloader from '../../scripts/file_downloader';
import { useEffect } from "react";
import apiFiles from "../../api/files";
import apiSchedule from '../../api/schedule';
import { ToastContainer, toast } from "react-toastify";
import UploadIcon from '@mui/icons-material/Upload';
import MyFileBlock from './MyFileBlock';
import { Button } from '@mui/material';
import Select from 'react-select';


function Folder({ id, name, files, folders, path, onFolderSelect, onFolderName, onDataChanged, selectedFolderId, depth }) {
    const [isOpen, setIsOpen] = useState(false);


    const handleClick = (event) => {
        if (event.detail === 1) {
            if (isOpen) {
                // const parentFolderId = path.substring(0, path.lastIndexOf('/')).split('/').pop();
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
            const data = response.data;

            const response2 = await apiFiles.getList(request2);
            // setFiles(response2.data.message);

            onDataChanged(response2.data.message)

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
            toast.success("Файл скачан");
        } catch (error) {
            console.error(error);
            console.error('ERROR DOWNLOAD FILE');
            toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
        }
    }
    const indentation = depth * 10; // 10 pixels per level

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

// function Folder({ id, name, files, folders }) {
//     const [isOpen, setIsOpen] = React.useState(false);

//     const handleClick = () => {
//       setIsOpen(!isOpen);
//     };

//     return (
//       <div>
//         <div onClick={handleClick}>{name}</div>
//         {isOpen && (
//           <ul>
//             {folders.map((folder) => (
//               <li key={folder.id}>
//                 <Folder {...folder} />
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   }

//   function drawFolders({ message }) {
//     return (
//       <div>
//         {message.map((folder) => (
//           <Folder key={folder.id} {...folder} />
//         ))}
//       </div>
//     );
//   }

//   export default drawFolders;


function AllRow() {

    const [file, setFile] = useState('');
    const [files, setFiles] = useState({});

    const [allfiles, setAllFiles] = useState({});

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

    const [showFolders, setShowFolders] = useState(false);

    useEffect(async () => {
        const request = {
            group: ""
        };
        try {
            // const response = await apiFiles.getAllList(request);
            // setFiles(response.data.message);
            const response2 = await apiSchedule.groups();
            setGroups(response2.data.message);

        } catch (error) {
            console.error(error);
            console.error('ERROR GET FILES');
            toast.error('Произошла ошибка при получении файлов. Попробуйте позже или обратитесь в техподдержку');
        }
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            setShowFolders(true);
        }, 1000);

        // Clear the timeout if the component unmounts before the delay has passed
        return () => clearTimeout(delay);
    }, []);

    const [certainFiles, setCertainFiles] = useState([]);
    const [students, setStudents] = useState([]);
    const [newStudents, setNewStudents] = useState(0);
    const [newStudents2, setNewStudents2] = useState(0);
    const [groups, setGroups] = useState([]);
    const [newGroups, setNewGroups] = useState([]);



    const [fileList, setFileList] = useState([]);

    const fetchStudents = async (groupId) => {
        try {
            const response = await apiSchedule.certainGroups(groupId);
            console.log(response.data.message)
            setStudents(response.data.message);
        } catch (error) {
            console.error(error);
            console.error('ERROR GET STUDENTS');
            toast.error(
                'Произошла ошибка при получении студентов. Попробуйте позже или обратитесь в техподдержку'
            );
        }
    };

    const handleGroupChange = (e) => {
        const groupId = e.value;
        setNewGroups(groupId);

        if (groupId === "") {
            setFiles([]);
            setStudents([]); // Clear the students array when the default value is selected

        } else {
            fetchStudents(groupId);
            // setFiles([]); // Send an empty array when the group changes
        }
    };

    const handleStudentChange = (e) => {
        const studentId = e.value;
        setNewStudents2(studentId);
        filesFilter(studentId)
    };

    const filesFilter = async (userId) => {
        if (!userId) {
            // No userId provided, set all folders empty
            setFiles([]);
        } else {
            // Filter folders based on userId
            const request = {
                group: ""
            };
            const response = await apiFiles.getAllList(request);
            console.log(response)
            setFiles(response.data.message);

            const filteredFolders = response.data.message.filter((folder) => folder.userId === userId);
            console.log(filteredFolders)
            setFiles(filteredFolders);
        }
    };

    const validateFolderName = (folderName) => {
        const forbiddenCharacters = ['\\', '/', ':', '*', '?', '"', '<', '>', '|', '!', '@', '#', '$', '%', '^', '&', '(', ')', '_', '-', '+', '=', '`', '~', '[', ']', '{', '}', ';', "'", ',', '.', '<', '>', '/', '?', '|', ' '];
        const isForbidden = forbiddenCharacters.some(char => folderName.includes(char));
        const isTooLong = folderName.length > 50;
        const isEmpty = folderName.trim().length === 0;

        if (isForbidden) {
            throw new Error('Folder name contains forbidden characters');
        }

        if (isTooLong) {
            throw new Error('Folder name is too long');
        }

        if (isEmpty) {
            throw new Error('Folder name cannot be empty');
        }
    };

    // async function createFolderLessons(newFolderNameLesson, nextFolderid) {
    //     //типа создание папки в папке задание 
    //     const request = {
    //         name: newFolderNameLesson,
    //         folderId: nextFolderid
    //     };
    //     const request2 = {
    //         folderId: 1
    //     };

    //     try {
    //         validateFolderName(newFolderNameLesson);
    //         const response = await apiFiles.newFolderLesson(request);
    //         const data = response.data.message[0];

    //         const response2 = await apiFiles.getList(request2);
    //         setFiles(response2.data.message)
    //         // console.log(data)
    //         // setFiles(prevFiles => {
    //         //   const newFolder = {
    //         //     id: data.id,
    //         //     name: data.name,
    //         //     files: [],
    //         //     folders: []
    //         //   };
    //         //   return { ...prevFiles, folders: [...prevFiles.folders, newFolder] };
    //         // });

    //     } catch (error) {
    //         console.error(error);
    //         console.error('ERROR DOWNLOAD FILE');
    //         toast.error('Ошибка при создании папки. Проверьте правильность названия и попробуйте еще раз');
    //     }
    // }

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

    // async function deleteFolderLessons(newfolderId) {
    //     const request = {
    //         folderId: newfolderId
    //     };
    //     const request2 = {
    //         folderId: 1
    //     };

    //     const confirmed = window.confirm('Вы точно хотите удалить выбранную папку ? Все находящиеся там файлы будут удалены !!');

    //     if (!confirmed) {
    //         return;
    //     }
    //     try {
    //         const response = await apiFiles.deleteFolderLessonApi(request);
    //         const deletedFolderId = response.data.message[0]; // get the ID of the deleted folder

    //         // create a new object with the modified state
    //         // const updatedFiles = {...files, folders: files.folders.filter(folder => folder.id !== request)};

    //         // update the state using the setter function
    //         // setFiles(updatedFiles);

    //         const response2 = await apiFiles.getList(request2);
    //         setFiles(response2.data.message)

    //         // КОСТЫЛЬ ПОТОМ ЗАМАЖ ИЛИ ПОМЕНЯЙ ЕСЛИ СМОЖЕШЬ НО РАБОТАЕТ

    //     } catch (error) {
    //         console.error(error);
    //         console.error('ERROR DOWNLOAD FILE');
    //         toast.error('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
    //     }
    // }

    // async function uploadFilesLesson(file, newfolderId) {
    //     const requestFolder = newfolderId;
    //     const fileTypes = {
    //         'txt': 1,
    //         'xlsx': 2,
    //         'docx': 3,
    //     };
    //     const request2 = {
    //         folderId: 1
    //     };
    //     const request = new FormData();
    //     request.append('folderId', requestFolder)
    //     request.append('files', file[0])
    //     request.append('fileType', fileTypes[file[0].name.split('.').pop()])
    //     try {

    //         const response = await apiFiles.upload(request);
    //         const data = response.data.message[0];
    //         const response2 = await apiFiles.getList(request2);
    //         setFiles(response2.data.message)
    //         //крч смотри на то что ты закидываешь в стейт, там объект приходит с бека и ты создал стейт с пустым массивом, и пытался передать в стейт массив, поменяли на объект снизу и вроде работает.
    //         // setFiles(prevFiles => ({ ...prevFiles, files: [...prevFiles.files, data] }));
    //         //ВАЖНО ЗАПОМНИ
    //         console.log(data)
    //     } catch (error) {
    //         console.error(error);
    //         console.error('ERROR UPLOAD FILES');
    //         toast.error('Произошла ошибка при загрузке файла. Попробуйте позже или обратитесь в техподдержку');
    //     }
    // }

    const handleDataChange = (newData) => {
        setFiles(newData);
    };

    console.log(files)
    return (
        <>

            <div className='folder_create_block'>
                <div>

                    {/* <div className='createFolderBlock'>
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

                    </div> */}
                </div>
                {/* <div className='Lexa'>
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
                </div> */}
            </div>




            {/* <div>Текущий номер папки: {currentFolderId}</div> */}
            <div>Название текущей папки: {currentFolderName}</div>

            <div className="new_select_block">
                {/* <select className="select_block" value={newGroups} onChange={handleGroupChange}>
                    <option value="">Выберите группу</option>
                    {groups.map((grp) => (
                        <option key={grp.id} value={grp.id}>
                            {grp.code} {grp.groupName} {grp.type}
                        </option>
                    ))}
                </select> */}
                <Select
                    className="new_select_subblock"
                    onChange={handleGroupChange}
                    options={[
                        { value: "", label: "Выберите группу" },
                        ...groups.map((grp) => ({
                            value: grp.id,
                            label: `${grp.code} ${grp.groupName} ${grp.type}`,
                        })),
                    ]}
                    placeholder="Выберите группу"
                />
                <Select
                className="new_select_subblock"
                    onChange={(selectedOption) => {
                        setNewStudents2(selectedOption.value);
                        handleStudentChange(selectedOption); // Call the function here
                    }}
                    options={[
                        { value: 0, label: "Выберите студента" },
                        ...students.map((std) => ({ value: std.id, label: std.fio })),
                    ]}
                    placeholder="Выберите студента"
                />

                {/* <select className="select_block" value={newStudents2} onChange={(e) => {
                    setNewStudents2(e.value);
                    handleStudentChange(e); // Call the function here
                }}>
                    <option value={0}>Выберите студента</option>
                    {students.map((std) => (
                        <option key={std.id} value={std.id}>
                            {std.fio}
                        </option>
                    ))}
                </select> */}
            </div>

            {/* <div className="folder_row">
        <Folder {...files} onDataChanged={handleDataChange} path={files.id} onFolderSelect={handleFolderSelect} onFolderName={handleFolderSelectName} selectedFolderId={currentFolderId} depth={1} />
      </div> */}

            {/* <div className="folder_row">
                {njes.message.map((folder) => (
                    <Folder key={folder.id} {...folder} onDataChanged={handleDataChange} path={files.id} onFolderSelect={handleFolderSelect} onFolderName={handleFolderSelectName} selectedFolderId={currentFolderId} depth={1} />
                ))}
            </div> */}

            <div>
                {showFolders && (
                    <div className="folder_row">
                        {Array.isArray(files) &&
                            files.map((folder) => (
                                <Folder
                                    key={folder.id}
                                    {...folder}
                                    onDataChanged={handleDataChange}
                                    path={files.id}
                                    onFolderSelect={handleFolderSelect}
                                    onFolderName={handleFolderSelectName}
                                    selectedFolderId={currentFolderId}
                                    depth={1}
                                />
                            ))}
                    </div>
                )}
            </div>

            {/* <div className="folder_row">
                {files.message.map((folder) => (
                    <Folder key={folder.id} {...folder} onDataChanged={handleDataChange} path={files.id} onFolderSelect={handleFolderSelect} onFolderName={handleFolderSelectName} selectedFolderId={currentFolderId} depth={1} />
                ))}
            </div>; */}
        </>
    );
}

function AllFiles() {

    return (
        <div className='ffff'>
            <AllRow></AllRow>
        </div>

    )
}
export default AllFiles;
