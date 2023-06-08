import {Map} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  SHOW_STANDARD_ELEMENT_ITEM_FREQUENCY_FORMULA,
  HIDE_STANDARD_ELEMENT_ITEM_FREQUENCY_FORMULA,
  LOAD_CHARACTERISTICS_FOR_DEPARTMENT_FULFILLED,
  LOAD_CHARACTERISTICS_FOR_DEPARTMENT_PENDING,
  SET_FREQUENCY_FORMULA_MODAL_VALUE,
  TOGGLE_STANDARD_ELEMENT_ITEM_FREQUENCY_FORMULA,
} from '../../actions';

const initialState = new Map({
  show: false,
  loading: false,
  standardElementId: 0,
  frequencyFormula: '',
  filter: '',
  characteristics: Map(),
  mode: '',
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CHARACTERISTICS_FOR_DEPARTMENT_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('characteristics', modelsArrayToMapById(action.payload.data))
      );

    case LOAD_CHARACTERISTICS_FOR_DEPARTMENT_PENDING:
      return state.set('loading', true);

    case SHOW_STANDARD_ELEMENT_ITEM_FREQUENCY_FORMULA: {
      const {standardItemId, frequencyFormula, mode} = action.payload;
      return state.withMutations(map =>
        map.set('show', true)
          .set('standardItemId', Number(standardItemId))
          .set('frequencyFormula', frequencyFormula)
          .set('mode', mode)
      );
    }

    case SET_FREQUENCY_FORMULA_MODAL_VALUE: {
      const {name, value} = action.payload;
      return state.set(name, value);
    }

    case HIDE_STANDARD_ELEMENT_ITEM_FREQUENCY_FORMULA:
      return initialState;

    case TOGGLE_STANDARD_ELEMENT_ITEM_FREQUENCY_FORMULA:
      return state.update('show', v => !v).update('filter', () => '');

    default:
      return state;
  }
}
