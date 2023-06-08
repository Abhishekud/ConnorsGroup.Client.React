import {fromJS} from 'immutable';
import {
  SHOW_CREATE_INTEGRATION_REQUEST_MODAL,
  HIDE_CREATE_INTEGRATION_REQUEST_MODAL,
  SET_CREATE_INTEGRATION_REQUEST_PROPERTY,
  CREATE_INTEGRATION_REQUEST_FULFILLED,
  CREATE_INTEGRATION_REQUEST_PENDING,
  CREATE_INTEGRATION_REQUEST_REJECTED,
} from '../../actions';

const initialState = fromJS({
  show: false,
  processing: false,
  model: {
    endpointId: null,
    selectedAttributeIds: [],
    selectedLocationIds: [],
    allAttributesSelected: false,
    attributeFilter: null,
    allLocationsSelected: false,
    locationFilter: null,
  },
  validationErrors: {},
});

export default function (state = initialState, action) {
  switch (action.type) {

    case SHOW_CREATE_INTEGRATION_REQUEST_MODAL:
      return state.withMutations(map => {
        map.set('show', true);
        map.setIn(['model', 'selectedAttributeIds'], action.payload.selectedAttributeIds);
        map.setIn(['model', 'selectedLocationIds'], action.payload.selectedLocationIds);
        map.setIn(['model', 'allAttributesSelected'], action.payload.allAttributesSelected);
        map.setIn(['model', 'attributeFilter'], action.payload.attributeFilter);
        map.setIn(['model', 'allLocationsSelected'], action.payload.allLocationsSelected);
        map.setIn(['model', 'locationFilter'], action.payload.locationFilter);
      });

    case HIDE_CREATE_INTEGRATION_REQUEST_MODAL:
    case CREATE_INTEGRATION_REQUEST_FULFILLED:
      return initialState;

    case CREATE_INTEGRATION_REQUEST_PENDING:
      return state.set('processing', true);

    case CREATE_INTEGRATION_REQUEST_REJECTED:
      return state.withMutations(map => {
        map.set('processing', false);

        const {status, data} = action.payload.response || {};
        if (status === 400) {
          map.set('validationErrors', fromJS(data));
        } else {
          map.set('validationErrors', initialState.get('validationErrors'));
        }
      });

    case SET_CREATE_INTEGRATION_REQUEST_PROPERTY:
      return state.setIn(['model', action.payload.name], action.payload.value);

    default:
      return state;
  }
}
