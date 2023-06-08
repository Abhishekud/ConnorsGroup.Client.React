import {http} from '../../shared/services';

export const CREATE_STANDARD_REVISION = 'CREATE_STANDARD_REVISION';
export const CREATE_STANDARD_REVISION_PENDING = `${CREATE_STANDARD_REVISION}_PENDING`;
export const CREATE_STANDARD_REVISION_FULFILLED = `${CREATE_STANDARD_REVISION}_FULFILLED`;
export const CREATE_STANDARD_REVISION_REJECTED = `${CREATE_STANDARD_REVISION}_REJECTED`;

export function createStandardRevision(id) {
  return {
    type: CREATE_STANDARD_REVISION,
    payload: http.post(`standards/${id}/create-revision`),
  };
}
