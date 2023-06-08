import {http} from '../../shared/services';

export const BULK_UPDATE_STANDARD_ELEMENTS = 'BULK_UPDATE_STANDARD_ELEMENTS_TO_STANDARD';
export const BULK_UPDATE_STANDARD_ELEMENTS_REJECTED = `${BULK_UPDATE_STANDARD_ELEMENTS}_REJECTED`;
export const BULK_UPDATE_STANDARD_ELEMENTS_PENDING = `${BULK_UPDATE_STANDARD_ELEMENTS}_PENDING`;
export const BULK_UPDATE_STANDARD_ELEMENTS_FULFILLED = `${BULK_UPDATE_STANDARD_ELEMENTS}_FULFILLED`;

export function bulkUpdateStandardElements(standardId, modelData, ids) {
  const model = {...modelData.toJS(), selectedIds: ids};
  return {
    type: BULK_UPDATE_STANDARD_ELEMENTS,
    payload: http.post(`standards/bulk-update/${standardId}`, model),
  };
}
