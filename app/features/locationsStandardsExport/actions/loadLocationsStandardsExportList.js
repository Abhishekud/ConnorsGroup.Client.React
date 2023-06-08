import {http} from '../../shared/services';
import {toUrl} from '../constants/DataSources';

export const LOAD_LOCATIONS_STANDARDS_EXPORT_LIST = 'LOAD_LOCATIONS_STANDARDS_EXPORT_LIST';
export const LOAD_LOCATIONS_STANDARDS_EXPORT_LIST_PENDING = `${LOAD_LOCATIONS_STANDARDS_EXPORT_LIST}_PENDING`;
export const LOAD_LOCATIONS_STANDARDS_EXPORT_LIST_FULFILLED = `${LOAD_LOCATIONS_STANDARDS_EXPORT_LIST}_FULFILLED`;
export const LOAD_LOCATIONS_STANDARDS_EXPORT_LIST_REJECTED = `${LOAD_LOCATIONS_STANDARDS_EXPORT_LIST}_REJECTED`;

const DEVELOPMENT_URL = 'locations-standards-export/development/list';
export function loadLocationsStandardsExportList(filters) {
  return {
    type: LOAD_LOCATIONS_STANDARDS_EXPORT_LIST,
    payload: http.post(DEVELOPMENT_URL, filters),
  };
}

export function loadContinuousLaborCalculationLocationsStandardsExportList(dataSource, filters) {
  return {
    type: LOAD_LOCATIONS_STANDARDS_EXPORT_LIST,
    payload: http.post(toUrl(dataSource), filters),
  };
}
