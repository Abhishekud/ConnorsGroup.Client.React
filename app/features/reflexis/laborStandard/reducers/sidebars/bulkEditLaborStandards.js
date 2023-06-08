import {fromJS} from 'immutable';
import {
  SHOW_BULK_EDIT_LABOR_STANDARDS_SIDEBAR,
  CANCEL_BULK_EDIT_LABOR_STANDARDS,
  SET_LABOR_STANDARDS_BULK_EDIT_MODEL_PROPERTY,
  BULK_UPDATE_LABOR_STANDARDS_FULFILLED,
  BULK_UPDATE_LABOR_STANDARDS_REJECTED,
  BULK_UPDATE_LABOR_STANDARDS_PENDING,
} from '../../actions';

const initialState = fromJS({
  model: {
    updateAttribute: false,
    attribute: null,
  },
  show: false,
  dirty: false,
  saving: false,
  validationErrors: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case (SHOW_BULK_EDIT_LABOR_STANDARDS_SIDEBAR):
      return state.set('show', true);

    case (CANCEL_BULK_EDIT_LABOR_STANDARDS):
      return state.set('show', false);

    case (SET_LABOR_STANDARDS_BULK_EDIT_MODEL_PROPERTY): {
      const {id, value} = action.payload;
      return state.setIn(['model', id], value).set('dirty', true);
    }

    case (BULK_UPDATE_LABOR_STANDARDS_PENDING):
      return state.set('saving', true);

    case (BULK_UPDATE_LABOR_STANDARDS_FULFILLED):
      return initialState;

    case (BULK_UPDATE_LABOR_STANDARDS_REJECTED):
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : null);
      });


    default:
      return state;
  }
}
