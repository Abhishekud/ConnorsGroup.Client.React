import {Map, List, fromJS} from 'immutable';
import {
  CANCEL_CREATE_CHARACTERISTIC,
  CREATE_CHARACTERISTIC_FULFILLED,
  CREATE_CHARACTERISTIC_PENDING,
  CREATE_CHARACTERISTIC_REJECTED,
  SET_CREATE_CHARACTERISTIC_MODEL_PROPERTY,
  SET_CREATE_CHARACTERISTIC_MODEL_SET_VALUE,
  SHOW_CREATE_CHARACTERISTIC,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
    definition: '',
    characteristicSetValues: List(),
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_CHARACTERISTIC:
      return initialState.set('show', true);

    case SET_CREATE_CHARACTERISTIC_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_CREATE_CHARACTERISTIC_MODEL_SET_VALUE: {
      const {characteristicSetId, value} = action.payload;
      const characteristicSetValues = state.getIn(['model', 'characteristicSetValues']);
      const valueIndex = characteristicSetValues.findIndex(v => v.get('characteristicSetId') === characteristicSetId);

      if (valueIndex < 0) {
        return state.setIn(['model', 'characteristicSetValues'], characteristicSetValues.push(Map({characteristicSetId, value})));
      }

      return state.setIn(['model', 'characteristicSetValues', valueIndex, 'value'], value);
    }

    case CREATE_CHARACTERISTIC_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_CHARACTERISTIC:
    case CREATE_CHARACTERISTIC_FULFILLED:
      return initialState;

    case CREATE_CHARACTERISTIC_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
