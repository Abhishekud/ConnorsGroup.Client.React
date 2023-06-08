import axios from 'axios';

export default function (requestId, setDownloadStatus) {
  axios.get(
    `${process.env.API_BASE_URL}export-requests/download/${requestId}`,
    {
      responseType: 'blob',
      withCredentials: process.env.NODE_ENV !== 'production',
    }
  )
    .then(response => {
      if (response.status === 200) {
        const blobData = [response.data];
        const blob = new Blob(blobData, {type: 'application/octet-stream'});
        let filename = 'download-request.zip';
        if (response.headers['content-disposition'] !== 'undefined') {
          const headerLine = response.headers['content-disposition'];
          filename = headerLine.substring(headerLine.indexOf('filename=') + 9).replace(/"/g, '');
        }
        const blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);
        /// below code is for safari fixes
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank');
        }

        document.body.appendChild(tempLink);
        tempLink.click();

        // Fixes "webkit blob resource error 1"
        setTimeout(() => {
          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(blobURL);

          setDownloadStatus(response.status);
        }, 200);
      } else {
        setDownloadStatus(response.status);
      }
    }).catch(e => {
      console.log(e.response.status);
      setDownloadStatus(e.response.status);
    });
}
