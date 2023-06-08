import {http} from '../../shared/services';

export const BULK_UPDATE_STANDARDS = 'BULK_UPDATE_STANDARDS';
export const BULK_UPDATE_STANDARDS_REJECTED = `${BULK_UPDATE_STANDARDS}_REJECTED`;
export const BULK_UPDATE_STANDARDS_PENDING = `${BULK_UPDATE_STANDARDS}_PENDING`;
export const BULK_UPDATE_STANDARDS_FULFILLED = `${BULK_UPDATE_STANDARDS}_FULFILLED`;

export function bulkUpdateStandards(standardId, modelData, ids) {
  const model = {...modelData.toJS(), selectedIds: ids};
  return {
    type: BULK_UPDATE_STANDARDS,
    payload: http.post('standards/bulk-update', model),
  };
}
