import autoBind from 'react-autobind';
import {Map, List} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {AutoSizer, Table, Column} from 'react-virtualized';
import numeral from 'numeral';

export default class LaborProjectionsDepartmentsList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  rowClassName({index}) {
    if (index < 0) return '';

    return index % 2 === 0 ? 'clickable even' : 'clickable odd';
  }

  noRowsRenderer() {
    return <div className="no-rows"><h3>No Labor Projections found</h3></div>;
  }

  getItemAtIndex({index}) {
    return this.props.listEntryModels.get(index);
  }

  renderLaborHoursCellRenderer({dataKey, rowData}) {
    const value = rowData.get(dataKey);
    return numeral(value).format('0,0.00');
  }

  render() {
    const {listEntryModels, sort, departmentName, onRowClick, onSort} = this.props;

    return (
      <div className="list">
        <AutoSizer>
          {({width, height}) => (
            <Table
              listEntryModels={listEntryModels}

              width={width}
              height={height}
              headerHeight={50}
              rowHeight={30}

              rowCount={listEntryModels.size}
              rowGetter={this.getItemAtIndex}
              rowClassName={this.rowClassName}

              sortBy={sort.get('by')}
              sortDirection={sort.get('direction')}
              sort={onSort}

              noRowsRenderer={this.noRowsRenderer}

              onRowClick={onRowClick}>

              <Column dataKey="name" width={200} flexGrow={1} label={departmentName.toUpperCase()} />
              <Column dataKey="standardCount" width={100} flexGrow={1}
                headerClassName="column-header-standard-count"
                className="standard-count" label="# STANDARDS" />
              <Column dataKey="laborHours" width={100} flexGrow={1} headerClassName="column-header-labor-hours"
                className="labor-hours" label="LABOR HOURS" cellRenderer={this.renderLaborHoursCellRenderer} />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}

LaborProjectionsDepartmentsList.propTypes = {
  listEntryModels: PropTypes.instanceOf(List).isRequired,
  sort: PropTypes.instanceOf(Map).isRequired,
  departmentName: PropTypes.string.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};
