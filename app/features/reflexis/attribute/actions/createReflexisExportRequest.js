import {http} from '../../../shared/services';

export const CREATE_REFLEXIS_EXPORT_REQUEST = 'REFLEXIS/ATTRIBUTES/CREATE_REFLEXIS_EXPORT_REQUEST';
export const CREATE_REFLEXIS_EXPORT_REQUEST_PENDING = `${CREATE_REFLEXIS_EXPORT_REQUEST}_PENDING`;
export const CREATE_REFLEXIS_EXPORT_REQUEST_FULFILLED = `${CREATE_REFLEXIS_EXPORT_REQUEST}_FULFILLED`;
export const CREATE_REFLEXIS_EXPORT_REQUEST_REJECTED = `${CREATE_REFLEXIS_EXPORT_REQUEST}_REJECTED`;

export function createReflexisExportRequest(exportRequestId) {
  return {
    type: CREATE_REFLEXIS_EXPORT_REQUEST,
    payload: http.get(`reflexis/attributes/export/om06/${exportRequestId}`),
  };
}
