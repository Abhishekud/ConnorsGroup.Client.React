import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import {NumericFilterCell, CurrentRevisionCell} from '../../../../customizableGrid/components';
import allStandardRevisionsSelectedSelector from './allStandardRevisionsSelectedSelector';
import {makeCurrentUserHasPermissionSelector} from '../../../../authentication/selectors/currentUser';
import {STANDARDS_MANAGE_PRODUCTION} from '../../../../authentication/constants/permissions';

export default createSelector(
  allStandardRevisionsSelectedSelector,
  makeCurrentUserHasPermissionSelector(STANDARDS_MANAGE_PRODUCTION),
  (headerSelection, canManageProductionSelector) => {

    const selectedColumns = canManageProductionSelector
      ? fromJS([{
        field: 'selected',
        headerSelectionValue: headerSelection,
        width: 50,
        required: true,
        included: true,
        sortable: false,
        filterable: false,
      }])
      : fromJS([]);

    const columns =
    fromJS([{
      width: 100,
      field: 'revision',
      title: 'Revision',
      filterable: true,
      filter: 'numeric',
      filterCell: NumericFilterCell,
      sortable: true,
      cell: CurrentRevisionCell,
    }, {
      width: 450,
      field: 'name',
      title: 'Name',
      filterable: true,
      sortable: true,
      cell: CurrentRevisionCell,
    }, {
      width: 250,
      field: 'createdDate',
      title: 'Created Date',
      filterable: true,
      filter: 'date',
      cell: CurrentRevisionCell,
      sortable: true,
    }, {
      width: 450,
      field: 'revisionComment',
      title: 'Comment',
      filterable: true,
      sortable: true,
      cell: CurrentRevisionCell,
    },
    {
      width: 200,
      field: 'lastEditedBy',
      title: 'Last Edited By',
      filterable: true,
      sortable: true,
      cell: CurrentRevisionCell,
    },
    ]);
    return selectedColumns.concat(columns);
  }
);
