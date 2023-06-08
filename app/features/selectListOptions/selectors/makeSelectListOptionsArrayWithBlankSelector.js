import {createSelector} from 'reselect';
import {List} from 'immutable';
import selectListOptionsStateSelector from './selectListOptionsStateSelector';

export default (selectListType, blankLabel) =>
  createSelector(
    selectListOptionsStateSelector,
    selectListOptionsState => {
      const list = (selectListOptionsState.get(selectListType) || new List())
        .valueSeq()
        .toArray()
        .map(o => ({value: o.get('value'), label: o.get('label')}));
      list.unshift({value: '', label: blankLabel || ''});
      return list;
    }
  );
