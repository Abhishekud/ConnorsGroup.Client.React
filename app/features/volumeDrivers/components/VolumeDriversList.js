import React from 'react';
import {PropTypes} from 'prop-types';
import {AutoSizer} from 'react-virtualized';
import {Grid, GridColumn} from '@progress/kendo-react-grid';
import {layout} from '../../shared/constants';

export default function VolumeDriversList({departmentName, volumeDrivers, sort, onSort, onRowClick, sidebarShown, filter, onFilter, hasBetaAccess}) {
  const gridOptions = {
    data: volumeDrivers,
    sortable: {
      allowUnsort: true,
      mode: 'multiple',
    },
    sort,
    onSortChange: onSort,
    onRowClick,
    selectedField: 'selected',
    filterable: true,
    filter,
    onFilterChange: onFilter,
  };

  return (
    <AutoSizer>
      {({width, height}) => (
        <Grid style={{height: hasBetaAccess ? height : height - 50, width: width + (sidebarShown ? layout.SIDEBAR_WIDTH : 0)}} {...gridOptions}>
          <GridColumn title="Name" field="name" />
          <GridColumn field="departmentName" title={departmentName} />
          <GridColumn field="description" title="Description" />
        </Grid>
      )}
    </AutoSizer>
  );
}

VolumeDriversList.propTypes = {
  departmentName: PropTypes.string.isRequired,
  volumeDrivers: PropTypes.array.isRequired,
  sort: PropTypes.array.isRequired,
  filter: PropTypes.object,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  sidebarShown: PropTypes.bool.isRequired,
  hasBetaAccess: PropTypes.bool.isRequired,
};
