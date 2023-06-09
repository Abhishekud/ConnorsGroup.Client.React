import {modelsArrayToMapById} from '../../../shared/services';
import {Map} from 'immutable';
import {
  ADD_ELEMENTS_FULFILLED,
  BULK_DELETE_SELECTED_STANDARD_ITEMS_FULFILLED,
  BULK_PASTE_STANDARD_ITEMS_FULFILLED,
  CREATE_STANDARD_ELEMENT_FULFILLED,
  DELETE_STANDARD_ELEMENTS_FULFILLED,
  DELETE_STANDARD_ELEMENT_GROUP_FULFILLED,
  LOAD_STANDARD_FULFILLED,
  LOAD_STANDARD_REJECTED,
  LOAD_STANDARD_REVISION_FULFILLED,
  REFRESH_STANDARD_TIME_FULFILLED,
  UPDATE_STANDARD_ELEMENT_FULFILLED,
  UPDATE_STANDARD_ELEMENT_GROUP_FULFILLED,
  UPDATE_STANDARD_FULFILLED,
} from '../../actions';

const initialState = Map();

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ELEMENTS_FULFILLED:
    case BULK_DELETE_SELECTED_STANDARD_ITEMS_FULFILLED:
    case BULK_PASTE_STANDARD_ITEMS_FULFILLED:
    case CREATE_STANDARD_ELEMENT_FULFILLED:
    case UPDATE_STANDARD_FULFILLED:
    case UPDATE_STANDARD_ELEMENT_FULFILLED:
    case UPDATE_STANDARD_ELEMENT_GROUP_FULFILLED:
    case DELETE_STANDARD_ELEMENTS_FULFILLED:
    case DELETE_STANDARD_ELEMENT_GROUP_FULFILLED:
    case LOAD_STANDARD_FULFILLED:
    case LOAD_STANDARD_REVISION_FULFILLED:
    case REFRESH_STANDARD_TIME_FULFILLED: {
      const {standardUnitsOfMeasure} = action.payload.data;

      return modelsArrayToMapById(standardUnitsOfMeasure);
    }

    case LOAD_STANDARD_REJECTED:
      return initialState;

    default:
      return state;
  }
}
