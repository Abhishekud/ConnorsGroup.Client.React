import {http} from '../../shared/services';

export const CREATE_EXPORT_REQUEST = 'CREATE_EXPORT_REQUEST';
export const CREATE_EXPORT_REQUEST_PENDING = `${CREATE_EXPORT_REQUEST}_PENDING`;
export const CREATE_EXPORT_REQUEST_FULFILLED = `${CREATE_EXPORT_REQUEST}_FULFILLED`;
export const CREATE_EXPORT_REQUEST_REJECTED = `${CREATE_EXPORT_REQUEST}_REJECTED`;

export function createExportRequest(model) {
  return {
    type: CREATE_EXPORT_REQUEST,
    payload: http.post('export-requests', model),
  };
}
