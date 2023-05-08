function downloadFiles(data, filename, type) {
    const blob = new Blob([ data ], { type: type || 'application/octet-stream' });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE doesn't allow using a blob object directly as link href.
        // Workaround for "HTML7007: One or more blob URLs were
        // revoked by closing the blob for which they were created.
        // These URLs will no longer resolve as the data backing
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
        return;
    }

    const urlData = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = urlData;
    link.setAttribute('download', filename);

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof link.download === 'undefined') {
        link.setAttribute('target', '_blank');
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(urlData);
    }, 100);
}

function downloadFilesBase64(data, filename) {
    console.log('1', data)
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${ data }`;
    link.setAttribute('download', filename);

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof link.download === 'undefined') {
        link.setAttribute('target', '_blank');
    }

    console.log('2', data)

    document.body.appendChild(link);
    link.click();
    // document.body.removeChild(link);

    console.log('3', data)
}


export default {
    downloadFiles:       downloadFiles,
    downloadFilesBase64: downloadFilesBase64,
};
