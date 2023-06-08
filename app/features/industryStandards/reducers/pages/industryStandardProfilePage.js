import {Map} from 'immutable';
import {CHANGE_TIME_FORMAT} from '../../../shared/actions';
import {
  LOAD_INDUSTRY_STANDARD_FULFILLED,
  LOAD_INDUSTRY_STANDARD_PENDING,
  LOAD_INDUSTRY_STANDARD_REJECTED,
  TOGGLE_STANDARD_ELEMENT_GROUP,
  TOGGLE_STANDARD_ELEMENT_COMMENT,
  TOGGLE_INDUSTRY_STANDARD_MOST_ELEMENT_PROFILE,
  TOGGLE_INDUSTRY_STANDARD_NON_MOST_ELEMENT_PROFILE,
} from '../../actions';
import {
  standardItemModelsArrayToMapById,
  createStandardItemStates,
} from '../../services';
import {timeFormats} from '../../../shared/constants';

const initialState = Map({
  id: null,
  name: null,
  standardItems: Map(),
  standardItemsStates: Map(),
  loading: false,
  timeFormat: timeFormats.SECONDS,
  viewIndustryStandardMOSTElementId: null,
  viewIndustryStandardNonMOSTElementId: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_TIME_FORMAT:
      return state.set('timeFormat', action.payload);


    case LOAD_INDUSTRY_STANDARD_PENDING:
      return initialState.withMutations(map =>
        map.set('timeFormat', state.get('timeFormat'))
          .set('loading', true));

    case LOAD_INDUSTRY_STANDARD_FULFILLED: {
      const {id, name, standardItems} = action.payload.data;
      const standardItemsMap = standardItemModelsArrayToMapById(standardItems);
      return state.withMutations(map =>
        map.set('loading', false)
          .set('id', id)
          .set('name', name)
          .set('standardItems', standardItemsMap)
          .set('standardItemsStates', createStandardItemStates(standardItems)));
    }

    case LOAD_INDUSTRY_STANDARD_REJECTED:
      return initialState.set('timeFormat', state.get('timeFormat'));

    case TOGGLE_STANDARD_ELEMENT_GROUP:
      return state.updateIn(['standardItemsStates', action.payload, 'collapsed'], collapsed => !collapsed);

    case TOGGLE_STANDARD_ELEMENT_COMMENT:
      return state.updateIn(['standardItemsStates', action.payload, 'commentCollapsed'], collapsed => !collapsed);

    case TOGGLE_INDUSTRY_STANDARD_MOST_ELEMENT_PROFILE:
      return state.set('viewIndustryStandardMOSTElementId', action.payload);

    case TOGGLE_INDUSTRY_STANDARD_NON_MOST_ELEMENT_PROFILE:
      return state.set('viewIndustryStandardNonMOSTElementId', action.payload);

    default:
      return state;
  }
}
