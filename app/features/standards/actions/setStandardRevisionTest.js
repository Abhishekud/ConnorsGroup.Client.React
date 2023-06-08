import {http} from '../../shared/services';

export const SET_STANDARD_REVISION_TEST = 'SET_STANDARD_REVISION_TEST';

export function setStandardRevisionTest(id, revisionNumber) {
  return {
    type: SET_STANDARD_REVISION_TEST,
    payload: http.put(`standards/${id}/set-revision/${revisionNumber}/test`),
  };
}
