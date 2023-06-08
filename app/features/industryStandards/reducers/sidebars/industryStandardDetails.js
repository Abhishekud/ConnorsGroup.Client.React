import {fromJS, Map} from 'immutable';
import {
  LOAD_INDUSTRY_STANDARD_FULFILLED,
  LOAD_INDUSTRY_STANDARD_PENDING,
  LOAD_INDUSTRY_STANDARD_REJECTED,
  TOGGLE_INDUSTRY_STANDARD_DETAILS_SIDEBAR,
} from '../../actions';

const initialState = Map({
  newStandard: false,
  open: false,

  id: null,
  model: Map({
    filingFieldValues: Map(),
  }),
  pristineModel: Map(),
  validationErrors: Map(),

});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_INDUSTRY_STANDARD_PENDING:
      return state.set('open', false);

    case LOAD_INDUSTRY_STANDARD_FULFILLED: {
      const {id, details} = action.payload.data;
      const model = fromJS(details);

      return state.withMutations(map =>
        map.set('open', map.get('newStandard'))
          .set('newStandard', false)
          .set('id', id)
          .set('pristineModel', model)
          .set('model', model)
          .set('validationErrors', Map()));
    }


    case LOAD_INDUSTRY_STANDARD_REJECTED:
      return initialState;

    case TOGGLE_INDUSTRY_STANDARD_DETAILS_SIDEBAR: {
      if (state.get('open')) {
        return state.withMutations(map =>
          map.set('open', false)
            .set('model', map.get('pristineModel'))
            .set('validationErrors', Map())
        );
      }

      return state.set('open', true);
    }


    default:
      return state;
  }
}
