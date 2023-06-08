import {http} from '../../shared/services';

export const LOAD_STANDARD_REVISION = 'LOAD_STANDARD_REVISION';
export const LOAD_STANDARD_REVISION_PENDING = `${LOAD_STANDARD_REVISION}_PENDING`;
export const LOAD_STANDARD_REVISION_FULFILLED = `${LOAD_STANDARD_REVISION}_FULFILLED`;
export const LOAD_STANDARD_REVISION_REJECTED = `${LOAD_STANDARD_REVISION}_REJECTED`;

export function loadStandardRevision(id, revision) {
  return {
    type: LOAD_STANDARD_REVISION,
    payload: http.get(`standards/${id}/revision/${revision}`),
  };
}
