import {fromJS, List, Map} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  addValueToCharacteristic,
  deleteValueFromCharacteristic,
} from '../../services';
import {
  LOAD_CHARACTERISTIC_SETS_LIST_FULFILLED,
  SELECT_CHARACTERISTIC,
  CLEAR_SELECTED_CHARACTERISTIC,
  CLOSE_CHARACTERISTICS_LIST_EDIT_SIDEBAR,
  SET_EDIT_CHARACTERISTIC_MODEL_PROPERTY,
  SET_EDIT_CHARACTERISTIC_MODEL_SET_VALUE,
  SET_BULK_EDIT_CHARACTERISTIC_MODEL_SET_VALUE,
  SET_BULK_EDIT_CHARACTERISTIC_MODEL_PROPERTY,
  UPDATE_CHARACTERISTIC_PENDING,
  UPDATE_CHARACTERISTIC_FULFILLED,
  UPDATE_CHARACTERISTIC_REJECTED,
  RENAME_CHARACTERISTIC_PENDING,
  RENAME_CHARACTERISTIC_FULFILLED,
  RENAME_CHARACTERISTIC_REJECTED,
  CREATE_CHARACTERISTIC_SET_FULFILLED,
  DELETE_CHARACTERISTIC_SET_FULFILLED,
  UPDATE_CHARACTERISTIC_SET_FULFILLED,
  BULK_UPDATE_CHARACTERISTICS_FULFILLED,
  BULK_UPDATE_CHARACTERISTICS_PENDING,
  BULK_UPDATE_CHARACTERISTICS_REJECTED,
  SELECT_BULK_CHARACTERISTIC,
  TOGGLE_CHARACTERISTICS_LIST_BULK_EDIT_SIDEBAR,
  LOAD_CHARACTERISTIC_DETAILS_FULFILLED,

} from '../../actions';

