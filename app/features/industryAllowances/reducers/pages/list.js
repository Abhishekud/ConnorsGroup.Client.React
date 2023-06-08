import {Map, fromJS, List} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  LOAD_INDUSTRY_ALLOWANCES_LIST_PENDING,
  LOAD_INDUSTRY_ALLOWANCES_LIST_FULFILLED,
  LOAD_INDUSTRY_ALLOWANCES_LIST_REJECTED,
  TOGGLE_INDUSTRY_ALLOWANCES_LIST,
  SORT_INDUSTRY_ALLOWANCES_LIST,
  FILTER_INDUSTRY_ALLOWANCES_LIST,
  SELECT_ALL_INDUSTRY_ALLOWANCES,
  SELECT_INDUSTRY_ALLOWANCE,
  ADD_INDUSTRY_ALLOWANCES_TO_CLIENT_REJECTED,
  GET_SELECTED_INDUSTRY_SOURCE_ID,
  ADD_INDUSTRY_ALLOWANCES_TO_CLIENT_FULFILLED,
} from '../../actions';

const initialState = Map({
  show: false,
  loading: false,
  selectedIndustrySourceId: null,
  industryAllowances: Map(),
  validationErrors: Map(),
  existingUnchangedElements: Map(),
  sort: new List(),
  filter: new List(),
  headerSelectionValue: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_INDUSTRY_ALLOWANCES_LIST:
      return state.update('show', show => !show);

    case LOAD_INDUSTRY_ALLOWANCES_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_INDUSTRY_ALLOWANCES_LIST_FULFILLED: {
      const newIndustryAllowances = action.payload.data.map(obj => ({...obj, selected: false}));
      return state.withMutations(map =>
        map.set('loading', false)
          .set('industryAllowances', modelsArrayToMapById(newIndustryAllowances))
          .set('headerSelectionValue', false)
      );
    }
    case LOAD_INDUSTRY_ALLOWANCES_LIST_REJECTED:
      return state.set('loading', false);

    case SORT_INDUSTRY_ALLOWANCES_LIST: {
      return state.set('sort', action.payload);
    }
    case SELECT_INDUSTRY_ALLOWANCE: {
      const {id, selected} = action.payload;
      return state.withMutations(map => {
        map.setIn(['industryAllowances', id, 'selected'], selected);
        map.setIn(['headerSelectionValue'], !map.get('industryAllowances').some(s => !s.get('selected')));
      });
    }

    case SELECT_ALL_INDUSTRY_ALLOWANCES:
      return state.withMutations(map => {
        map.setIn(['headerSelectionValue'], action.payload.selected);
        map.update('industryAllowances', allowance =>
          allowance.map(allowance => {
            if (action.payload.ids.includes(allowance.get('id'))) {
              return allowance.set('selected', action.payload.selected);
            }
            return allowance.set('selected', false);
          }));
      });

    case ADD_INDUSTRY_ALLOWANCES_TO_CLIENT_REJECTED: {
      return state.withMutations(map => {
        map.set('loading', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });
    }

    case FILTER_INDUSTRY_ALLOWANCES_LIST: {
      return state.withMutations(map =>
        map.set('filter', action.payload)
          .set('skip', 0)
          .update('industryAllowances', industryAllowances => industryAllowances.map(industryAllowances => industryAllowances.set('selected', false)))
          .set('headerSelectionValue', false));
    }

    case GET_SELECTED_INDUSTRY_SOURCE_ID: {
      return state.set('selectedIndustrySourceId', action.payload);
    }

    case ADD_INDUSTRY_ALLOWANCES_TO_CLIENT_FULFILLED: {
      if (!action.payload.data.needPreference) {
        return initialState;
      } return state;
    }

    default:
      return state;
  }
}
