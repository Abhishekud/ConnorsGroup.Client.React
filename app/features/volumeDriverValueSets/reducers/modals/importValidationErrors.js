import {Map, fromJS} from 'immutable';
import {
  IMPORT_VOLUME_DRIVER_VALUE_SETS_FULFILLED,
  TOGGLE_IMPORT_VOLUME_DRIVER_VALUE_SETS_VALIDATION_ERRORS,
} from '../../actions';

const initialState = new Map({
  show: false,
  createdRecordCount: null,
  updatedRecordCount: null,
  totalRecordCount: null,
  skippedRecordCount: null,
  validationErrors: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_IMPORT_VOLUME_DRIVER_VALUE_SETS_VALIDATION_ERRORS:
      return state.update('show', show => !show);

    case IMPORT_VOLUME_DRIVER_VALUE_SETS_FULFILLED: {
      const {createdRecordCount, updatedRecordCount, totalRecordCount, skippedRecordCount, validationErrors} = action.payload.data;

      return state.withMutations(map =>
        map.set('createdRecordCount', createdRecordCount)
          .set('updatedRecordCount', updatedRecordCount)
          .set('skippedRecordCount', skippedRecordCount)
          .set('totalRecordCount', totalRecordCount)
          .set('validationErrors', fromJS(validationErrors)));
    }

    default:
      return state;
  }
}
