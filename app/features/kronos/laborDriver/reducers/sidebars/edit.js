import {fromJS, Map} from 'immutable';
import {
  SET_PROPERTY_FOR_EDIT,
  CANCEL_EDIT,
  LOAD_LABOR_DRIVER_FULFILLED,

  SAVE_EDIT_FULFILLED,
  SAVE_EDIT_REJECTED,
  SAVE_EDIT_PENDING,

  DELETE_FULFILLED,

  CREATE_FULFILLED,
} from '../../actions';

import {
  KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX,
} from '../../../constants/KronosLaborDriverTypes';

const initialState = fromJS({
  show: false,
  saving: false,
  model: {
    id: null,
    name: null,
    laborDriverType: null,
    number: null,
    lookBackCount: null,
    driver: null,
    genericCategory: null,
    numberPerInterval: null,
    interval: null,
  },
  dirty: false,
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
    case CREATE_FULFILLED:
    case LOAD_LABOR_DRIVER_FULFILLED: {
      return state.set('model', fromJS(action.payload.data)).set('show', true).set('dirty', false);
    }

    case CANCEL_EDIT:
    case DELETE_FULFILLED:
      return initialState;
    case SAVE_EDIT_FULFILLED:
      return initialState;
    case SAVE_EDIT_PENDING:
      return state.set('saving', true);
    case SAVE_EDIT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case SET_PROPERTY_FOR_EDIT: {
      if (action.payload.id === 'laborDriverType') {
        return state.withMutations(map => {
          map.setIn(['model', action.payload.id], action.payload.value).set('dirty', true);

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
      return state.setIn(['model', action.payload.id], action.payload.value).set('dirty', true);
    }
  }
  return state;
}

