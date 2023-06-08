import {Map, fromJS} from 'immutable';
import {
  CLOSE_IMPORT_USERS_VALIDATION_ERRORS_MODAL,
  IMPORT_USERS_FULFILLED,
} from '../../actions';

const initialState = new Map({
  show: false,
  createdRecordCount: 0,
  totalRecordCount: 0,
  skippedRecordCount: 0,
  validationErrors: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {

    case IMPORT_USERS_FULFILLED: {
      const {createdRecordCount, totalRecordCount, skippedRecordCount} = action.payload.data;
      const validationErrors = fromJS(action.payload.data.validationErrors);

      return state.withMutations(map =>
        map.set('createdRecordCount', createdRecordCount)
          .set('totalRecordCount', totalRecordCount)
          .set('skippedRecordCount', skippedRecordCount)
          .set('validationErrors', validationErrors)
          .set('show', Boolean(validationErrors.size)));
    }

    case CLOSE_IMPORT_USERS_VALIDATION_ERRORS_MODAL:
      return initialState;

    default:
      return state;
  }
}
