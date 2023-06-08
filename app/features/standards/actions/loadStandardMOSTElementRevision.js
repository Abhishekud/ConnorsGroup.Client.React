import {http} from '../../shared/services';

export const LOAD_STANDARD_MOST_ELEMENT_REVISION = 'LOAD_STANDARD_MOST_ELEMENT_REVISION';
export const LOAD_STANDARD_MOST_ELEMENT_REVISION_REJECTED = `${LOAD_STANDARD_MOST_ELEMENT_REVISION}_REJECTED`;
export const LOAD_STANDARD_MOST_ELEMENT_REVISION_PENDING = `${LOAD_STANDARD_MOST_ELEMENT_REVISION}_PENDING`;
export const LOAD_STANDARD_MOST_ELEMENT_REVISION_FULFILLED = `${LOAD_STANDARD_MOST_ELEMENT_REVISION}_FULFILLED`;

export function loadStandardMOSTElementRevision(standardId, revision, standardElementId) {
  return {
    type: LOAD_STANDARD_MOST_ELEMENT_REVISION,
    payload: http.get(`standards/${standardId}/elements/most/${standardElementId}/revision/${revision}`),
  };
}
