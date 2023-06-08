import {Map} from 'immutable';
import {ELEMENT_ACTIVITIES} from '../../constants/listOptions';
import {
  SET_SELECTED_ELEMENT_LIST_OPTION,
} from '../../actions';

const initialState = new Map({
  loading: false,
  selectedElementListOptionId: ELEMENT_ACTIVITIES,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_ELEMENT_LIST_OPTION: {
      const optionId = action.payload;
      return state.set('selectedElementListOptionId', optionId);
    }

    default:
      return state;
  }
}
