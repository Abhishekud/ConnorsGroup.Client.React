import {Map} from 'immutable';

export default function createNonMOSTStepState() {
  return Map({
    editing: false,
    saving: false,
  });
}
