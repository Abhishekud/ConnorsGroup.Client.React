import {Map, fromJS, List} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  LOAD_INDUSTRY_STANDARDS_LIST_PENDING,
  LOAD_INDUSTRY_STANDARDS_LIST_FULFILLED,
  LOAD_INDUSTRY_STANDARDS_LIST_REJECTED,
  ADD_INDUSTRY_STANDARDS_TO_CLIENT_FULFILLED,
  ADD_INDUSTRY_STANDARDS_TO_CLIENT_REJECTED,
  SELECT_INDUSTRY_STANDARD,
  SELECT_ALL_INDUSTRY_STANDARDS,
  SORT_INDUSTRY_STANDARDS_LIST,
  TOGGLE_INDUSTRY_STANDARDS_LIST,
  ADD_INDUSTRY_STANDARDS_TO_CLIENT_PENDING,
  FILTER_INDUSTRY_STANDARDS_LIST,
} from '../../actions';

const initialState = Map({
  show: false,
  loading: false,
  selectedIndustrySourceId: null,
  industryStandards: new List(),
  existingUnchangedStandards: Map(),
  validationErrors: Map(),
  intoDepartmentId: null,
  sort: new List(),
  filter: null,
  headerSelectionValue: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_INDUSTRY_STANDARDS_LIST:
      return state.set('show', !state.get('show'));

    case LOAD_INDUSTRY_STANDARDS_LIST_PENDING:
    case ADD_INDUSTRY_STANDARDS_TO_CLIENT_PENDING:
      return state.set('loading', true);

    case LOAD_INDUSTRY_STANDARDS_LIST_FULFILLED: {
      const {selectedIndustrySourceId, industryStandards, existingUnchangedStandards} = action.payload.data;
      const newExistingUnchangedStandards = modelsArrayToMapById(existingUnchangedStandards);
      const newIndustryStandards = industryStandards.map(obj => ({...obj, selected: false, existingId: newExistingUnchangedStandards.get(obj.id) ? newExistingUnchangedStandards.get(obj.id).get('newId') : ''}));
      return state.withMutations(map =>
        map.set('loading', false)
          .set('selectedIndustrySourceId', selectedIndustrySourceId)
          .set('industryStandards', modelsArrayToMapById(newIndustryStandards))
          .set('existingUnchangedStandards', newExistingUnchangedStandards)
          .set('headerSelectionValue', false)
      );
    }

    case LOAD_INDUSTRY_STANDARDS_LIST_REJECTED:
      return state.set('loading', false);

    case SORT_INDUSTRY_STANDARDS_LIST: {
      return state.set('sort', action.payload);
    }

    case SELECT_INDUSTRY_STANDARD: {
      const {id, selected} = action.payload;
      return state.setIn(['industryStandards', id, 'selected'], selected)
        .withMutations(map => map.setIn(['headerSelectionValue'], !map.get('industryStandards').some(s => !s.get('selected'))));
    }

    case SELECT_ALL_INDUSTRY_STANDARDS:
      return state.withMutations(map => {
        map.setIn(['headerSelectionValue'], action.payload.selected);
        map.update('industryStandards', standards =>
          standards.map(standard => {
            if (action.payload.ids.includes(standard.get('id'))) {
              return standard.set('selected', action.payload.selected);
            }
            return standard.set('selected', false);
          }));
      });

    case ADD_INDUSTRY_STANDARDS_TO_CLIENT_REJECTED: {
      return state.withMutations(map => {
        map.set('loading', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });
    }

    case ADD_INDUSTRY_STANDARDS_TO_CLIENT_FULFILLED:
      return initialState;

    case FILTER_INDUSTRY_STANDARDS_LIST: {
      return state.withMutations(map =>
        map.set('filter', action.payload)
          .set('skip', 0)
          .update('industryStandards', industryStandards => industryStandards.map(industryStandard => industryStandard.set('selected', false)))
          .set('headerSelectionValue', false));
    }
    default:
      return state;
  }
}
