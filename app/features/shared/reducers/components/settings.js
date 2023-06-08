import {Map, fromJS} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  LOAD_SETTINGS_FULFILLED,
  LOAD_CONFIGURATION_FULFILLED,
} from '../../actions';
import {
  SAVE_SETTINGS_FULFILLED,
  UPLOAD_CLIENT_PHOTO_FULFILLED,
} from '../../../adminTools/actions';

const initialState = new Map({
  settings: new Map(),
  configurations: new Map(),
  version: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_SETTINGS_FULFILLED:
    case LOAD_SETTINGS_FULFILLED: {
      return state.withMutations(map =>
        map.set('settings', modelsArrayToMapById(action.payload.data))
          .set('version', new Date().getTime()));
    }

    case LOAD_CONFIGURATION_FULFILLED:
      return state.set('configurations', fromJS(action.payload.data));

    case UPLOAD_CLIENT_PHOTO_FULFILLED: {
      return state.set('version', new Date().getTime());
    }

    default:
      return state;
  }
}
