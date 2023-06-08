import {Map} from 'immutable';
import {CHANGE_TIME_FORMAT, RESET_TIME_SELECTOR_DROPDOWN} from '../../actions';
import {
  EDIT_STANDARD_ELEMENT,
  EDIT_STANDARD_ELEMENT_GROUP,
  CANCEL_EDIT_STANDARD_ELEMENT,
  CANCEL_EDIT_STANDARD_ELEMENT_GROUP,
  UPDATE_STANDARD_ELEMENT_FULFILLED,
  UPDATE_STANDARD_ELEMENT_GROUP_FULFILLED,
} from '../../../standards/actions';
import {
  EDIT_NON_MOST_STEP,
  CANCEL_EDIT_NON_MOST_STEP,
  UPDATE_NON_MOST_STEP_FULFILLED,
} from '../../../nonMOSTAnalysis/actions';
import {SECONDS} from '../../constants/timeFormats';

const initialState = new Map({
  timeFormat: SECONDS,
  disabled: false,
});

const disableSelector = [
  EDIT_STANDARD_ELEMENT,
  EDIT_STANDARD_ELEMENT_GROUP,
  EDIT_NON_MOST_STEP,
];

const enableSelector = [
  CANCEL_EDIT_STANDARD_ELEMENT,
  CANCEL_EDIT_STANDARD_ELEMENT_GROUP,
  CANCEL_EDIT_NON_MOST_STEP,
  UPDATE_STANDARD_ELEMENT_FULFILLED,
  UPDATE_STANDARD_ELEMENT_GROUP_FULFILLED,
  UPDATE_NON_MOST_STEP_FULFILLED,
  RESET_TIME_SELECTOR_DROPDOWN,
];

export default function (state = initialState, action) {
  if (action.type === CHANGE_TIME_FORMAT) {
    return state.set('timeFormat', action.payload);
  }

  if (disableSelector.includes(action.type)) {
    return state.set('disabled', true);
  }

  if (enableSelector.includes(action.type)) {
    return state.set('disabled', false);
  }

  return state;
}
