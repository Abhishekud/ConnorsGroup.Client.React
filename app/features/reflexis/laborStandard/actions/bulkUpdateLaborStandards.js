import {http} from '../../../shared/services';

export const BULK_UPDATE_LABOR_STANDARDS = 'REFLEXIS/LABOR_STANDARDS/BULK_UPDATE_LABOR_STANDARDS';
export const BULK_UPDATE_LABOR_STANDARDS_PENDING = `${BULK_UPDATE_LABOR_STANDARDS}_PENDING`;
export const BULK_UPDATE_LABOR_STANDARDS_FULFILLED = `${BULK_UPDATE_LABOR_STANDARDS}_FULFILLED`;
export const BULK_UPDATE_LABOR_STANDARDS_REJECTED = `${BULK_UPDATE_LABOR_STANDARDS}_REJECTED`;

export function bulkUpdateLaborStandards(ids, modelData, filter, allLaborStandardsSelected) {
  const selectedLaborStandardIds = ids.keySeq().toArray();
  return {
    type: BULK_UPDATE_LABOR_STANDARDS,
    payload: http.put('reflexis/labor-standards/bulk-update', {filter, allLaborStandardsSelected, selectedLaborStandardIds, ...modelData.toJS()}),
  };
}


