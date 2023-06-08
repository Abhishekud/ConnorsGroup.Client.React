import http from '../../shared/services/http';

export const LOAD_INDUSTRY_ALLOWANCE_REST = 'LOAD_INDUSTRY_ALLOWANCE_REST';
export const LOAD_INDUSTRY_ALLOWANCE_REST_PENDING = `${LOAD_INDUSTRY_ALLOWANCE_REST}_PENDING`;
export const LOAD_INDUSTRY_ALLOWANCE_REST_FULFILLED = `${LOAD_INDUSTRY_ALLOWANCE_REST}_FULFILLED`;
export const LOAD_INDUSTRY_ALLOWANCE_REST_REJECTED = `${LOAD_INDUSTRY_ALLOWANCE_REST}_REJECTED`;

export function loadIndustryAllowanceRest(selectedIndustrySourceId, selectedIndustryRestId) {
  return {
    type: LOAD_INDUSTRY_ALLOWANCE_REST,
    payload: http.get(`industry-allowance/${selectedIndustrySourceId}/rest-details/${selectedIndustryRestId}`),
  };
}
