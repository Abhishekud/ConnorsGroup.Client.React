import {Map} from 'immutable';

export default function createMOSTStepState() {
  return Map({
    editing: false,
    saving: false,
  });
}
