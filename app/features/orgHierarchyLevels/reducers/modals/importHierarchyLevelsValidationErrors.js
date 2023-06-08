import {fromJS, Map} from 'immutable';
import {
  CLOSE_IMPORT_HIERARCHY_LEVELS_VALIDATION_ERRORS_MODAL,
  IMPORT_HIERARCHY_LEVELS_FULFILLED,
} from '../../actions';

const initialState = new Map({
  show: false,
  totalRecordCount: 0,
  createdHierarchyRecordCount: 0,
  createdHierarchyOptionRecordCount: 0,
  validationErrors: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {

    case IMPORT_HIERARCHY_LEVELS_FULFILLED: {
      const {totalRecordCount, createdHierarchyRecordCount, createdHierarchyOptionRecordCount, validationErrors} = action.payload.data;

      return state.withMutations(map =>
        map.set('totalRecordCount', totalRecordCount)
          .set('createdHierarchyRecordCount', createdHierarchyRecordCount)
          .set('createdHierarchyOptionRecordCount', createdHierarchyOptionRecordCount)
          .set('validationErrors', fromJS(validationErrors))
          .set('show', Object.keys(validationErrors).length > 0));
    }

    case CLOSE_IMPORT_HIERARCHY_LEVELS_VALIDATION_ERRORS_MODAL:
      return initialState;

    default:
      return state;
  }
}
