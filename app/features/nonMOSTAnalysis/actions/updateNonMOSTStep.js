import {http, convertToTMUs} from '../../shared/services';

export const UPDATE_NON_MOST_STEP = 'UPDATE_NON_MOST_STEP';
export const UPDATE_NON_MOST_STEP_PENDING = `${UPDATE_NON_MOST_STEP}_PENDING`;
export const UPDATE_NON_MOST_STEP_FULFILLED = `${UPDATE_NON_MOST_STEP}_FULFILLED`;
export const UPDATE_NON_MOST_STEP_REJECTED = `${UPDATE_NON_MOST_STEP}_REJECTED`;

export function updateNonMOSTStep(nonMOSTStepId, nonMOSTStep, timeFormat) {
  const model = {
    id: nonMOSTStep.get('id'),
    elementId: nonMOSTStep.get('elementId'),
    standardElementId: nonMOSTStep.get('standardElementId'),
    number: nonMOSTStep.get('number'),
    description: nonMOSTStep.get('description'),
    simultaneous: nonMOSTStep.get('simultaneous'),
    frequency: nonMOSTStep.get('frequency'),
    measuredTimeMeasurementUnits: convertToTMUs(nonMOSTStep.get('measuredTimeMeasurementUnits'), timeFormat),
    adjustedMeasuredTimeMeasurementUnits: nonMOSTStep.get('adjustedMeasuredTimeMeasurementUnits'),
  };

  return {
    type: UPDATE_NON_MOST_STEP,
    payload: {
      promise: http.put(`non-most-steps/${nonMOSTStepId}`, model),
      data: nonMOSTStepId,
    },
  };
}
