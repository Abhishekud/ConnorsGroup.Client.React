export const SHOW_BULK_DELETE_LOCATION = 'SHOW_BULK_DELETE_LOCATION';

export function showBulkDeleteLocation(id) {
  return {
    type: SHOW_BULK_DELETE_LOCATION,
    payload: id,
  };
}
