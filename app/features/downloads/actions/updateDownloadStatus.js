export const UPDATE_DOWNLOAD_STATUS_VALUE = 'UPDATE_DOWNLOAD_STATUS_VALUE';

export function updateDownloadStatus(statutText) {
  return {
    type: UPDATE_DOWNLOAD_STATUS_VALUE,
    payload: statutText,
  };
}
