import {http} from '../../shared/services';

export const LOAD_INDUSTRY_ATTRIBUTE_SELECT_LIST_OPTIONS = 'LOAD_INDUSTRY_ATTRIBUTE_SELECT_LIST_OPTIONS';
export const LOAD_INDUSTRY_ATTRIBUTE_SELECT_LIST_OPTIONS_FULFILLED = `${LOAD_INDUSTRY_ATTRIBUTE_SELECT_LIST_OPTIONS}_FULFILLED`;

export function loadIndustryAttributeSelectListOptions(industrySourceId) {
  return {
    type: LOAD_INDUSTRY_ATTRIBUTE_SELECT_LIST_OPTIONS,
    payload: http.get(`attributes/industry-typical/select-list-options/${industrySourceId}`),
  };
}
