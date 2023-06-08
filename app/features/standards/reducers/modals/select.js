import {SHOW_SELECT_UNIT_OF_MEASURE, CANCEL_SELECT_UNIT_OF_MEASURE, SELECT_UNIT_OF_MEASURE_FOR_ELEMENT, OPEN_ELEMENT_SEARCH} from '../../actions';
import {Map} from 'immutable';
import {CREATE_UNIT_OF_MEASURE_FULFILLED} from '../../../unitsOfMeasure/actions';

const initialState = new Map({
  show: false,
  selectedUnitOfMeasure: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case SHOW_SELECT_UNIT_OF_MEASURE:
      return state.set('show', true);

    case CANCEL_SELECT_UNIT_OF_MEASURE: {
      return initialState;
    }

    case SELECT_UNIT_OF_MEASURE_FOR_ELEMENT:
      return state.set('selectedUnitOfMeasure', action.payload);

    case CREATE_UNIT_OF_MEASURE_FULFILLED:{
      return state.set('selectedUnitOfMeasure', action.payload.data.id.toString());
    }

    case OPEN_ELEMENT_SEARCH:
      return state.set('selectedUnitOfMeasure', initialState.get('selectedUnitOfMeasure'));

    default:
      return state;
  }
}

