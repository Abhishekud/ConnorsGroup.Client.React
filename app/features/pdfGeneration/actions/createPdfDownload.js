import {http} from '../../shared/services';

const CREATE_PDF_DOWNLOAD = 'CREATE_PDF_DOWNLOAD';
export const CREATE_PDF_DOWNLOAD_FULFILLED = `${CREATE_PDF_DOWNLOAD}_FULFILLED`;
export const CREATE_PDF_DOWNLOAD_REJECTED = `${CREATE_PDF_DOWNLOAD}_REJECTED`;

export function createPdfDownload(fileName, pdfBuffer) {
  return {
    type: CREATE_PDF_DOWNLOAD,
    payload: http.post('pdf-generation/create-download', {fileName, pdf: pdfBuffer}),
  };
}