const initialState = Map({
  open: false,
  show: false,
  saving: false,
  model: Map(),
  columnClickTarget: '',
  validationErrors: Map(),
  characteristicSets: List(),
  selectedCharacteristicSetValues: Map(),
  selectedCharacteristicIsUsedForStandard: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_CHARACTERISTIC:
    case CLOSE_CHARACTERISTICS_LIST_EDIT_SIDEBAR:
    case UPDATE_CHARACTERISTIC_FULFILLED:
      return initialState.set(
        'characteristicSets',
        state.get('characteristicSets')
      );

    case TOGGLE_CHARACTERISTICS_LIST_BULK_EDIT_SIDEBAR:
      return state.withMutations(map => {
        const isOpenNow = !map.get('open');
        if (!isOpenNow) map.set('validationErrors', List());
        map.set('open', isOpenNow);
      });

    case LOAD_CHARACTERISTIC_SETS_LIST_FULFILLED: {
      const {characteristicsSet} = action.payload.data;
      return state.withMutations(map => {
        map.set('characteristicSets', fromJS(characteristicsSet))
          .set('show', false);
      });
    }

    case SELECT_CHARACTERISTIC: {
      const {characteristic, columnClickTarget} = action.payload;
      const rowObject = characteristic.setIn(['rowModel'], true)
        .set('characteristicSetValues', state.get('selectedCharacteristicSetValues'))
        .set('isUsedForStandard', state.get('selectedCharacteristicIsUsedForStandard'));
      const characteristicSetValues = rowObject.get('characteristicSetValues');

      if (!rowObject.get('characteristicSetValues').length) {

        /* We need to prepare a list of characteristicSetValues containing default values from the characteristic sets*/

        const setValues = state.get('characteristicSets').filter((cs, index) => !isNaN(index));
        setValues.forEach(cs => {
          characteristicSetValues.push({characteristicId: Number(rowObject.get('id')), characteristicSetId: Number(cs.get('id')), value: 0, neverSpecified: true});
        });
      }

      return state.withMutations(map => {
        map
          .set('show', true)
          .set('columnClickTarget', columnClickTarget)
          .set('saving', false)
          .set('model', rowObject)
          .set('validationErrors', Map())
          .setIn(['model', 'characteristicSetValues'], fromJS(characteristicSetValues));
      }
      );
    }

    case BULK_UPDATE_CHARACTERISTICS_PENDING:
      return state.set('saving', true);

    case BULK_UPDATE_CHARACTERISTICS_FULFILLED:
      return state.set('saving', false);


    case BULK_UPDATE_CHARACTERISTICS_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);
        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case SELECT_BULK_CHARACTERISTIC: {
      const {selectedCharacteristic} = action.payload;
      const selectedCharacteristicMap = modelsArrayToMapById(selectedCharacteristic);
      const keyArray = Object.keys(selectedCharacteristicMap.toJS());
      const key = Number(keyArray[0]);

      let characteristicSetValues = fromJS(state.get('characteristicSets').map(item => (Map({'characteristicSetId': item.get('id')}))));

      characteristicSetValues = characteristicSetValues.map(characteristicSetValuesKey => (characteristicSetValuesKey.setIn(['value'], null)));
      characteristicSetValues = characteristicSetValues.map(characteristicSetValuesKey => (characteristicSetValuesKey.setIn(['updateValue'], false)));
      let bulkObject = selectedCharacteristicMap.setIn([key, 'updateStatus'], false);
      bulkObject = bulkObject.setIn([key, 'characteristicSetValues'], characteristicSetValues);
      bulkObject = bulkObject.setIn([key, 'bulkModel'], true);


      return state.withMutations(map =>
        map
          .set('show', !map.get('show'))
          .set('saving', false)
          .set('model', bulkObject)
          .set('validationErrors', Map())
      );
    }


    case SET_EDIT_CHARACTERISTIC_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_BULK_EDIT_CHARACTERISTIC_MODEL_PROPERTY: {
      const {name, value, index} = action.payload;
      return state.setIn(['model', index, name], value);
    }

    case SET_EDIT_CHARACTERISTIC_MODEL_SET_VALUE: {
      const {characteristicSetId, value} = action.payload;
      let characteristicSetValues = state.getIn([
        'model',
        'characteristicSetValues',
      ]);
      characteristicSetValues = fromJS(characteristicSetValues);
      const valueIndex = characteristicSetValues.findIndex(
        v => v.get('characteristicSetId') === characteristicSetId
      );
      if (valueIndex < 0) {
        return state.setIn(
          ['model', 'characteristicSetValues'],
          characteristicSetValues.push({characteristicSetId, value})
        );
      }

      return state.withMutations(map => map.setIn(
        ['model', 'characteristicSetValues'],
        characteristicSetValues
      ).setIn(
        ['model', 'characteristicSetValues', valueIndex, 'value'],
        value
      ));
    }

    case SET_BULK_EDIT_CHARACTERISTIC_MODEL_SET_VALUE: {
      const {characteristicSetId, value, index, isUpdate} = action.payload;
      let characteristicSetValues = state.getIn([
        'model', index,
        'characteristicSetValues',
      ]);
      characteristicSetValues = fromJS(characteristicSetValues);
      const valueIndex = characteristicSetValues.findIndex(
        v => v.get('characteristicSetId') === Number(characteristicSetId)
      );
      if (valueIndex < 0) {
        return state.setIn(
          ['model', index, 'characteristicSetValues'],
          characteristicSetValues.push({characteristicSetId, value})
        );
      }
      const bulkEditState = state.setIn(
        ['model', index, 'characteristicSetValues'],
        characteristicSetValues
      );
      if (isUpdate === true) {
        return bulkEditState.setIn(
          ['model', index, 'characteristicSetValues', valueIndex, 'updateValue'],
          value
        );
      }
      return bulkEditState.setIn(
        ['model', index, 'characteristicSetValues', valueIndex, 'value'],
        value
      );
    }

    case UPDATE_CHARACTERISTIC_PENDING:
    case RENAME_CHARACTERISTIC_PENDING:
      return state.set('saving', true);

    case UPDATE_CHARACTERISTIC_REJECTED:
    case RENAME_CHARACTERISTIC_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case CREATE_CHARACTERISTIC_SET_FULFILLED: {
      const {characteristicSet, characteristicValues} = action.payload.data;

      return state.withMutations(map => {
        map.update('characteristicSets', cs =>
          cs.push(fromJS(characteristicSet))
        );

        const characteristicValuesByCharacteristicId = modelsArrayToMapById(
          characteristicValues,
          'characteristicId'
        );

        if (map.get('model').size) {
          map.update('model', characteristic =>
            addValueToCharacteristic(
              characteristic,
              characteristicValuesByCharacteristicId
            )
          );
        }
      });
    }

    case UPDATE_CHARACTERISTIC_SET_FULFILLED: {
      const characteristicSet = action.payload.data;

      return state.withMutations(map => {
        map.update('characteristicSets', cs => {
          const index = cs.findIndex(
            cc => cc.get('id') === characteristicSet.id
          );
          return cs.set(index, fromJS(characteristicSet));
        });
      });
    }

    case RENAME_CHARACTERISTIC_FULFILLED: {
      return state.withMutations(map => {
        map.set('saving', false).set('validationErrors', Map());
      });
    }

    case DELETE_CHARACTERISTIC_SET_FULFILLED: {
      const {characteristicSetId: ccId} = action.payload.data;

      return state.withMutations(map => {
        if (map.get('model').size) {
          map.update('model', characteristic =>
            deleteValueFromCharacteristic(characteristic, ccId)
          );
        }

        map.update('characteristicSets', cs => {
          const deletedIndex = cs.findIndex(cc => cc.get('id') === ccId);
          return cs.delete(deletedIndex);
        });
      });
    }

    case LOAD_CHARACTERISTIC_DETAILS_FULFILLED: {
      const {isUsedForStandard, characteristicSetValues} = action.payload.data;
      return state.withMutations(map => {
        map
          .set('selectedCharacteristicIsUsedForStandard', isUsedForStandard)
          .set('selectedCharacteristicSetValues', characteristicSetValues);
      });
    }

    default:
      return state;
  }
}
