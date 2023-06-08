import {Map, List} from 'immutable';
import {
  SHOW_COPY_REST_PREFERENCE,
  SET_COPY_REST_PREFERENCE_REQUEST,
  ADD_INDUSTRY_ALLOWANCES_TO_CLIENT_FULFILLED,
  ADD_INDUSTRY_ALLOWANCES_TO_CLIENT_PENDING,
  ADD_INDUSTRY_ALLOWANCES_TO_CLIENT_REJECTED,
  CANCEL_COPY_REST_PREFERENCE,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    createCopyRestOptions: null,
  }),
  duplicateRestAllowances: new List(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_COPY_REST_PREFERENCE:
      return state.set('show', true);

    case CANCEL_COPY_REST_PREFERENCE:
      return initialState;

    case ADD_INDUSTRY_ALLOWANCES_TO_CLIENT_PENDING:
      return state.set('saving', true);

    case ADD_INDUSTRY_ALLOWANCES_TO_CLIENT_FULFILLED:
    { const {data} = action.payload;
      return state.withMutations(map => {
        map.set('duplicateRestAllowances', data.duplicateRestAllowances ? data.duplicateRestAllowances : new List())
          .set('show', false)
          .set('saving', false)
          .setIn(['model', 'createCopyRestOptions'], null);
      });
    }

    case ADD_INDUSTRY_ALLOWANCES_TO_CLIENT_REJECTED:
      return initialState;

    case SET_COPY_REST_PREFERENCE_REQUEST: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    default:
      return state;
  }
}
