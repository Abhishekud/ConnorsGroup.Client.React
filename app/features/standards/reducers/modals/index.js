import _delete from './delete';
import bulkDeleteSelectedStandardItems from './bulkDeleteSelectedStandardItems';
import create from './create';
import createStandardElement from './createStandardElement';
import deleteSelectedStandards from './deleteSelectedStandards';
import deleteStandardItem from './deleteStandardItem';
import bulkDeleteStandardsRevisions from './bulkDeleteStandardsRevisions';
import deleteStandardRevisions from './deleteStandardRevisions';
import duplicate from './duplicate';
import frequencyFormula from './frequencyFormula';
import moveStandardItemToPosition from './moveStandardItemToPosition';
import productionComment from './productionComment';
import promoteToListElement from './promoteToListElement';
import select from './select';
import selectStandardElementGroupToMoveTo from './selectStandardElementGroupToMoveTo';
import selectStandardElementTypeToCreate from './selectStandardElementTypeToCreate';
import update from './update';
import setStandardRevision from './setStandardRevision';
import {combineReducers} from 'redux';

export default combineReducers({
  _delete,
  bulkDeleteSelectedStandardItems,
  create,
  createStandardElement,
  deleteSelectedStandards,
  deleteStandardItem,
  bulkDeleteStandardsRevisions,
  deleteStandardRevisions,
  duplicate,
  frequencyFormula,
  moveStandardItemToPosition,
  productionComment,
  promoteToListElement,
  select,
  selectStandardElementGroupToMoveTo,
  selectStandardElementTypeToCreate,
  update,
  setStandardRevision,
});
