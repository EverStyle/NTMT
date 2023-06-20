
// пометки че нада пофиксить, заебался забывать
// 
// 


function downloadFiles(data, filename, type) {
    const blob = new Blob([ data ], { type: type || 'application/octet-stream' });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename);
        return;
    }
    const urlData = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urlData;
    link.setAttribute('download', filename);
    if (typeof link.download === 'undefined') {
        link.setAttribute('target', '_blank');
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
        window.URL.revokeObjectURL(urlData);
    }, 100);
}

function downloadFilesBase64(data, filename) {
     
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${ data }`;
    link.setAttribute('download', filename);
    if (typeof link.download === 'undefined') {
        link.setAttribute('target', '_blank');
    }
     
    document.body.appendChild(link);
    link.click();
     
}
export default {
    downloadFiles:       downloadFiles,
    downloadFilesBase64: downloadFilesBase64,
};


import file_downloader from '../../scripts/file_downloader';
async function downloadFile(index) {
    const request = {
      fileId: files[index].id,
    };
     
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

  
  jest.mock('./apiRecordBook', () => ({
  get: jest.fn().mockResolvedValue({ data: { message: 'mockedUserRecordData' } }),
}));
jest.mock('./toast', () => ({
  error: jest.fn(),
}));
test('uploadStudents should fetch and set user records', async () => {
  await uploadStudents(123);
  expect(apiRecordBook.get).toHaveBeenCalledWith({ userId: 123 });
  expect(setUserRecord).toHaveBeenCalledWith('mockedUserRecordData');
  expect(toast.error).not.toHaveBeenCalled();
});
test('uploadStudents should handle errors', async () => {
  apiRecordBook.get.mockRejectedValue(new Error('API error'));
  await uploadStudents(123);
  expect(console.error).toHaveBeenCalledWith(new Error('API error'));
  expect(console.error).toHaveBeenCalledWith('ERROR DOWNLOAD FILE');
  expect(toast.error).toHaveBeenCalledWith('Произошла ошибка при скачивании файла. Попробуйте позже или обратитесь в техподдержку');
});