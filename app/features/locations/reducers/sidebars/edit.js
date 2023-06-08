import {fromJS, Map} from 'immutable';
import {
  SELECT_LOCATION,
  CLEAR_SELECTED_LOCATION,
  CLOSE_LOCATIONS_LIST_EDIT_SIDEBAR,
  CLOSE_LOCATIONS_LIST_BULK_EDIT_SIDEBAR,
  SET_EDIT_LOCATION_MODEL_PROPERTY,
  UPDATE_LOCATION_PENDING,
  UPDATE_LOCATION_FULFILLED,
  UPDATE_LOCATION_REJECTED,
  BULK_UPDATE_LOCATION_PENDING,
  BULK_UPDATE_LOCATION_FULFILLED,
  BULK_UPDATE_LOCATION_REJECTED,
  SELECT_BULK_LOCATION,
  SET_BULK_EDIT_LOCATION_MODEL_PROPERTY,
} from '../../actions';

const initialState = Map({
  show: false,
  showBulk: false,
  saving: false,
  model: Map(),
  validationErrors: Map(),
  dirty: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_LOCATION:
    case CLOSE_LOCATIONS_LIST_EDIT_SIDEBAR: {
      return state.withMutations(map =>
        map.set('show', false));
    }
    case CLOSE_LOCATIONS_LIST_BULK_EDIT_SIDEBAR: {
      return state.withMutations(map =>
        map.set('showBulk', false));
    }

    case SELECT_LOCATION: {
      return state.withMutations(map =>
        map.set('show', !map.get('show'))
          .set('showBulk', false)
          .set('saving', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));
    }
    case SELECT_BULK_LOCATION: {
      let bulkModel = action.payload.selectedLocations;
      bulkModel = bulkModel.set('updateLocationProfileId', false);
      bulkModel = bulkModel.set('updateParentOrgHierarchyLevelOptionId', false);
      bulkModel = bulkModel.set('updateActiveDate', false);
      bulkModel = bulkModel.set('updateInactiveDate', false);
      return state.withMutations(map =>
        map.set('showBulk', !map.get('showBulk'))
          .set('show', false)
          .set('saving', false)
          .set('bulkModel', bulkModel)
          .set('validationErrors', Map()));
    }
    case SET_EDIT_LOCATION_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value).set('dirty', true);
    }

    case SET_BULK_EDIT_LOCATION_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['bulkModel', name], value).set('dirty', true);
    }

    case UPDATE_LOCATION_FULFILLED: {
      return initialState;

    }

    case UPDATE_LOCATION_PENDING:
      return state.set('saving', true);

    case UPDATE_LOCATION_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case BULK_UPDATE_LOCATION_FULFILLED: {
      return initialState;

    }

    case BULK_UPDATE_LOCATION_PENDING:
      return state.set('saving', true);

    case BULK_UPDATE_LOCATION_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
