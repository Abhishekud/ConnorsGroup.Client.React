export const LOAD_ATTRIBUTES_COLUMNS = 'LOAD_ATTRIBUTES_COLUMNS';

export function loadAttributesColumns(columns) {
  return {
    type: LOAD_ATTRIBUTES_COLUMNS,
    payload: columns,
  };
}
