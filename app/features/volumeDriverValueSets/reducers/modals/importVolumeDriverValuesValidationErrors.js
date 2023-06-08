import {Map, fromJS} from 'immutable';
import {
  CREATE_VOLUME_DRIVER_VALUE_SET_FULFILLED,
  TOGGLE_IMPORT_VOLUME_DRIVER_VALUES_VALIDATION_ERRORS,
} from '../../actions';

const initialState = new Map({
  show: false,
  createdRecordCount: null,
  totalRecordCount: null,
  validationErrors: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_IMPORT_VOLUME_DRIVER_VALUES_VALIDATION_ERRORS:
      return state.update('show', show => !show);

    case CREATE_VOLUME_DRIVER_VALUE_SET_FULFILLED: {
      const {createdRecordCount, totalRecordCount, validationErrors} = action.payload.data.importVolumeDriverValuesResponse;

      return state.withMutations(map =>
        map.set('createdRecordCount', createdRecordCount)
          .set('totalRecordCount', totalRecordCount)
          .set('validationErrors', fromJS(validationErrors)));
    }

    default:
      return state;
  }
}
