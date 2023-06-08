import {fromJS, Map} from 'immutable';
import {
  SHOW_DUPLICATE_STANDARD,
  CANCEL_DUPLICATE_STANDARD,
  SET_DUPLICATE_STANDARD_MODEL_PROPERTY,
  SET_DUPLICATE_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY,
  DUPLICATE_STANDARD_PENDING,
  DUPLICATE_STANDARD_FULFILLED,
  DUPLICATE_STANDARD_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  standardId: null,
  validationErrors: new Map(),
  model: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DUPLICATE_STANDARD: {
      const {standardId, model} = action.payload;

      return initialState.withMutations(map => {
        map.set('show', true)
          .set('standardId', standardId)
          .set('model', model)
          .updateIn(['model', 'filingFieldValues'], x => x.map(y => y.delete('standardId')));
      });
    }

    case SET_DUPLICATE_STANDARD_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_DUPLICATE_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY: {
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

    case DUPLICATE_STANDARD_PENDING:
      return state.set('saving', true);

    case CANCEL_DUPLICATE_STANDARD:
    case DUPLICATE_STANDARD_FULFILLED:
      return initialState;

    case DUPLICATE_STANDARD_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
