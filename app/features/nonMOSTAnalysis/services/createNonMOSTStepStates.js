import {Map} from 'immutable';
import createNonMOSTStepState from './createNonMOSTStepState';

export default function (nonMOSTSteps) {
  return Map(nonMOSTSteps.map(nonMOSTStep => [nonMOSTStep.id, createNonMOSTStepState()]));
}
