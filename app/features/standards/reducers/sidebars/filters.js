import {Map, List, fromJS} from 'immutable';
import {
  LOAD_STANDARDS_LIST_PENDING,
  LOAD_STANDARDS_LIST_FULFILLED,
  LOAD_STANDARDS_LIST_REJECTED,
  TOGGLE_STANDARDS_LIST_FILTERS_SIDEBAR,
  SET_STANDARDS_LIST_FILTERS_MODEL_PROPERTY,
  CLEAR_STANDARDS_LIST_FILTERS,
  SET_STANDARD_LIST_FILTERS_FILING_FIELD_MODEL_PROPERTY,
} from '../../actions';

const initialState = Map({
  applying: false,
  show: false,
  model: Map(),
  pristine: Map(),
  filingFieldValues: List(),
  appliedCount: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_STANDARDS_LIST_FILTERS_SIDEBAR:
      return state.set('show', !state.get('show'));

    case LOAD_STANDARDS_LIST_PENDING:
      return state.withMutations(map =>
        map.set('applying', true)
          .set('pristine', map.get('model')));

    case LOAD_STANDARDS_LIST_FULFILLED: {
      const appliedFilterCount = state.get('model').filter(value => value).size + state.get('filingFieldValues').filter(value => value).size;
      return state.withMutations(map =>
        map.set('applying', false)
          .set('appliedCount', appliedFilterCount));
    }

    case LOAD_STANDARDS_LIST_REJECTED:
      return state.set('applying', false);

    case SET_STANDARDS_LIST_FILTERS_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_STANDARD_LIST_FILTERS_FILING_FIELD_MODEL_PROPERTY: {
      const {id, value} = action.payload;
      const filingFields = state.get('filingFieldValues');

      if (filingFields === null) {
        return state.set('filingFieldValues',
          fromJS([{standardFilingFieldId: id, standardFileFieldOptionId: value}]));
      }

      const index = filingFields.findIndex(y => y.get('standardFilingFieldId') === id);

      return state.update('filingFieldValues', x => {
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

    case CLEAR_STANDARDS_LIST_FILTERS:
      return state.withMutations(map =>
        map.set('model', Map())
          .set('pristine', Map())
          .set('filingFieldValues', List()));

    default:
      return state;
  }
}
