import {Map, fromJS} from 'immutable';
import {
  SHOW_IMPORT_VOLUME_DRIVER_MAPPINGS_VALIDATION_ERRORS,
  CLOSE_IMPORT_VOLUME_DRIVER_MAPPINGS_VALIDATION_ERRORS,
  IMPORT_VOLUME_DRIVER_MAPPINGS_FULFILLED,
} from '../../actions';

const initialState = new Map({
  show: false,
  createdRecordCount: null,
  updatedRecordCount: null,
  totalRecordCount: null,
  validationErrors: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_IMPORT_VOLUME_DRIVER_MAPPINGS_VALIDATION_ERRORS:
      return state.set('show', true);

    case IMPORT_VOLUME_DRIVER_MAPPINGS_FULFILLED: {
      const {createdRecordCount, updatedRecordCount, totalRecordCount, validationErrors} = action.payload.data;

      return state.withMutations(map =>
        map.set('createdRecordCount', createdRecordCount)
          .set('updatedRecordCount', updatedRecordCount)
          .set('totalRecordCount', totalRecordCount)
          .set('validationErrors', fromJS(validationErrors)));
    }

    case CLOSE_IMPORT_VOLUME_DRIVER_MAPPINGS_VALIDATION_ERRORS:
      return initialState;

    default:
      return state;
  }
}
