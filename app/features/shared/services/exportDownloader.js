/**
 * Description:  This service accepts download URL and downloads the export file,
 * with the filename extracted from the response headers, if at
 * all there were any exception during this process, the same will be handled and reported.
 * @param {*} url - file url to download.
 */

import {toastr} from '.';
import axios from 'axios';

export default function (url) {
  axios.get(url,
    {
      responseType: 'blob',
      withCredentials: process.env.NODE_ENV !== 'production',
    })
    .then(response => {
      // Default filename incase we do not get it from the headers
      let filename = 'Download.csv';
      if (response.headers['content-disposition'] && response.headers['content-disposition'] !== 'undefined') {
        const headerLine = response.headers['content-disposition'];
        filename = headerLine.substring(headerLine.indexOf('filename=') + 9).replace(/"/g, '');
      }
      const blobURL = window.URL.createObjectURL(response.data);
      const tempLink = document.createElement('a');
      tempLink.href = blobURL;
      tempLink.setAttribute('download', filename);
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    })
    .catch(error => {
      if (error.response.data) {
        const blob = Promise.resolve(error.response.data.text());
        blob.then(err => toastr.error(JSON.parse(err).exceptionMessage));
      }
    });
}
