import {http} from '../../shared/services';

export const DELETE_STANDARDS = 'DELETE_STANDARDS';
export const DELETE_STANDARDS_PENDING = `${DELETE_STANDARDS}_PENDING`;
export const DELETE_STANDARDS_FULFILLED = `${DELETE_STANDARDS}_FULFILLED`;
export const DELETE_STANDARDS_REJECTED = `${DELETE_STANDARDS}_REJECTED`;

export function deleteStandards(standardIds) {
  const model = {standardIds};
  return {
    type: DELETE_STANDARDS,
    payload: http.post('standards/delete', model),
  };
}
