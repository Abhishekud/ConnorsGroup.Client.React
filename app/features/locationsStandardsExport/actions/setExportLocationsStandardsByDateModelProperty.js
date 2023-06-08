export const SET_EXPORT_LOCATIONS_STANDARDS_BY_DATE_MODEL_PROPERTY = 'SET_EXPORT_LOCATIONS_STANDARDS_BY_DATE_MODEL_PROPERTY';

export function setExportLocationsStandardsByDateModelProperty(name, value) {
  return {
    type: SET_EXPORT_LOCATIONS_STANDARDS_BY_DATE_MODEL_PROPERTY,
    payload: {name, value},
  };
}
