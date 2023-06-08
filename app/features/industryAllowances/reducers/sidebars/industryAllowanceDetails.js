import {fromJS, Map} from 'immutable';
import {
  LOAD_INDUSTRY_TYPICAL_ALLOWANCE_PENDING,
  LOAD_INDUSTRY_TYPICAL_ALLOWANCE_FULFILLED,
  LOAD_INDUSTRY_TYPICAL_ALLOWANCE_REJECTED,
  TOGGLE_INDUSTRY_ALLOWANCE_DETAILS_SIDEBAR,
} from '../../actions';

const initialState = Map({
  show: false,
  loading: false,
  workingModel: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_INDUSTRY_TYPICAL_ALLOWANCE_PENDING:
      return state.set('loading', false);

    case LOAD_INDUSTRY_TYPICAL_ALLOWANCE_FULFILLED: {
      const {allowance} = action.payload.data;
      const model = fromJS(allowance);

      return state.withMutations(map =>
        map.set('show', false)
          .set('workingModel', model)
      );
    }

    case LOAD_INDUSTRY_TYPICAL_ALLOWANCE_REJECTED:
      return state.set('loading', true);

    case TOGGLE_INDUSTRY_ALLOWANCE_DETAILS_SIDEBAR: {
      return state.update('show', show => !show);
    }

    default:
      return state;
  }
}
