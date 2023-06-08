import {http} from '../../shared/services';

export const DELETE_STANDARD_REVISIONS = 'DELETE_STANDARD_REVISIONS';
export const DELETE_STANDARD_REVISIONS_PENDING = `${DELETE_STANDARD_REVISIONS}_PENDING`;
export const DELETE_STANDARD_REVISIONS_FULFILLED = `${DELETE_STANDARD_REVISIONS}_FULFILLED`;
export const DELETE_STANDARD_REVISIONS_REJECTED = `${DELETE_STANDARD_REVISIONS}_REJECTED`;

export function deleteStandardRevisions(model) {
  return {
    type: DELETE_STANDARD_REVISIONS,
    payload: http.post('standards/delete-standard-revisions', model),
  };
}
