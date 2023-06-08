import {http} from '../../shared/services';
import {toExportUrl} from '../constants/dataSources';
export const CREATE_LOCATION_STANDARDS_EXPORT_REQUEST_FOR_VDV_SETS_BACKGROUND_JOB = 'CREATE_LOCATION_STANDARDS_EXPORT_REQUEST_FOR_VDV_SETS_BACKGROUND_JOB';
export const CREATE_LOCATION_STANDARDS_EXPORT_REQUEST_FOR_VDV_SETS_BACKGROUND_JOB_PENDING = `${CREATE_LOCATION_STANDARDS_EXPORT_REQUEST_FOR_VDV_SETS_BACKGROUND_JOB}_PENDING`;
export const CREATE_LOCATION_STANDARDS_EXPORT_REQUEST_FOR_VDV_SETS_BACKGROUND_JOB_FULFILLED = `${CREATE_LOCATION_STANDARDS_EXPORT_REQUEST_FOR_VDV_SETS_BACKGROUND_JOB}_FULFILLED`;
export const CREATE_LOCATION_STANDARDS_EXPORT_REQUEST_FOR_VDV_SETS_BACKGROUND_JOB_REJECTED = `${CREATE_LOCATION_STANDARDS_EXPORT_REQUEST_FOR_VDV_SETS_BACKGROUND_JOB}_REJECTED`;

export function createLocationStandardsExportRequestForVDVSetsBackgroundJob(dataSource, exportRequestId) {
  return {
    type: CREATE_LOCATION_STANDARDS_EXPORT_REQUEST_FOR_VDV_SETS_BACKGROUND_JOB,
    payload: http.get(`${toExportUrl(dataSource)}${exportRequestId}`),
  };
}
