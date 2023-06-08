import {numberOfTabableElementsInAMOSTStep} from '../constants';

export default function (mostStepNumber, mostStepIndex) {
  const tabIndexOffset = (mostStepNumber - 1) * numberOfTabableElementsInAMOSTStep;
  return tabIndexOffset + mostStepIndex;
}
