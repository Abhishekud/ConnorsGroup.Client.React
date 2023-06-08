import React from 'react';
import {PropTypes} from 'prop-types';
import {Grid, GridColumn} from '@progress/kendo-react-grid';
import {
  AutoSizer,
} from 'react-virtualized';
import {layout} from '../../shared/constants';

export default function StandardFilingFieldOptionsList({standardFilingFieldOptions, sort, onSort, onRowClick, sidebarShown, filter, onFilter}) {
  const gridOptions = {
    data: standardFilingFieldOptions,
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
          <GridColumn field="value" title="Name" />
        </Grid>
      )}
    </AutoSizer>
  );
}

StandardFilingFieldOptionsList.propTypes = {
  standardFilingFieldOptions: PropTypes.array.isRequired,
  sort: PropTypes.array.isRequired,
  filter: PropTypes.object,
  onSort: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  sidebarShown: PropTypes.bool.isRequired,
};
