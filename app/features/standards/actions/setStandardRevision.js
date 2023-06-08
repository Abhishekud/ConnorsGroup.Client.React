import {http} from '../../shared/services';

export const SET_STANDARD_REVISION = 'SET_STANDARD_REVISION';
export const SET_STANDARD_REVISION_PENDING = `${SET_STANDARD_REVISION}_PENDING`;
export const SET_STANDARD_REVISION_FULFILLED = `${SET_STANDARD_REVISION}_FULFILLED`;
export const SET_STANDARD_REVISION_REJECTED = `${SET_STANDARD_REVISION}_REJECTED`;

export function setStandardRevision(id, revisionNumber) {
  return {
    type: SET_STANDARD_REVISION,
    payload: http.put(`standards/${id}/set-revision/${revisionNumber}`),
  };
}
