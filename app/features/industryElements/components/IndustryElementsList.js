import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {AutoSizer} from 'react-virtualized';
import {CustomizableGrid} from '../../customizableGrid/components';
import {fromJS} from 'immutable';
import {Tooltip} from '@progress/kendo-react-tooltip';

export default class IndustryElementsList extends Component {
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
      <div className="no-rows"><h3>No Industry Elements found</h3></div>
    );
  }

  render() {
    const {industryElements, sort, onSort, filter, onFilter, onSelectAll, columns} = this.props;
    return (
      <AutoSizer>
        {({width, height}) => (
          <Tooltip openDelay={100} position="top" anchorElement="target">
            <CustomizableGrid
              data={fromJS(industryElements)}
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

IndustryElementsList.propTypes = {
  industryElements: PropTypes.object.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedIndustrySourceId: PropTypes.number,
};
