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
  
    const indentation = depth * 10; // 10 pixels per level
  
    return (
      <div style={{ marginLeft: `${depth * 4}px` }}>
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
                {files.map(file => (
                  <li key={file.id}>
                    <div className='file_block'>
                      <div className='file_block_components'>
                        <img src={filelogo} style={{ width: '30px', height: '30px' }} />
                      </div>
  
                      {/* <div className='file_block_components'>Номер = {file.id}</div> */}
                      <div className='file_block_components'>
                        {file.fileMeta.fileName}
                      </div>
  
                      <div className='file_block_components'>
                        <button className='button_delete_file' onClick={() => deleteFiles(file.id)}>Удалить</button>
                        <button className='button_upload' onClick={() => downloadFile(file.id)}>Скачать</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
  
            )}
          </>
        )}
      </div>
    );

  }
