import {Map} from 'immutable';
import {
  LOAD_INDUSTRY_ALLOWANCE_REST_PENDING,
  LOAD_INDUSTRY_ALLOWANCE_REST_FULFILLED,
  LOAD_INDUSTRY_ALLOWANCE_REST_REJECTED,
} from '../../actions';

const initialState = Map({
  loading: false,
  workingModel: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_INDUSTRY_ALLOWANCE_REST_PENDING:
      return state.set('loading', false);

    case LOAD_INDUSTRY_ALLOWANCE_REST_FULFILLED: {
      const data = action.payload.data;
      return state.set('workingModel', Map(data));
    }

    case LOAD_INDUSTRY_ALLOWANCE_REST_REJECTED:
      return state.set('loading', true);

    default:
      return state;
  }
}
