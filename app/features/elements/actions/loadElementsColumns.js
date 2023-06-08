export const LOAD_ELEMENTS_COLUMNS = 'LOAD_ELEMENTS_COLUMNS';

export function loadElementsColumns(columns) {
  return {
    type: LOAD_ELEMENTS_COLUMNS,
    payload: columns,
  };
}
