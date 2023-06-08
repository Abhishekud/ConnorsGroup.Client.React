import {
  CANCEL_CREATE_STANDARD,
  CREATE_STANDARD_FULFILLED,
  CREATE_STANDARD_PENDING,
  CREATE_STANDARD_REJECTED,
  SET_CREATE_STANDARD_MODEL_PROPERTY,
  SET_CREATE_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY,
  SHOW_CREATE_STANDARD,
} from '../../actions';
import {fromJS, Map, List} from 'immutable';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
    filingFieldValues: List(),
    fixed: true,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_STANDARD:
      return initialState.set('show', true);

    case SET_CREATE_STANDARD_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_CREATE_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY: {
      const {id, value} = action.payload;
      const filingFields = state.getIn(['model', 'filingFieldValues']);
      if (filingFields === null) {
        return state.setIn(['model', 'filingFieldValues'],
          fromJS([{standardFilingFieldId: id, standardFileFieldOptionId: value}]));
      }
      const index = filingFields.findIndex(y => y.get('standardFilingFieldId') === id);
      return state.updateIn(['model', 'filingFieldValues'], x => {
        if (index === -1) {
          if (value === null) return x;
          return x.push(fromJS({
            standardFilingFieldId: id,
            standardFilingFieldOptionId: value,
          }));
        }
        if (value === null) {
          return x.delete(index);
        }
        return x.set(index, fromJS({
          standardFilingFieldId: id,
          standardFilingFieldOptionId: value,
        }));
      });
    }

    case CREATE_STANDARD_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_STANDARD:
    case CREATE_STANDARD_FULFILLED:
      return initialState;

    case CREATE_STANDARD_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
