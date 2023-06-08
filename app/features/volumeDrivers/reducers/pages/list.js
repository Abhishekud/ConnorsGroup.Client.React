import {modelsArrayToMapById} from '../../../shared/services';
import {Map, fromJS} from 'immutable';
import {
  LOAD_VOLUME_DRIVERS_LIST_PENDING,
  LOAD_VOLUME_DRIVERS_LIST_FULFILLED,
  LOAD_VOLUME_DRIVERS_LIST_REJECTED,
  SORT_VOLUME_DRIVERS_LIST,
  CREATE_VOLUME_DRIVER_FULFILLED,
  DELETE_VOLUME_DRIVER_FULFILLED,
  UPDATE_VOLUME_DRIVER_FULFILLED,
  SELECT_VOLUME_DRIVER,
  CLEAR_SELECTED_VOLUME_DRIVER,
  CLOSE_VOLUME_DRIVERS_LIST_EDIT_SIDEBAR,
  FILTER_VOLUME_DRIVERS_LIST,
} from '../../actions';

const initialState = Map({
  loading: false,
  volumeDrivers: Map(),
  sort: [{field: 'name', dir: 'asc'}],
  filter: null,
  selectedVolumeDriverId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_VOLUME_DRIVERS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_VOLUME_DRIVERS_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('volumeDrivers', modelsArrayToMapById(action.payload.data))
          .set('selectedVolumeDriverId', null));

    case LOAD_VOLUME_DRIVERS_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE_VOLUME_DRIVER_FULFILLED:
    case UPDATE_VOLUME_DRIVER_FULFILLED: {
      const {data} = action.payload;
      return state.setIn(['volumeDrivers', data.id], fromJS(data));
    }

    case DELETE_VOLUME_DRIVER_FULFILLED:
      return state.deleteIn(['volumeDrivers', action.payload.data]);

    case SORT_VOLUME_DRIVERS_LIST:
      return state.set('sort', action.payload);

    case FILTER_VOLUME_DRIVERS_LIST:
      return state.set('filter', action.payload);

    case SELECT_VOLUME_DRIVER:
      return state.withMutations(m =>
        m.set('selectedVolumeDriverId', action.payload.get('id'))
          .deleteIn(['volumeDrivers', state.get('selectedVolumeDriverId'), 'selected'])
          .setIn(['volumeDrivers', action.payload.get('id'), 'selected'], true)
      );

    case CLEAR_SELECTED_VOLUME_DRIVER:
    case CLOSE_VOLUME_DRIVERS_LIST_EDIT_SIDEBAR:
      return state.withMutations(m =>
        m.set('selectedVolumeDriverId', null)
          .deleteIn(['volumeDrivers', state.get('selectedVolumeDriverId'), 'selected'])
      );

    default:
      return state;
  }
}
