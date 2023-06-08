import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import numeral from 'numeral';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';

export default class AllowancesList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  rowClassName({index}) {
    if (index < 0) return '';

    const {allowances, selectedAllowanceId} = this.props;
    if (allowances[index].get('id') === selectedAllowanceId) return 'clickable selected';

    return index % 2 === 0 ? 'clickable even' : 'clickable odd';
  }

  noRowsRenderer() {
    return <div className="no-rows"><h3>No Allowances found</h3></div>;
  }

  getAllowanceAtIndex({index}) {
    return this.props.allowances[index];
  }

  getScrollToIndex() {
    const {allowances, selectedAllowanceId} = this.props;

    return selectedAllowanceId ? allowances.findIndex(u => u.get('id') === selectedAllowanceId) : null;
  }

  renderAllowanceValue({dataKey, rowData}) {
    const value = rowData.get(dataKey);
    return (numeral(value * 100).format('0,0.00'));
  }

  countRenderer({rowData, dataKey}) {
    const value = rowData.get(dataKey);
    return numeral(value).format('0,0');
  }

  render() {
    const {allowances, sort, onSort, onRowClick} = this.props;
    const conditionalProps = {};
    const scrollToIndex = this.getScrollToIndex();

    if (scrollToIndex) conditionalProps.scrollToIndex = scrollToIndex;

    return (
      <AutoSizer>
        {({width, height}) => (
          <Table
            width={width}
            height={height}
            headerHeight={50}
            rowHeight={30}
            className="allowances"

            rowCount={allowances.length}
            rowGetter={this.getAllowanceAtIndex}
            rowClassName={this.rowClassName}

            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}

            noRowsRenderer={this.noRowsRenderer}

            onRowClick={onRowClick}

            {...conditionalProps}>

            <Column dataKey="name" width={250} flexGrow={1} label="Name" />
            <Column dataKey="paidTimeMinutes" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Paid Time (Mins)" />
            <Column dataKey="excludedPaidBreaksMinutes" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Excluded Paid Breaks (Mins)" />
            <Column dataKey="reliefTimeMinutes" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Relief Time (Mins)" />
            <Column dataKey="includedPaidBreaksMinutes" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Included Paid Breaks (Mins)" />
            <Column dataKey="minorUnavoidableDelayPercent" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Minor Unavoidable Delay %" />
            <Column dataKey="additionalDelayPercent" width={50} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Additional Delay %" />
            <Column dataKey="machineAllowancePercent" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Incentive Opportunity Allowance %" />

            <Column dataKey="allowancePercent" width={100} flexGrow={1} headerClassName="column-header-standards-count" className="standards-count" label="Allowance %" cellRenderer={this.renderAllowanceValue} />
            <Column dataKey="allowanceFactor" width={100} flexGrow={1} headerClassName="column-header-standards-count" className="standards-count" label="Calculated PF&amp;D Allowance Factor" cellRenderer={this.renderAllowanceValue} />

            <Column dataKey="standardsCount" width={100} flexGrow={1} headerClassName="column-header-standards-count" className="standards-count" label="# of Standards" cellRenderer={this.countRenderer} />
            <Column dataKey="standardHistoriesCount" width={100} flexGrow={1} headerClassName="column-header-standards-count" className="standards-count" label="# of Standard Revisions" cellRenderer={this.countRenderer} />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

AllowancesList.propTypes = {
  allowances: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  selectedAllowanceId: PropTypes.number,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};
