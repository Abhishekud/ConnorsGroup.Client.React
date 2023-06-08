import mostTypeMultipliers from '../constants/mostTypeMultipliers';
import {
  PROCESS_TIME,
} from '../constants/sequenceModelTypes';

function calculateTMUsFromParameters(mostType, mostStep) {
  let numberOfObjectsManipulated = mostStep.get('numberOfObjectsManipulated');
  if (numberOfObjectsManipulated === null || Number.isNaN(numberOfObjectsManipulated) ||
    numberOfObjectsManipulated < 0) {

    numberOfObjectsManipulated = 1;
  }

  let totalTMUs = 0;

  mostStep.get('mostPhases').forEach(mostPhase => {
    mostPhase.get('mostParameters').forEach(mostParameter => {
      if (mostParameter.get('simultaneous')) return;

      let indexValue = mostParameter.get('indexValue');
      if (!indexValue) return;

      const frequency = Number(mostParameter.get('frequency'));
      if (!Number.isNaN(frequency) && frequency > 0) indexValue *= frequency;

      totalTMUs += indexValue;
    });
  });

  return totalTMUs * mostTypeMultipliers.get(mostType);
}

export default function (mostType, mostStep) {
  switch (mostStep.get('sequenceModelType')) {
    case PROCESS_TIME:
      return mostStep.get('measuredTimeMeasurementUnits');

    default:
      return calculateTMUsFromParameters(mostType, mostStep);
  }
}
