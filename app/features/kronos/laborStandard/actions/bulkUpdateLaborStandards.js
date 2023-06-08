import {http} from '../../../shared/services';

export const BULK_UPDATE_LABOR_STANDARDS = 'BULK_UPDATE_KRONOS_LABOR_STANDARDS';
export const BULK_UPDATE_LABOR_STANDARDS_PENDING = `${BULK_UPDATE_LABOR_STANDARDS}_PENDING`;
export const BULK_UPDATE_LABOR_STANDARDS_FULFILLED = `${BULK_UPDATE_LABOR_STANDARDS}_FULFILLED`;
export const BULK_UPDATE_LABOR_STANDARDS_REJECTED = `${BULK_UPDATE_LABOR_STANDARDS}_REJECTED`;

export function bulkUpdateLaborStandards(selectedIds, modelData, filters, allStandardsSelected) {
  const model = modelData.toJS();
  model.filters = filters;
  model.allStandardsSelected = allStandardsSelected;
  model.selectedLaborStandardIds = selectedIds;
  return {
    type: BULK_UPDATE_LABOR_STANDARDS,
    payload: http.post('kronos/laborstandard/bulk-update', model),
  };
}
