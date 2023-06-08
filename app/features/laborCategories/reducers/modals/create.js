import {
  CANCEL_CREATE_LABOR_CATEGORY,
  CREATE_LABOR_CATEGORY_FULFILLED,
  CREATE_LABOR_CATEGORY_PENDING,
  CREATE_LABOR_CATEGORY_REJECTED,
  SET_CREATE_LABOR_CATEGORY_MODEL_PROPERTY,
  SHOW_CREATE_LABOR_CATEGORY,
} from '../../actions';
import {fromJS, Map} from 'immutable';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_LABOR_CATEGORY:
      return initialState.set('show', true);

    case SET_CREATE_LABOR_CATEGORY_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_LABOR_CATEGORY_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_LABOR_CATEGORY:
    case CREATE_LABOR_CATEGORY_FULFILLED:
      return initialState;

    case CREATE_LABOR_CATEGORY_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
