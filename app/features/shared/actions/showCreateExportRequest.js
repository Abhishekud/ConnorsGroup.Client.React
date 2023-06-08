export const SHOW_CREATE_EXPORT_REQUEST = 'SHOW_CREATE_EXPORT_REQUEST';

export function showCreateExportRequest(filters, timeFormat, selectedIds, exportFormat) {
  return {
    type: SHOW_CREATE_EXPORT_REQUEST,
    payload: {filters, timeFormat, selectedIds, exportFormat},
  };
}
