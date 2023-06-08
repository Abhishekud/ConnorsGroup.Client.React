import {http} from '../../shared/services';
import {toExportStandardsAndVolumeDriversByLocationsUrls} from '../constants/DataSources';

export const CREATE_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST_BACKGROUND_JOB = 'CREATE_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST_BACKGROUND_JOB';
export const CREATE_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST_BACKGROUND_JOB_PENDING = `${CREATE_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST_BACKGROUND_JOB}_PENDING`;
export const CREATE_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST_BACKGROUND_JOB_FULFILLED = `${CREATE_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST_BACKGROUND_JOB}_FULFILLED`;
export const CREATE_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST_BACKGROUND_JOB_REJECTED = `${CREATE_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST_BACKGROUND_JOB}_REJECTED`;

export function createExportStandardsAndVolumeDriversByLocationsRequestBackgroundJob(dataSource, exportRequestId) {
  return {
    type: CREATE_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST_BACKGROUND_JOB,
    payload: http.get(`${toExportStandardsAndVolumeDriversByLocationsUrls(dataSource)}${exportRequestId}`),
  };

}
