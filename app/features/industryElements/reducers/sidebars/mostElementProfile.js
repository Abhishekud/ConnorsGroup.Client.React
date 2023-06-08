import {Map} from 'immutable';
import {
  INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_PENDING,
  INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_FULFILLED,
  TOGGLE_MOST_ELEMENT_PROFILE_SIDEBAR,
} from '../../actions';

const initialState = Map({
  show: false,
  elementDetailsModel: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_PENDING:
      return initialState;

    case INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_FULFILLED: {
      const {
        id, name, measuredTimeMeasurementUnits,
        elementUnitOfMeasureName, elementActivityName, applicatorId, applicatorName, lastEditorName,
        applicatorInstructions,
      } = action.payload.data;
      const model = Map({
        id, name, measuredTimeMeasurementUnits,
        elementUnitOfMeasureName, elementActivityName, applicatorId, applicatorName, lastEditorName,
        applicatorInstructions,
      });

      return state.withMutations(map => {
        map.set('elementDetailsModel', model);
      });
    }

    case TOGGLE_MOST_ELEMENT_PROFILE_SIDEBAR:
      return state.update('show', show => !show);


    default:
      return state;
  }
}
