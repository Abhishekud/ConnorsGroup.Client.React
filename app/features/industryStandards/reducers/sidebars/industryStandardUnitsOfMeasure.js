import {modelsArrayToMapById} from '../../../shared/services';
import {Map} from 'immutable';
import {
  LOAD_INDUSTRY_STANDARD_FULFILLED,
  LOAD_INDUSTRY_STANDARD_REJECTED,
} from '../../actions';

const initialState = Map();

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_INDUSTRY_STANDARD_FULFILLED: {
      const {standardUnitsOfMeasure} = action.payload.data;

      return modelsArrayToMapById(standardUnitsOfMeasure);
    }

    case LOAD_INDUSTRY_STANDARD_REJECTED:
      return initialState;

    default:
      return state;
  }
}
