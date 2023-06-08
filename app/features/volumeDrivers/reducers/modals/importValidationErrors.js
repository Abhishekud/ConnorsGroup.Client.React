import {Map, fromJS} from 'immutable';
import {
  SHOW_IMPORT_VOLUME_DRIVERS_VALIDATION_ERRORS,
  CLOSE_IMPORT_VOLUME_DRIVERS_VALIDATION_ERRORS,
  IMPORT_VOLUME_DRIVERS_FULFILLED,
} from '../../actions';

const initialState = new Map({
  show: false,
  successfulRecordCount: null,
  totalRecordCount: null,
  validationErrors: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_VOLUME_DRIVERS_VALIDATION_ERRORS:
      return state.set('show', true);

    case IMPORT_VOLUME_DRIVERS_FULFILLED: {
      const {successfulRecordCount, totalRecordCount, validationErrors} = action.payload.data;

      return state.withMutations(map =>
        map.set('successfulRecordCount', successfulRecordCount)
          .set('totalRecordCount', totalRecordCount)
          .set('validationErrors', fromJS(validationErrors)));
    }

    case CLOSE_IMPORT_VOLUME_DRIVERS_VALIDATION_ERRORS:
      return initialState;

    default:
      return state;
  }
}
