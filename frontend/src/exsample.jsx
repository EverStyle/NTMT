
// пометки че нада пофиксить, заебался забывать
// 
// 
// обновление зачетки сделай через 3 грид фрейм
// короче сделай файлы как в винде без границ белым цветом чтобы при наводе подсвечивались серым и
// и еще сделай везде квадратный полупрозрачный стиль блоков как в селекторах
// так как антон убрал админов и преподов из групп сделай их в 2 отдельных селектора

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
    console.log('1', data)
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${ data }`;
    link.setAttribute('download', filename);
    if (typeof link.download === 'undefined') {
        link.setAttribute('target', '_blank');
    }
    console.log('2', data)
    document.body.appendChild(link);
    link.click();
    console.log('3', data)
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