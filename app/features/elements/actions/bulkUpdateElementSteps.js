import {http} from '../../shared/services';

export const BULK_UPDATE_ELEMENT_STEPS = 'BULK_UPDATE_ELEMENT_STEPS';
export const BULK_UPDATE_ELEMENT_STEPS_REJECTED = `${BULK_UPDATE_ELEMENT_STEPS}_REJECTED`;
export const BULK_UPDATE_ELEMENT_STEPS_PENDING = `${BULK_UPDATE_ELEMENT_STEPS}_PENDING`;
export const BULK_UPDATE_ELEMENT_STEPS_FULFILLED = `${BULK_UPDATE_ELEMENT_STEPS}_FULFILLED`;

export function bulkUpdateElementSteps(elementId, updateModel, isMOST) {
  const model = updateModel.toJSON();
  model.isMOST = isMOST;
  return {
    type: BULK_UPDATE_ELEMENT_STEPS,
    payload: http.post(`element-steps/bulk-update/${elementId}`, model),
  };
}
