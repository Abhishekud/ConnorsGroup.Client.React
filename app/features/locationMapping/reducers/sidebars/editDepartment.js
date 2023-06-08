import {fromJS, Map} from 'immutable';
import {
  LOAD_LOCATION_MAPPING_LIST_FULFILLED,
  SELECT_LOCATION,
  CLEAR_SELECTED_LOCATION,
  CLOSE_LOCATIONS_LIST_EDIT_SIDEBAR,
  CLOSE_LOCATIONS_DEPARTMENT_LIST_BULK_EDIT_SIDEBAR,
  SET_EDIT_LOCATION_MAPPING_MODEL_PROPERTY,
  UPDATE_LOCATION_MAPPING_PENDING,
  UPDATE_LOCATION_MAPPING_FULFILLED,
  UPDATE_LOCATION_MAPPING_REJECTED,
  BULK_UPDATE_LOCATION_DEPARTMENT_PENDING,
  BULK_UPDATE_LOCATION_DEPARTMENT_FULFILLED,
  BULK_UPDATE_LOCATION_DEPARTMENT_REJECTED,
  SELECT_BULK_LOCATION_MAPPING,
  SET_BULK_EDIT_LOCATION_MODEL_PROPERTY,

} from '../../actions';

const initialState = Map({
  show: false,
  showBulk: false,
  saving: false,
  model: Map(),
  bulkModel: Map(),
  validationErrors: Map(),
  dirty: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_LOCATION:
    case UPDATE_LOCATION_MAPPING_FULFILLED:
      return state.withMutations(map =>
        map.set('show', false)
          .set('saving', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case LOAD_LOCATION_MAPPING_LIST_FULFILLED:
      return initialState;

    case CLOSE_LOCATIONS_LIST_EDIT_SIDEBAR:
    {
      return state.withMutations(map =>
        map.set('show', false));
    }


    case CLOSE_LOCATIONS_DEPARTMENT_LIST_BULK_EDIT_SIDEBAR: {
      return state.withMutations(map =>
        map.set('showBulk', false));
    }
    case SELECT_LOCATION:
      return state.withMutations(map =>
        map.set('show', true)
          .set('showBulk', false)
          .set('saving', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case SELECT_BULK_LOCATION_MAPPING: {
      const {selectedLocationMapping} = action.payload;
      const keyArray = Object.keys(selectedLocationMapping.toJS());
      const key = Number(keyArray[0]);
      let bulkModel = selectedLocationMapping.get(key);
      bulkModel = bulkModel.set('updateVolumeDriverMappingSetId', false);
      bulkModel = bulkModel.set('updateCharacteristicSetId', false);
      return state.withMutations(map =>
        map.set('showBulk', !map.get('showBulk'))
          .set('saving', false)
          .set('show', false)
          .set('bulkModel', bulkModel)
          .set('validationErrors', Map()));
    }

    case SET_EDIT_LOCATION_MAPPING_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value ? Number(value) : null);
    }

    case SET_BULK_EDIT_LOCATION_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['bulkModel', name], value).set('dirty', true);
    }

    case UPDATE_LOCATION_MAPPING_PENDING:
      return state.set('saving', true);

    case UPDATE_LOCATION_MAPPING_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });


    case BULK_UPDATE_LOCATION_DEPARTMENT_FULFILLED: {
      return initialState;
    }

    case BULK_UPDATE_LOCATION_DEPARTMENT_PENDING:
      return state.set('saving', true);

    case BULK_UPDATE_LOCATION_DEPARTMENT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
