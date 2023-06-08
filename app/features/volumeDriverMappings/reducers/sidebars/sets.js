import {fromJS, Map} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  createVolumeDriverMappingSetState,
  createVolumeDriverMappingSetStates,
} from '../../services';
import {
  LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_FULFILLED,
  TOGGLE_VOLUME_DRIVER_MAPPING_CATEGORIES_SIDEBAR,
  CREATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED,
  EDIT_VOLUME_DRIVER_MAPPING_SET,
  SET_VOLUME_DRIVER_MAPPING_SET_MODEL_PROPERTY,
  CANCEL_EDIT_VOLUME_DRIVER_MAPPING_SET,
  UPDATE_VOLUME_DRIVER_MAPPING_SET_PENDING,
  UPDATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED,
  UPDATE_VOLUME_DRIVER_MAPPING_SET_REJECTED,
  DELETE_VOLUME_DRIVER_MAPPING_SET_FULFILLED,
} from '../../actions';

const initialState = Map({
  show: false,
  volumeDriverMappingSets: Map(),
  pristineVolumeDriverMappingSets: Map(),
  volumeDriverMappingSetStates: Map(),
  volumeDriverMappingSetsValidationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_VOLUME_DRIVER_MAPPING_CATEGORIES_SIDEBAR:
      return state.set('show', !state.get('show'));


    case LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_FULFILLED: {
      const {volumeDriverMappingSets} = action.payload.data;

      return state.withMutations(map =>
        map.set('volumeDriverMappingSets', modelsArrayToMapById(volumeDriverMappingSets))
          .set('pristineVolumeDriverMappingSets', modelsArrayToMapById(volumeDriverMappingSets))
          .set('volumeDriverMappingSetStates', createVolumeDriverMappingSetStates(volumeDriverMappingSets)));
    }

    case CREATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED: {
      const {volumeDriverMappingSet} = action.payload.data;
      const ccId = volumeDriverMappingSet.id;
      const volumeDriverMappingSetMap = fromJS(volumeDriverMappingSet);

      return state.withMutations(map => {
        map.setIn(['volumeDriverMappingSets', ccId], volumeDriverMappingSetMap);
        map.setIn(['pristineVolumeDriverMappingSets', ccId], volumeDriverMappingSetMap);
        map.setIn(['volumeDriverMappingSetStates', ccId], createVolumeDriverMappingSetState());
      });
    }

    case EDIT_VOLUME_DRIVER_MAPPING_SET: {
      const ccId = action.payload;

      return state.withMutations(map =>
        map.setIn(['volumeDriverMappingSetStates', ccId, 'editing'], true)
          .setIn(['pristineVolumeDriverMappingSets', ccId], map.getIn(['volumeDriverMappingSets', ccId])));
    }

    case SET_VOLUME_DRIVER_MAPPING_SET_MODEL_PROPERTY: {
      const {volumeDriverMappingSetId: ccId, name, value} = action.payload;

      return state.setIn(['volumeDriverMappingSets', ccId, name], value);
    }

    case CANCEL_EDIT_VOLUME_DRIVER_MAPPING_SET: {
      const ccId = action.payload;

      return state.withMutations(map =>
        map.setIn(['volumeDriverMappingSetStates', ccId, 'editing'], false)
          .setIn(['volumeDriverMappingSets', ccId], map.getIn(['pristineVolumeDriverMappingSets', ccId]))
          .deleteIn(['volumeDriverMappingSetsValidationErrors', ccId]));
    }

    case UPDATE_VOLUME_DRIVER_MAPPING_SET_PENDING:
      return state.setIn(['volumeDriverMappingSetStates', action.payload, 'saving'], true);

    case UPDATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED: {
      const volumeDriverMappingSet = action.payload.data;
      const ccId = volumeDriverMappingSet.id;
      const volumeDriverMappingSetMap = fromJS(volumeDriverMappingSet);

      return state.withMutations(map => {
        map.setIn(['pristineVolumeDriverMappingSets', ccId], volumeDriverMappingSetMap)
          .setIn(['volumeDriverMappingSets', ccId], volumeDriverMappingSetMap)
          .setIn(['volumeDriverMappingSetStates', ccId, 'editing'], false)
          .setIn(['volumeDriverMappingSetStates', ccId, 'saving'], false)
          .deleteIn(['volumeDriverMappingSetsValidationErrors', ccId]);
      });
    }

    case UPDATE_VOLUME_DRIVER_MAPPING_SET_REJECTED: {
      const {payload} = action;
      const ccId = Number(/\d+$/.exec(payload.config.url)[0]);
      const {status, data} = payload.response || {};

      return state.withMutations(map => {
        map.setIn(['volumeDriverMappingSetStates', ccId, 'saving'], false);

        if (status === 400) {
          map.setIn(['volumeDriverMappingSetsValidationErrors', ccId], fromJS(data));
        } else {
          map.deleteIn(['volumeDriverMappingSetsValidationErrors', ccId]);
        }
      });
    }

    case DELETE_VOLUME_DRIVER_MAPPING_SET_FULFILLED: {
      const {volumeDriverMappingSetId: ccId} = action.payload.data;

      return state.withMutations(map => {
        map.deleteIn(['volumeDriverMappingSets', ccId])
          .deleteIn(['pristineVolumeDriverMappingSets', ccId])
          .deleteIn(['volumeDriverMappingSetStates', ccId])
          .deleteIn(['volumeDriverMappingSetsValidationErrors', ccId]);
      });
    }

    default:
      return state;
  }
}
