import {Map} from 'immutable';
import {
  INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_MOST_ELEMENT_DETAILS_PENDING,
  INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_MOST_ELEMENT_DETAILS_FULFILLED,
  INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_MOST_ELEMENT_DETAILS_REJECTED,
} from '../../actions';

const initialState = Map({
  loading: false,
  name: '',
  measuredTimeMeasurementUnits: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_MOST_ELEMENT_DETAILS_PENDING:
      return initialState.set('loading', true);

    case INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_MOST_ELEMENT_DETAILS_FULFILLED: {
      const {name, measuredTimeMeasurementUnits} = action.payload.data;
      return state.withMutations(map => {
        map.set('loading', false)
          .set('name', name)
          .set('measuredTimeMeasurementUnits', measuredTimeMeasurementUnits);
      });
    }

    case INDUSTRY_STANDARDS_LOAD_INDUSTRY_STANDARD_MOST_ELEMENT_DETAILS_REJECTED:
      return state.set('loading', false);

    default:
      return state;
  }
}
