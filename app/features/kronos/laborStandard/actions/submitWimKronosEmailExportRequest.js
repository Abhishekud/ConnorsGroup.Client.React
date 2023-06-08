import {http} from '../../../shared/services';

export const SUBMIT_WIM_KRONOS_EMAIL_EXPORT_REQUEST = 'SUBMIT_WIM_KRONOS_EMAIL_EXPORT_REQUEST';
export const SUBMIT_WIM_KRONOS_EMAIL_EXPORT_REQUEST_PENDING = `${SUBMIT_WIM_KRONOS_EMAIL_EXPORT_REQUEST}_PENDING`;
export const SUBMIT_WIM_KRONOS_EMAIL_EXPORT_REQUEST_FULFILLED = `${SUBMIT_WIM_KRONOS_EMAIL_EXPORT_REQUEST}_FULFILLED`;
export const SUBMIT_WIM_KRONOS_EMAIL_EXPORT_REQUEST_REJECTED = `${SUBMIT_WIM_KRONOS_EMAIL_EXPORT_REQUEST}_REJECTED`;

export function submitWimKronosEmailExportRequest(laborStandardIds, filter, allStandardsSelected) {
  return {
    type: SUBMIT_WIM_KRONOS_EMAIL_EXPORT_REQUEST,
    payload: http.post('kronos/wim-kronos-export-request', {laborStandardIds, filter, allStandardsSelected}),
  };
}
