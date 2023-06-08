import {http} from '../../shared/services';
import {toExportUrl} from '../constants/DataSources';

export const EXPORT_LOCATION_STANDARDS_TO_TUMBLEWEED = 'EXPORT_LOCATION_STANDARDS_TO_TUMBLEWEED';
export const EXPORT_LOCATION_STANDARDS_TO_TUMBLEWEED_PENDING = `${EXPORT_LOCATION_STANDARDS_TO_TUMBLEWEED}_PENDING`;
export const EXPORT_LOCATION_STANDARDS_TO_TUMBLEWEED_FULFILLED = `${EXPORT_LOCATION_STANDARDS_TO_TUMBLEWEED}_FULFILLED`;
export const EXPORT_LOCATION_STANDARDS_TO_TUMBLEWEED_REJECTED = `${EXPORT_LOCATION_STANDARDS_TO_TUMBLEWEED}_REJECTED`;

export function exportLocationsStandardsToTumbleweed(dataSource, filters) {
  return {
    type: EXPORT_LOCATION_STANDARDS_TO_TUMBLEWEED,
    payload: http.post(`${toExportUrl(dataSource)}tumbleweed`, {filters: JSON.stringify(filters || {})}),
  };
}
