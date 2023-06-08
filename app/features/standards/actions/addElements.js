import {http} from '../../shared/services';

export const ADD_ELEMENTS = 'ADD_ELEMENTS_TO_STANDARD';
export const ADD_ELEMENTS_REJECTED = `${ADD_ELEMENTS}_REJECTED`;
export const ADD_ELEMENTS_PENDING = `${ADD_ELEMENTS}_PENDING`;
export const ADD_ELEMENTS_FULFILLED = `${ADD_ELEMENTS}_FULFILLED`;

export function addElements(standardId, elementIds, insertAtIndex, standardElementGroupId,
  unitOfMeasureId, name, measuredTimeMeasurementUnits, frequencyFormula, comment) {
  return {
    type: ADD_ELEMENTS,
    payload: http.post(`standards/${standardId}/elements/add`, {
      elementIds,
      insertAtIndex,
      standardElementGroupId,
      unitOfMeasureId,
      name, measuredTimeMeasurementUnits, frequencyFormula, comment,
    }),
  };
}
