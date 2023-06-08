import http from '../../shared/services/http';

export const LOAD_INDUSTRY_TYPICAL_ALLOWANCE = 'LOAD_INDUSTRY_TYPICAL_ALLOWANCE';
export const LOAD_INDUSTRY_TYPICAL_ALLOWANCE_PENDING = `${LOAD_INDUSTRY_TYPICAL_ALLOWANCE}_PENDING`;
export const LOAD_INDUSTRY_TYPICAL_ALLOWANCE_FULFILLED = `${LOAD_INDUSTRY_TYPICAL_ALLOWANCE}_FULFILLED`;
export const LOAD_INDUSTRY_TYPICAL_ALLOWANCE_REJECTED = `${LOAD_INDUSTRY_TYPICAL_ALLOWANCE}_REJECTED`;

export function loadIndustryTypicalAllowance(selectedIndustrySourceId, selectedIndustryAllowanceId) {
  return {
    type: LOAD_INDUSTRY_TYPICAL_ALLOWANCE,
    payload: http.get(`industry-allowance/${selectedIndustrySourceId}/details/${selectedIndustryAllowanceId}`),
  };
}
