export const LOAD_LABOR_STANDARDS_COLUMNS = 'LOAD_LABOR_STANDARDS_COLUMNS';

export function loadLaborStandardsColumns(columns) {
  return {
    type: LOAD_LABOR_STANDARDS_COLUMNS,
    payload: columns,
  };
}
