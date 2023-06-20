import React, { useState } from 'react';
import folderClosed from '../../img/folderClose.png';
import filelogo from '../../img/file.png';
import folderOpen from '../../img/icon_nb.png';
import './LessonRow.css';
import file_downloader from '../../scripts/file_downloader';
import { useEffect } from "react";
import apiFiles from "../../api/files";
import apiSchedule from '../../api/schedule';
import { toast } from "react-toastify";
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

}



function AllRow() {

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


    const [showFolders, setShowFolders] = useState(false);

    useEffect(async () => {

        try {
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

    const [students, setStudents] = useState([]);
    const [newStudents2, setNewStudents2] = useState(0);
    const [groups, setGroups] = useState([]);
    const [newGroups, setNewGroups] = useState([]);

    const fetchStudents = async (groupId) => {
        try {
            const response = await apiSchedule.certainGroups(groupId);
             
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
             
            setFiles(response.data.message);

            const filteredFolders = response.data.message.filter((folder) => folder.userId === userId);
             
            setFiles(filteredFolders);
        }
    };


    const handleDataChange = (newData) => {
        setFiles(newData);
    };

     
    return (
        <>
            <div>Название текущей папки: {currentFolderName}</div>
            <div className="new_select_block">
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
            </div>

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
