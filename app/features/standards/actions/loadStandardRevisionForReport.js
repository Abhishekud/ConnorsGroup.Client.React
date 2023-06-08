import {http} from '../../shared/services';

export const LOAD_STANDARD_FOR_REPORT = 'LOAD_STANDARD_FOR_REPORT';
export const LOAD_STANDARD_FOR_REPORT_PENDING = `${LOAD_STANDARD_FOR_REPORT}_PENDING`;
export const LOAD_STANDARD_FOR_REPORT_FULFILLED = `${LOAD_STANDARD_FOR_REPORT}_FULFILLED`;
export const LOAD_STANDARD_FOR_REPORT_REJECTED = `${LOAD_STANDARD_FOR_REPORT}_REJECTED`;

export function loadStandardRevisionForReport(id, revision) {
  return {
    type: LOAD_STANDARD_FOR_REPORT,
    payload: http.get(`standards/for-report/${id}/revision/${revision}`),
  };
}
