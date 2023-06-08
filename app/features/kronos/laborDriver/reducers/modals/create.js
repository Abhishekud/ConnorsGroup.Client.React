import {fromJS, Map} from 'immutable';
import {
  SHOW_CREATE_MODAL,
  HIDE_CREATE_MODAL,
  SET_PROPERTY_FOR_CREATE,

  CREATE_PENDING,
  CREATE_REJECTED,
  CREATE_FULFILLED,
} from '../../actions';
import {
  KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX,
} from '../../../constants/KronosLaborDriverTypes';

const initialState = fromJS({
  show: false,
  saving: false,
  model: {
    name: null,
    laborDriverType: null,
    number: null,
    lookBackCount: null,
    driver: null,
    genericCategory: null,
    numberPerInterval: null,
    interval: null,
  },
  validationErrors: {},
});

const volumeDriverModel = fromJS({
  numberPerInterval: null,
  interval: null,
});

const customDriverModel = fromJS({
  genericCategory: null,
  numberPerInterval: null,
  interval: null,
});

const fixedFrequencyModel = fromJS({
  number: null,
  lookBackCount: null,
  driver: null,
  genericCategory: null,
});

const fixedFrequencyDailyVolumeModel = fromJS({
  number: null,
  lookBackCount: null,
  interval: null,
});

const staticDriverModel = fromJS({
  number: null,
  lookBackCount: null,
  genericCategory: null,
});

const initialModel = fromJS({
  number: null,
  lookBackCount: null,
  driver: null,
  genericCategory: null,
  numberPerInterval: null,
  interval: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_MODAL:
      return state.set('show', true).set('model', new Map());
    case HIDE_CREATE_MODAL:
      return initialState;

    case CREATE_FULFILLED:
      return initialState;
    case CREATE_PENDING:
      return state.set('saving', true);
    case CREATE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });
    case SET_PROPERTY_FOR_CREATE: {
      if (action.payload.id === 'laborDriverType') {
        return state.withMutations(map => {
          map.setIn(['model', action.payload.id], action.payload.value);

          switch (parseInt(action.payload.value, 10)) {
            case KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX.CUSTOM_DRIVER:
              map.set('model', map.get('model').merge(customDriverModel));
              break;
            case KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX.FIXED_FREQUENCY:
              map.set('model', map.get('model').merge(fixedFrequencyModel));
              break;
            case KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX.FIXED_FREQUENCY_DAILY_VOLUME:
              map.set('model', map.get('model').merge(fixedFrequencyDailyVolumeModel));
              break;
            case KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX.STATIC_DRIVER:
              map.set('model', map.get('model').merge(staticDriverModel));
              break;
            case KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX.VOLUME_DRIVER:
              map.set('model', map.get('model').merge(volumeDriverModel));
              break;
            default:
              map.set('model', map.get('model').merge(initialModel));
              break;
          }
        });
      }
      return state.setIn(['model', action.payload.id], action.payload.value);
    }
  }
  return state;
}
