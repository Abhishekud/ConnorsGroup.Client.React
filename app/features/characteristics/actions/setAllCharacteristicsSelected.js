export const SET_ALL_CHARACTERISTICS_SELECTED = 'SET_ALL_CHARACTERISTICS_SELECTED';

export function setAllCharacteristicsSelected(selected) {
  return {
    type: SET_ALL_CHARACTERISTICS_SELECTED,
    payload: {selected},
  };
}
