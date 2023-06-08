import {fromJS, Map} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  UPLOAD_CLIENT_PHOTO_PENDING,
  UPLOAD_CLIENT_PHOTO_FULFILLED,
  UPLOAD_CLIENT_PHOTO_REJECTED,
  SAVE_BACKGROUND_COLOR_PENDING,
  SAVE_BACKGROUND_COLOR_REJECTED,
  SAVE_BACKGROUND_COLOR_FULFILLED,
  CANCEL_CHANGE_BACKGROUND_COLOR,
  SELECT_BACKGROUND_COLOR,
  SET_FIELD_VALUE,
  SAVE_SETTINGS_PENDING,
  SAVE_SETTINGS_FULFILLED,
  SAVE_SETTINGS_REJECTED,
  TRIGGER_LABOR_CALCULATION_PENDING,
  SHOW_CONFIRM_RESET_MODAL,
  HIDE_CONFIRM_RESET_MODAL,
  RESET_SITE_FULFILLED,
  RESET_SITE_REJECTED,
  RESET_SITE_PENDING,
} from '../../actions';
import {
  LOAD_BRAND_PENDING,
  LOAD_BRAND_FULFILLED,
  LOAD_BRAND_REJECTED,
  LOAD_SETTINGS_FULFILLED,
  POLL_BACKGROUND_JOBS_FULFILLED,
} from '../../../shared/actions';

const initialState = Map({
  loading: false,
  saving: false,
  pristineColor: '',
  color: '',
  logo: Map(),
  fields: new Map(),
  validationErrors: new Map(),
  isPrestine: true,
  confirmResetModalVisible: false,
  modalSaving: false,
  actions: Map({
    laborCalculationDisabled: true,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case UPLOAD_CLIENT_PHOTO_PENDING:
    case LOAD_BRAND_PENDING:
      return state.set('loading', true);

    case SET_FIELD_VALUE: {
      return state.withMutations(map =>
        map.setIn(['fields', action.payload.id, 'value'], action.payload.value)
          .set('isPrestine', false));
    }

    case SELECT_BACKGROUND_COLOR:
      return state.set('color', action.payload.color);

    case CANCEL_CHANGE_BACKGROUND_COLOR:
      return state.set('color', state.get('pristineColor'));

    case UPLOAD_CLIENT_PHOTO_REJECTED:
    case SAVE_BACKGROUND_COLOR_REJECTED:
    case LOAD_BRAND_REJECTED:
      return state.set('loading', false);

    case SAVE_BACKGROUND_COLOR_FULFILLED:
    case LOAD_BRAND_FULFILLED: {
      const {color} = action.payload.data;
      return state.withMutations(map =>
        map.set('loading', false)
          .set('saving', false)
          .set('pristineColor', color)
          .set('color', color));
    }

    case UPLOAD_CLIENT_PHOTO_FULFILLED: {
      const {logo} = action.payload.data;
      return state.withMutations(map =>
        map.set('loading', false)
          .set('logo', logo));
    }

    case LOAD_SETTINGS_FULFILLED:
      return state.withMutations(map =>
        map.set('fields', modelsArrayToMapById(action.payload.data))
          .set('isPrestine', true)
          .set('validationErrors', initialState.get('validationErrors')));

    case SAVE_SETTINGS_PENDING:
    case SAVE_BACKGROUND_COLOR_PENDING:
      return state.set('saving', true);


    case TRIGGER_LABOR_CALCULATION_PENDING:
      return state.setIn(['actions', 'laborCalculationDisabled'], true);

    case SAVE_SETTINGS_FULFILLED:
    case SAVE_SETTINGS_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        if (status === 400) {
          map.set('validationErrors', fromJS(data));
        } else {
          map.set('validationErrors', initialState.get('validationErrors'));
        }
      });

    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const activeJobs = action.payload.data.activeJobs;
      return state.setIn(['actions', 'laborCalculationDisabled'], activeJobs);
    }

    case SHOW_CONFIRM_RESET_MODAL:
      return state.set('confirmResetModalVisible', true);

    case HIDE_CONFIRM_RESET_MODAL:
      return state.set('confirmResetModalVisible', false);

    case RESET_SITE_PENDING:
      return state.set('modalSaving', true);

    case RESET_SITE_FULFILLED:
      return state.withMutations(map => {
        map.set('confirmResetModalVisible', initialState.get('confirmResetModalVisible'));
        map.set('modalSaving', initialState.get('modalSaving'));
      });

    case RESET_SITE_REJECTED:
      return state.withMutations(map => {
        map.set('confirmResetModalVisible', initialState.get('confirmResetModalVisible'));
        map.set('modalSaving', initialState.get('modalSaving'));

        const {status, data} = action.payload.response || {};
        if (status === 400) {
          map.set('validationErrors', fromJS(data));
        } else {
          map.set('validationErrors', initialState.get('validationErrors'));
        }
      });

    default:
      return state;
  }
}
