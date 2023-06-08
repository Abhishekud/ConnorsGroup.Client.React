import {fromJS} from 'immutable';
import {SET_INDUSTRY_STANDARDS_COPY_PROPERTY} from '../../actions';

const initialState = fromJS({
  model: {
    intoDepartmentId: null,
    forceUseOfStandardId: false,
  },
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_INDUSTRY_STANDARDS_COPY_PROPERTY: {
      return state.setIn(['model', action.payload.name], action.payload.value);
    }

    default:
      return state;
  }
}
