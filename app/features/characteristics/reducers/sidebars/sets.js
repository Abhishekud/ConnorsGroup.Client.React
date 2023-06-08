import {fromJS, Map} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  createCharacteristicSetState,
  createCharacteristicSetStates,
} from '../../services';
import {
  LOAD_CHARACTERISTIC_SETS_LIST_FULFILLED,
  TOGGLE_CHARACTERISTIC_SETS_SIDEBAR,
  CREATE_CHARACTERISTIC_SET_FULFILLED,
  EDIT_CHARACTERISTIC_SET,
  SET_CHARACTERISTIC_SET_MODEL_PROPERTY,
  CANCEL_EDIT_CHARACTERISTIC_SET,
  UPDATE_CHARACTERISTIC_SET_PENDING,
  UPDATE_CHARACTERISTIC_SET_FULFILLED,
  UPDATE_CHARACTERISTIC_SET_REJECTED,
  DELETE_CHARACTERISTIC_SET_FULFILLED,
} from '../../actions';

const initialState = Map({
  show: false,
  characteristicSets: Map(),
  pristineCharacteristicSets: Map(),
  characteristicSetStates: Map(),
  characteristicSetsValidationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CHARACTERISTIC_SETS_SIDEBAR:
      return state.set('show', !state.get('show'));

    case LOAD_CHARACTERISTIC_SETS_LIST_FULFILLED: {
      const {characteristicsSet} = action.payload.data;
      return state.withMutations(map =>
        map.set('characteristicSets', modelsArrayToMapById(characteristicsSet))
          .set('pristineCharacteristicSets', modelsArrayToMapById(characteristicsSet))
          .set('characteristicSetStates', createCharacteristicSetStates(characteristicsSet)));
    }

    case CREATE_CHARACTERISTIC_SET_FULFILLED: {
      const {characteristicSet} = action.payload.data;
      const csId = characteristicSet.id;
      const characteristicSetMap = fromJS(characteristicSet);

      return state.withMutations(map => {
        if (characteristicSet.default) {
          map.update('pristineCharacteristicSets', sets => sets.map(cs => cs.set('default', false)));
          map.update('characteristicSets', sets => sets.map(cs => cs.set('default', false)));
        }

        map.setIn(['characteristicSets', csId], characteristicSetMap);
        map.setIn(['pristineCharacteristicSets', csId], characteristicSetMap);
        map.setIn(['characteristicSetStates', csId], createCharacteristicSetState());
      });
    }

    case EDIT_CHARACTERISTIC_SET: {
      const csId = action.payload;

      return state.withMutations(map =>
        map.setIn(['characteristicSetStates', csId, 'editing'], true)
          .setIn(['pristineCharacteristicSets', csId], map.getIn(['characteristicSets', csId])));
    }

    case SET_CHARACTERISTIC_SET_MODEL_PROPERTY: {
      const {characteristicSetId: csId, name, value} = action.payload;

      return state.setIn(['characteristicSets', csId, name], value);
    }

    case CANCEL_EDIT_CHARACTERISTIC_SET: {
      const csId = action.payload;

      return state.withMutations(map =>
        map.setIn(['characteristicSetStates', csId, 'editing'], false)
          .setIn(['characteristicSets', csId], map.getIn(['pristineCharacteristicSets', csId]))
          .deleteIn(['characteristicSetsValidationErrors', csId]));
    }

    case UPDATE_CHARACTERISTIC_SET_PENDING:
      return state.setIn(['characteristicSetStates', action.payload, 'saving'], true);

    case UPDATE_CHARACTERISTIC_SET_FULFILLED: {
      const characteristicSet = action.payload.data;
      const csId = characteristicSet.id;
      const characteristicSetMap = fromJS(characteristicSet);

      return state.withMutations(map => {
        if (characteristicSet.default) {
          map.update('pristineCharacteristicSets', sets => sets.map(cs => cs.set('default', false)));
          map.update('characteristicSets', sets => sets.map(cs => cs.set('default', false)));
        }

        map.setIn(['pristineCharacteristicSets', csId], characteristicSetMap)
          .setIn(['characteristicSets', csId], characteristicSetMap)
          .setIn(['characteristicSetStates', csId, 'editing'], false)
          .setIn(['characteristicSetStates', csId, 'saving'], false)
          .deleteIn(['characteristicSetsValidationErrors', csId]);
      });
    }

    case UPDATE_CHARACTERISTIC_SET_REJECTED: {
      const {payload} = action;
      const csId = Number(/\d+$/.exec(payload.config.url)[0]);
      const {status, data} = payload.response || {};

      return state.withMutations(map => {
        map.setIn(['characteristicSetStates', csId, 'saving'], false);

        if (status === 400) {
          map.setIn(['characteristicSetsValidationErrors', csId], fromJS(data));
        } else {
          map.deleteIn(['characteristicSetsValidationErrors', csId]);
        }
      });
    }

    case DELETE_CHARACTERISTIC_SET_FULFILLED: {
      const {characteristicSetId: csId, newDefaultCharacteristicSetId} = action.payload.data;

      return state.withMutations(map => {
        if (newDefaultCharacteristicSetId) {
          map.setIn(['pristineCharacteristicSets', newDefaultCharacteristicSetId, 'default'], true);
          map.setIn(['characteristicSets', newDefaultCharacteristicSetId, 'default'], true);
        }

        map.deleteIn(['characteristicSets', csId])
          .deleteIn(['pristineCharacteristicSets', csId])
          .deleteIn(['characteristicSetStates', csId])
          .deleteIn(['characteristicSetsValidationErrors', csId]);
      });
    }

    default:
      return state;
  }
}
