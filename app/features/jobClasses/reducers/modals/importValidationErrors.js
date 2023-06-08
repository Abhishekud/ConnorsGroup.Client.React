import {Map, fromJS} from 'immutable';
import {
  TOGGLE_IMPORT_JOB_CLASSES_VALIDATION_ERRORS,
  IMPORT_JOB_CLASSES_FULFILLED,
} from '../../actions';

const initialState = new Map({
  show: false,
  createdRecordCount: null,
  totalRecordCount: null,
  skippedRecordCount: null,
  validationErrors: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_IMPORT_JOB_CLASSES_VALIDATION_ERRORS:
      return state.update('show', show => !show);

    case IMPORT_JOB_CLASSES_FULFILLED: {
      const {createdRecordCount, totalRecordCount, skippedRecordCount, validationErrors} = action.payload.data;

      return state.withMutations(map =>
        map.set('createdRecordCount', createdRecordCount)
          .set('totalRecordCount', totalRecordCount)
          .set('skippedRecordCount', skippedRecordCount)
          .set('validationErrors', fromJS(validationErrors)));
    }

    default:
      return state;
  }
}
