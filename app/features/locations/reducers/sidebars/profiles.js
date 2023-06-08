import {Map, fromJS} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  TOGGLE_LOCATION_PROFILES_SIDEBAR,
  EDIT_LOCATION_PROFILE,
  CANCEL_EDIT_LOCATION_PROFILE,
  LOAD_LOCATION_PROFILES_FULFILLED,
  SET_EDIT_LOCATION_PROFILE_MODEL_PROPERTY,
  ADD_EDIT_LOCATION_PROFILE_MODEL_DEPARTMENT,
  REMOVE_EDIT_LOCATION_PROFILE_MODEL_DEPARTMENT,
  CREATE_LOCATION_PROFILE_FULFILLED,
  UPDATE_LOCATION_PROFILE_PENDING,
  UPDATE_LOCATION_PROFILE_FULFILLED,
  UPDATE_LOCATION_PROFILE_REJECTED,
  DELETE_LOCATION_PROFILE_FULFILLED,
} from '../../actions';

const initialState = Map({
  show: false,
  locationProfiles: Map(),
  locationProfileStates: Map(),
  pristineLocationProfiles: Map(),
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LOCATION_PROFILES_SIDEBAR:
      return state.set('show', !state.get('show'));

    case EDIT_LOCATION_PROFILE: {
      const id = action.payload;

      return state.withMutations(map =>
        map.setIn(['locationProfileStates', id, 'editing'], true)
          .setIn(['pristineLocationProfiles', id], map.getIn(['locationProfiles', id])));
    }

    case CANCEL_EDIT_LOCATION_PROFILE: {
      const id = action.payload;

      return state.withMutations(map =>
        map.setIn(['locationProfileStates', id, 'editing'], false)
          .setIn(['locationProfiles', id], map.getIn(['pristineLocationProfiles', id]))
          .deleteIn(['validationErrors', id]));
    }

    case LOAD_LOCATION_PROFILES_FULFILLED: {
      const locationProfiles = action.payload.data;
      const locationProfilesMap = modelsArrayToMapById(locationProfiles);

      return state.withMutations(map =>
        map.set('locationProfiles', locationProfilesMap)
          .set('pristineLocationProfiles', locationProfilesMap));
    }

    case CREATE_LOCATION_PROFILE_FULFILLED: {
      const {data} = action.payload;
      const locationProfileMap = fromJS(data);

      return state.withMutations(map =>
        map.set('show', true)
          .setIn(['locationProfiles', data.id], locationProfileMap)
          .setIn(['pristineLocationProfiles', data.id], locationProfileMap)
          .setIn(['locationProfileStates', data.id, 'editing'], true));
    }

    case SET_EDIT_LOCATION_PROFILE_MODEL_PROPERTY: {
      const {locationProfileId, name, value} = action.payload;
      return state.setIn(['locationProfiles', locationProfileId, name], value);
    }

    case ADD_EDIT_LOCATION_PROFILE_MODEL_DEPARTMENT: {
      const {locationProfileId, id, name} = action.payload;
      const departments = state.getIn(['locationProfiles', locationProfileId, 'departments']);
      const index = departments.findIndex(y => y.get('id') === id);
      return index === -1 ? state.updateIn(['locationProfiles', locationProfileId, 'departments'], x => x.push(fromJS({
        id,
        name,
      }))) : state;
    }

    case REMOVE_EDIT_LOCATION_PROFILE_MODEL_DEPARTMENT: {
      const {locationProfileId, id} = action.payload;
      const departments = state.getIn(['locationProfiles', locationProfileId, 'departments']);
      const index = departments.findIndex(y => y.get('id') === id);
      return index > -1 ? state.updateIn(['locationProfiles', locationProfileId, 'departments'], x => x.delete(index)) : state;
    }

    case UPDATE_LOCATION_PROFILE_PENDING: {
      const id = action.payload;

      return state.setIn(['locationProfileStates', id, 'saving'], true);
    }

    case UPDATE_LOCATION_PROFILE_FULFILLED: {
      const {locationProfile} = action.payload.data;
      const id = locationProfile.id;
      const locationProfileMap = fromJS(locationProfile);

      return state.withMutations(map => {
        map.setIn(['locationProfiles', id], locationProfileMap)
          .setIn(['pristineLocationProfiles', id], locationProfileMap)
          .setIn(['locationProfileStates', id, 'editing'], false)
          .setIn(['locationProfileStates', id, 'saving'], false)
          .deleteIn(['validationErrors', id]);
      });
    }

    case UPDATE_LOCATION_PROFILE_REJECTED: {
      const {payload} = action;
      const {id} = JSON.parse(payload.config.data);
      const {status, data} = payload.response || {};

      return state.withMutations(map => {
        map.setIn(['locationProfileStates', id, 'saving'], false);

        if (status === 400) {
          map.setIn(['validationErrors', id], fromJS(data));
        } else {
          map.deleteIn(['validationErrors', id]);
        }
      });
    }

    case DELETE_LOCATION_PROFILE_FULFILLED: {
      const id = action.payload.data;

      return state.withMutations(map => {
        map.deleteIn(['locationProfiles', id]);
        map.deleteIn(['pristineLocationProfiles', id]);
        map.deleteIn(['locationProfileStates', id]);
        map.deleteIn(['validationErrors', id]);
      });
    }

    default:
      return state;
  }
}
