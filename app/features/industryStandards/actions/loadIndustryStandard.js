import {http} from '../../shared/services';

export const LOAD_INDUSTRY_STANDARD = 'LOAD_INDUSTRY_STANDARD';
export const LOAD_INDUSTRY_STANDARD_PENDING = `${LOAD_INDUSTRY_STANDARD}_PENDING`;
export const LOAD_INDUSTRY_STANDARD_FULFILLED = `${LOAD_INDUSTRY_STANDARD}_FULFILLED`;
export const LOAD_INDUSTRY_STANDARD_REJECTED = `${LOAD_INDUSTRY_STANDARD}_REJECTED`;

export function loadIndustryStandard(industrySourceId, standardId) {
  return {
    type: LOAD_INDUSTRY_STANDARD,
    payload: http.get(`industry-standards/${industrySourceId}/details/${standardId}`),
  };
}

