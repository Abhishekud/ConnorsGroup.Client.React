import {http} from '../../shared/services';

export const BULK_PASTE_STANDARD_ITEMS = 'BULK_PASTE_STANDARD_ITEMS';
export const BULK_PASTE_STANDARD_ITEMS_PENDING = `${BULK_PASTE_STANDARD_ITEMS}_PENDING`;
export const BULK_PASTE_STANDARD_ITEMS_FULFILLED = `${BULK_PASTE_STANDARD_ITEMS}_FULFILLED`;
export const BULK_PASTE_STANDARD_ITEMS_REJECTED = `${BULK_PASTE_STANDARD_ITEMS}_REJECTED`;

export function bulkPasteStandardItems(copiedStandardItemsModelFromClipboard) {
  return {
    type: BULK_PASTE_STANDARD_ITEMS,
    payload: http.post('standards/paste-bulk-standard-element-and-group', copiedStandardItemsModelFromClipboard),
  };
}
