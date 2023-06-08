import {createSelector} from 'reselect';
import {Map, fromJS} from 'immutable';
import headerSelectionValueSelector from './headerSelectionValueSelector';
import volumeDriverMappingSetsSelector from './volumeDriverMappingSetsSelector';
import {DefaultVolumeDriverMappingSetsCell} from '../../../components';

export default createSelector(headerSelectionValueSelector, volumeDriverMappingSetsSelector,
  (headerCheckbox, volumeDriverMappingSets) => {
    const selectedColumn = fromJS([{
      width: 50,
      locked: true,
      field: 'selected',
      headerSelectionValue: headerCheckbox,
      filterable: false,
      sortable: false,
      required: true,
    }]);

    const staticColumns =
    fromJS([{
      width: 300,
      field: 'name',
      title: 'Name',
      editable: false,
      filterable: true,
      sortable: true,
    }, {
      width: 300,
      field: 'description',
      title: 'Description',
      editable: false,
      filterable: true,
      sortable: true,
    }, {
      width: 300,
      field: 'observationNotes',
      title: 'Observation Notes',
      editable: false,
      filterable: true,
      sortable: true,
    }]);


    const volumeDriverMappingSetsColumns = volumeDriverMappingSets.map((mappingSet, index) => Map({
      width: 150,
      field: `${mappingSet.get('id')}`,
      key: {index},
      title: mappingSet.get('name'),
      filter: 'numeric',
      cell: DefaultVolumeDriverMappingSetsCell,
      filterable: true,
      sortable: true,
    })
    );

    let orderIndex = 0;
    const columns = selectedColumn
      .concat(staticColumns)
      .concat(volumeDriverMappingSetsColumns)
      .withMutations(allColumnsArray => {
        allColumnsArray.map(col =>
          col
            .set('orderIndex', orderIndex++)
            .set('included', true)
        );
      });

    return fromJS(columns);
  }
);
