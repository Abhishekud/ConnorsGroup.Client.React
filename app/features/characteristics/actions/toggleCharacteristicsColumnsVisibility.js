export const TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY = 'TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY';
export const TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY_FULFILLED = `${TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY}_FULFILLED`;
export const TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY_PENDING = `${TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY}_PENDING`;
export const TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY_REJECTED = `${TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY}_REJECTED`;

export function toggleCharacteristicsColumnsVisibility(field, visibility, finalColumns, selectedColumn) {
  return {
    type: TOGGLE_CHARACTERISTICS_COLUMNS_VISIBILITY,
    payload: Promise.resolve({field, visibility, finalColumns, selectedColumn}),
  };
}

export default toggleCharacteristicsColumnsVisibility;

