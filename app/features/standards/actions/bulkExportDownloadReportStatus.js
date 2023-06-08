export const UPDATE_BULK_EXPORT_DOWNLOAD_STATUS_VALUE = 'UPDATE_BULK_EXPORT_DOWNLOAD_STATUS_VALUE';

export function bulkExportDownloadReportStatus(statutText) {
  return {
    type: UPDATE_BULK_EXPORT_DOWNLOAD_STATUS_VALUE,
    payload: statutText,
  };
}
