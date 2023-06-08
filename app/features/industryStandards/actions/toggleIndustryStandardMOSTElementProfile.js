export const TOGGLE_INDUSTRY_STANDARD_MOST_ELEMENT_PROFILE = 'TOGGLE_INDUSTRY_STANDARD_MOST_ELEMENT_PROFILE';

export function toggleIndustryStandardMOSTElementProfile(id) {
  return {
    type: TOGGLE_INDUSTRY_STANDARD_MOST_ELEMENT_PROFILE,
    payload: id,
  };
}
