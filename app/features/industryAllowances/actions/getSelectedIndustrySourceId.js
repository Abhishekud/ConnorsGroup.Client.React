export const GET_SELECTED_INDUSTRY_SOURCE_ID = 'GET_SELECTED_INDUSTRY_SOURCE_ID';

export function getSelectedIndustrySourceId(selectedIndustrySourceId) {
  return {
    type: GET_SELECTED_INDUSTRY_SOURCE_ID,
    payload: selectedIndustrySourceId,
  };
}
