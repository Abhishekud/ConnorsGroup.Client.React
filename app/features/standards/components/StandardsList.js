import autoBind from 'react-autobind';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {layout} from '../../shared/constants';
import {statusClass, displayName} from '../constants/standardStatuses';

export default class StandardsList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  getStandardAtIndex({index}) {
    return this.props.standards.get(index);
  }

  rowClassName({index}) {
    if (index < 0) return '';
    return index % 2 === 0 ? 'even' : 'odd';
  }

  noRowsRenderer() {
    return (
      <div className="no-rows"><h3>No Standards found</h3></div>
    );
  }

  renderId({rowData}) {
    const status = rowData.get('status');

    return (
      <div className={statusClass(status)}>
        <span>{rowData.get('id')}</span>
      </div>
    );
  }

  renderStatus({rowData}) {
    return displayName(rowData.get('status'));
  }

  renderCheckboxCell({rowIndex}) {
    const {standards, standardStates} = this.props;
    const row = standards.get(rowIndex);
    const selected = row ? standardStates.getIn([row.get('id'), 'selected']) : false;

    return <i className={selected ? 'fa fa-check-square-o list-row-selector' : 'fa fa-square-o list-row-selector'} />;
  }

  renderHeaderCheckboxCell() {
    const {standards, standardStates, onSelectAll} = this.props;
    const selectedCount = standardStates.filter(x => x.get('selected')).size;

    let faClass = 'fa-square-o';
    if (selectedCount > 0 && standards.size === selectedCount) {
      faClass = 'fa-check-square-o';
    } else if (selectedCount > 0) {
      faClass = 'fa-minus-square-o';
    }

    return <i className={`fa ${faClass} clickable`} onClick={onSelectAll} />;
  }

  renderFixedVariable({dataKey, rowData}) {
    const value = rowData.get(dataKey);
    return value ? 'Fixed' : 'Variable';
  }

  render() {
    const {standards, sort, onSort, onRowClick, departmentName, sidebarsShown, withSelectors} = this.props;

    return (
      <AutoSizer>
        {({width, height}) => (
          <Table
            width={width + (sidebarsShown * layout.SIDEBAR_WIDTH)}
            height={height}
            headerHeight={50}
            rowHeight={30}

            rowClassName={this.rowClassName}
            rowCount={standards.size}
            rowGetter={this.getStandardAtIndex}
            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}

            noRowsRenderer={this.noRowsRenderer}

            onRowClick={onRowClick}>

            {withSelectors
              ? <Column
                dataKey="selected"
                disableSort
                width={40}
                flexShrink={0}
                className="selector-column list-row-selector"
                headerClassName="selector-column"
                cellRenderer={this.renderCheckboxCell}
                headerRenderer={this.renderHeaderCheckboxCell} />
              : null}
            <Column dataKey="id" width={70} flexShrink={0} className="standard-id-cell" label="ID" cellRenderer={this.renderId} />
            <Column dataKey="name" width={100} flexGrow={1} label="Name" />
            <Column dataKey="departmentName" width={100} flexGrow={1} label={departmentName} />
            <Column dataKey="jobClassName" width={50} flexGrow={1} label="Job Class" />
            <Column dataKey="laborCategoryName" width={100} flexGrow={1} label="Labor Category" />
            <Column dataKey="classificationName" width={100} flexGrow={1} label="Classification" />
            <Column dataKey="allowanceName" width={100} flexGrow={1} label="Allowance" />
            <Column dataKey="attributeName" width={100} flexGrow={1} label="Attribute" />
            <Column dataKey="fixed" width={100} flexGrow={1} label="Fixed/Variable" cellRenderer={this.renderFixedVariable} />
            <Column dataKey="applicatorEmail" width={100} flexGrow={1} label="Applicator" />
            <Column dataKey="status" width={100} flexGrow={1} label="Status" cellRenderer={this.renderStatus} />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

StandardsList.propTypes = {
  sort: PropTypes.object.isRequired,
  standards: PropTypes.object.isRequired,
  standardStates: PropTypes.object.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sidebarsShown: PropTypes.number.isRequired,
  withSelectors: PropTypes.bool,
};
