import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import {VolumeDriverValueSetsTableCell, DefaultSetTableCell} from '../../../components';
import headerSelectionValueSelector from './headerSelectionValueSelector';

export default createSelector(
  headerSelectionValueSelector,
  headerCheckbox => {
    const columns = fromJS([
      {
        width: 50,
        field: 'selected',
        required: true,
        headerSelectionValue: headerCheckbox,
        filterable: false,
      },
      {
        width: 200,
        field: 'name',
        title: 'Name',
        filterable: true,
        sortable: true,
        cell: DefaultSetTableCell,
      },
      {
        width: 200,
        field: 'description',
        title: 'Description',
        filterable: true,
        sortable: true,
        cell: VolumeDriverValueSetsTableCell,
      },
      {
        width: 200,
        field: 'numberOfVolumeDriverValues',
        title: 'Number of Volume Driver Values',
        filterable: true,
        sortable: true,
        cell: VolumeDriverValueSetsTableCell,
      },
    ]);
    return columns;
  }
);
