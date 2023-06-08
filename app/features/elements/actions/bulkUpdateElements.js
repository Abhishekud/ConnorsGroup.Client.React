import {http} from '../../shared/services';

export const BULK_UPDATE_ELEMENTS = 'BULK_UPDATE_ELEMENTS';
export const BULK_UPDATE_ELEMENTS_REJECTED = `${BULK_UPDATE_ELEMENTS}_REJECTED`;
export const BULK_UPDATE_ELEMENTS_PENDING = `${BULK_UPDATE_ELEMENTS}_PENDING`;
export const BULK_UPDATE_ELEMENTS_FULFILLED = `${BULK_UPDATE_ELEMENTS}_FULFILLED`;

export function bulkUpdateElements(modelData, selectedIds) {
  const model = {...modelData.toJS(), selectedIds};
  return {
    type: BULK_UPDATE_ELEMENTS,
    payload: http.post('elements/bulk-update', model),
  };
}
