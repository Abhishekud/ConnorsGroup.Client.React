
import React from 'react';
import {PropTypes} from 'prop-types';
import {Grid, GridColumn} from '@progress/kendo-react-grid';
import {
  AutoSizer,
} from 'react-virtualized';
import {layout} from '../../shared/constants';

export default function StandardFilingFieldList({filingFields, sort, onSort, onRowClick, sidebarShown, filter, onFilter, includeStatus}) {
  const gridOptions = {
    data: filingFields,
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
        <Grid style={{height: height - 50, width: width + (sidebarShown ? layout.SIDEBAR_WIDTH : 0)}} {...gridOptions}>
          {includeStatus && <GridColumn title="Status" field="status" width="200px" />}
          <GridColumn title="Name" field="name" />
          <GridColumn title="# of Standards" width="200px" field="standardsCount" filter="numeric" format="{0:d}" />
        </Grid>
      )}
    </AutoSizer>
  );
}

StandardFilingFieldList.propTypes = {
  filingFields: PropTypes.array.isRequired,
  sort: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  sidebarShown: PropTypes.bool.isRequired,
  filter: PropTypes.object,
  onFilter: PropTypes.func.isRequired,
};
