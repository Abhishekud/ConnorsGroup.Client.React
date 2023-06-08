import {Map} from 'immutable';
import {
  LOAD_STANDARD_NON_MOST_ELEMENT_PENDING,
  LOAD_STANDARD_NON_MOST_ELEMENT_FULFILLED,
  LOAD_STANDARD_NON_MOST_ELEMENT_REJECTED,
  LOAD_STANDARD_NON_MOST_ELEMENT_REVISION_FULFILLED,
  LOAD_STANDARD_NON_MOST_ELEMENT_REVISION_REJECTED,
  LOAD_STANDARD_NON_MOST_ELEMENT_REVISION_PENDING,
} from '../../actions';
import {
  UPDATE_NON_MOST_STEP_FULFILLED,
} from '../../../nonMOSTAnalysis/actions';

const initialState = Map({
  loading: false,
  name: '',
  measuredTimeMeasurementUnits: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_STANDARD_NON_MOST_ELEMENT_PENDING:
    case LOAD_STANDARD_NON_MOST_ELEMENT_REVISION_PENDING:
      return initialState.set('loading', true);

    case LOAD_STANDARD_NON_MOST_ELEMENT_FULFILLED:
    case LOAD_STANDARD_NON_MOST_ELEMENT_REVISION_FULFILLED: {
      const {name, measuredTimeMeasurementUnits} = action.payload.data;

      return state.withMutations(map => {
        map.set('loading', false)
          .set('name', name)
          .set('measuredTimeMeasurementUnits', measuredTimeMeasurementUnits);
      });
    }

    case UPDATE_NON_MOST_STEP_FULFILLED:
      return state.set('measuredTimeMeasurementUnits', action.payload.data.parentMeasuredTimeMeasurementUnits);

    case LOAD_STANDARD_NON_MOST_ELEMENT_REJECTED:
    case LOAD_STANDARD_NON_MOST_ELEMENT_REVISION_REJECTED:
      return state.set('loading', false);

    default:
      return state;
  }
}
