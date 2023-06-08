export const SET_SELECTED_ELEMENT_LIST_OPTION = 'SET_SELECTED_ELEMENT_LIST_OPTION';

export function setSelectedElementListOption(optionId) {
  return {
    type: SET_SELECTED_ELEMENT_LIST_OPTION,
    payload: optionId,
  };
}
