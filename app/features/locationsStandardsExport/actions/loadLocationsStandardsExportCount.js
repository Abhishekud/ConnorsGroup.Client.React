import {http} from '../../shared/services';
import {toCountUrl} from '../constants/DataSources';

export const LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT = 'LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT';
export const LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT_PENDING = `${LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT}_PENDING`;
export const LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT_FULFILLED = `${LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT}_FULFILLED`;
export const LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT_REJECTED = `${LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT}_REJECTED`;

const DEVELOPMENT_COUNT_URL = '/locations-standards-export/development/list/count';
export function loadLocationsStandardsExportCount(filters) {
  return {
    type: LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT,
    payload: http.post(DEVELOPMENT_COUNT_URL, filters),
  };
}

export function loadContinuousLaborCalculationLocationsStandardsExportCount(dataSource, filters) {
  return {
    type: LOAD_LOCATIONS_STANDARDS_EXPORT_COUNT,
    payload: http.post(toCountUrl(dataSource), filters),
  };
}
