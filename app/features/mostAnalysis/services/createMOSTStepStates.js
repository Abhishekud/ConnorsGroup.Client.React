import {Map} from 'immutable';
import createMOSTStepState from './createMOSTStepState';

export default function (mostSteps) {
  return Map(mostSteps.map(mostStep => [mostStep.id, createMOSTStepState()]));
}
