import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {AutoSizer} from 'react-virtualized';
import {CustomizableGrid} from '../../customizableGrid/components';
import {fromJS} from 'immutable';
import {Tooltip} from '@progress/kendo-react-tooltip';

export default class IndustryAllowancesList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleRowClick({dataItem}) {
    this.props.onRowClick(dataItem);
  }

  handleSelectClick({dataItem}) {
    this.props.onSelectedClick(dataItem);
  }

  noRowsRenderer() {
    if (this.props.selectedIndustrySourceId === null) {
      return (
        <div className="no-rows"><h3>No Industry Source Selected</h3></div>
      );
    }
    return (
      <div className="no-rows"><h3>No Industry Allowance found</h3></div>
    );
  }

  render() {
    const {industryAllowances, sort, onSort, filter, onFilter, onSelectAll, columns} = this.props;
    return (
      <AutoSizer>
        {({width, height}) => (
          <Tooltip openDelay={100} position="top" anchorElement="target">
            <CustomizableGrid data={fromJS(industryAllowances)}
              style={{width, height: height - 60}}
              onRowClick={this.handleRowClick}
              sort={sort} onSort={onSort}
              filter={filter} onFilter={onFilter}
              noRowsRenderer={this.noRowsRenderer}
              onSelectedChange={this.handleSelectClick}
              onHeaderSelectedChange={onSelectAll}
              selectedField={'selected'}
              columns={columns} />
          </Tooltip>
        )}
      </AutoSizer>
    );
  }
}

IndustryAllowancesList.propTypes = {
  industryAllowances: PropTypes.object.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onSelectedClick: PropTypes.func,
  onSelectAll: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedIndustrySourceId: PropTypes.number,
};
