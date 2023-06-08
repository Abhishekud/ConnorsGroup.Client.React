import {http} from '../../shared/services';

export const UPDATE_STANDARD_ELEMENT = 'UPDATE_STANDARD_ELEMENT';
export const UPDATE_STANDARD_ELEMENT_PENDING = `${UPDATE_STANDARD_ELEMENT}_PENDING`;
export const UPDATE_STANDARD_ELEMENT_FULFILLED = `${UPDATE_STANDARD_ELEMENT}_FULFILLED`;
export const UPDATE_STANDARD_ELEMENT_REJECTED = `${UPDATE_STANDARD_ELEMENT}_REJECTED`;

export function updateStandardElement(standardId, standardElement, timeFormat) {
  return {
    type: UPDATE_STANDARD_ELEMENT,
    payload: http.put(`standards/${standardId}/elements/${standardElement.get('id')}`, {
      id: standardElement.get('id'),
      name: standardElement.get('name'),
      measuredTimeMeasurementUnits: standardElement.get('measuredTimeMeasurementUnits'),
      frequencyFormula: standardElement.get('frequencyFormula'),
      unitOfMeasureId: standardElement.get('unitOfMeasureId'),
      internal: standardElement.get('internal'),
      machineAllowance: standardElement.get('machineAllowance'),
      comment: standardElement.get('comment'),
      timeFormat,
    }),
  };
}
