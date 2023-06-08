import {http} from '../../shared/services';

export const BULK_DELETE_SELECTED_STANDARD_ITEMS = 'BULK_DELETE_SELECTED_STANDARD_ITEMS';
export const BULK_DELETE_SELECTED_STANDARD_ITEMS_PENDING = `${BULK_DELETE_SELECTED_STANDARD_ITEMS}_PENDING`;
export const BULK_DELETE_SELECTED_STANDARD_ITEMS_FULFILLED = `${BULK_DELETE_SELECTED_STANDARD_ITEMS}_FULFILLED`;
export const BULK_DELETE_SELECTED_STANDARD_ITEMS_REJECTED = `${BULK_DELETE_SELECTED_STANDARD_ITEMS}_REJECTED`;

export function bulkDeleteSelectedStandardItems(standardId, selectedElementIds, selectedStandardElementGroupIds) {
  const model = {selectedElementIds, selectedStandardElementGroupIds};
  return {
    type: BULK_DELETE_SELECTED_STANDARD_ITEMS,
    payload: http.post(`standards/${standardId}/items/bulk-delete`, model),
  };
}
