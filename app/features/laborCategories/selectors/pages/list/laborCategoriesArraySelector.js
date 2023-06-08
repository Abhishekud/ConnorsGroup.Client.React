import {createSelector} from 'reselect';
import laborCategoriesSelector from './laborCategoriesSelector';

export default createSelector(
  laborCategoriesSelector,
  laborCategories => laborCategories.toList().toJS()
);
