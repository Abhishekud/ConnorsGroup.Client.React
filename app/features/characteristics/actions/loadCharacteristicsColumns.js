export const LOAD_CHARACTERISTICS_COLUMNS = 'LOAD_CHARACTERISTICS_COLUMNS';

export function loadCharacteristicsColumns(columns) {
  return {
    type: LOAD_CHARACTERISTICS_COLUMNS,
    payload: columns,
  };
}
export default loadCharacteristicsColumns;
