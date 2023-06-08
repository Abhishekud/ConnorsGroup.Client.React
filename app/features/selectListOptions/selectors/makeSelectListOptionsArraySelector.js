import {createSelector} from 'reselect';
import {List} from 'immutable';
import selectListOptionsStateSelector from './selectListOptionsStateSelector';

export default selectListType =>
  createSelector(
    selectListOptionsStateSelector,
    selectListOptionsState =>
      (selectListOptionsState.get(selectListType) || new List())
        .valueSeq()
        .toArray()
        .map(o => ({value: o.get('value'), label: o.get('label')}))
  );
