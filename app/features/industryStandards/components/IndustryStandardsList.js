import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {AutoSizer} from 'react-virtualized';
import {CustomizableGrid} from '../../customizableGrid/components';
import {fromJS} from 'immutable';
import {Tooltip} from '@progress/kendo-react-tooltip';

export default class IndustryStandardsList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleRowClick({dataItem}) {
    const {onRowClick} = this.props;
    onRowClick(dataItem);
  }

  handleSelectClick({dataItem}) {
    const {onSelectedClick} = this.props;
    onSelectedClick(dataItem);
  }

  noRowsRenderer() {
    if (this.props.selectedIndustrySourceId === null) {
      return (
        <div className="no-rows"><h3>No Industry Source Selected</h3></div>
      );
    }
    return (
      <div className="no-rows"><h3>No Industry Standards found</h3></div>
    );
  }

  render() {
    const {industryStandards, sort, onSort, filter, onFilter, onSelectAll, columns, onSelectedClick} = this.props;
    return (
      <AutoSizer>
        {({width, height}) => (
          <Tooltip openDelay={100} position="top" anchorElement="target">
            <CustomizableGrid data={fromJS(industryStandards)}
              style={{width, height: height - 60}}
              onRowClick={this.handleRowClick}
              sort={sort} onSort={onSort}
              filter={filter} onFilter={onFilter}
              noRowsRenderer={this.noRowsRenderer}
              onSelectedChange={onSelectedClick ? this.handleSelectClick : null}
              onHeaderSelectedChange={onSelectAll}
              selectedField={'selected'}
              columns={columns} />
          </Tooltip>
        )}
      </AutoSizer>
    );
  }
}

IndustryStandardsList.propTypes = {
  industryStandards: PropTypes.object.isRequired,
  onRowClick: PropTypes.func,
  onSelectedClick: PropTypes.func,
  onSelectAll: PropTypes.func,
  sort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedIndustrySourceId: PropTypes.number,
};
