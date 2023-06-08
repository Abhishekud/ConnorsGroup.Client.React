import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import numeral from 'numeral';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';
import {layout} from '../../shared/constants';

export default class AllowanceRestsList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  rowClassName({index}) {
    if (index < 0) return '';

    const {allowanceRests, selectedAllowanceRestId} = this.props;
    if (allowanceRests[index].get('id') === selectedAllowanceRestId) return 'clickable selected';

    return index % 2 === 0 ? 'clickable even' : 'clickable odd';
  }

  noRowsRenderer() {
    return <div className="no-rows"><h3>No Rests found</h3></div>;
  }

  getAllowanceRestAtIndex({index}) {
    return this.props.allowanceRests[index];
  }

  getScrollToIndex() {
    const {allowanceRests, selectedAllowanceRestId} = this.props;

    return selectedAllowanceRestId ? allowanceRests.findIndex(u => u.get('id') === selectedAllowanceRestId) : null;
  }

  renderDecimal({dataKey, rowData}) {
    const value = rowData.get(dataKey);
    return (numeral(value).format('0,0.00'));
  }

  render() {
    const {allowanceRests, sort, onSort, onRowClick, sidebarShown} = this.props;
    const conditionalProps = {};
    const scrollToIndex = this.getScrollToIndex();

    if (scrollToIndex) conditionalProps.scrollToIndex = scrollToIndex;

    return (
      <AutoSizer>
        {({width, height}) => (
          <Table
            width={width + (sidebarShown ? layout.SIDEBAR_WIDTH : 0)}
            height={height}
            headerHeight={50}
            rowHeight={30}

            rowCount={allowanceRests.length}
            rowGetter={this.getAllowanceRestAtIndex}
            rowClassName={this.rowClassName}

            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}

            noRowsRenderer={this.noRowsRenderer}

            onRowClick={onRowClick}

            {...conditionalProps}>

            <Column dataKey="name" width={200} flexGrow={1} label="Name" />
            <Column dataKey="poundsHandled" width={100} flexGrow={1} label="Pounds Handled" />
            <Column dataKey="percentUnderLoad" width={100} flexGrow={1} label="Percent Under Load" />
            <Column dataKey="muscularForce" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Muscular Force" />
            <Column dataKey="conditionalMultiplier" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Conditional Multiplier" />
            <Column dataKey="positionalMultiplier" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Positional Multiplier" />
            <Column dataKey="visualStrain" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Visual Strain" />
            <Column dataKey="noise" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Noise" />
            <Column dataKey="safetyDevices" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Safety Devices" />
            <Column dataKey="concentration" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Concentration" />
            <Column dataKey="totalRestPercent" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Total Rest %" cellRenderer={this.renderDecimal} />
            <Column dataKey="allowancesCount" width={100} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="# of Allowances" />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

AllowanceRestsList.propTypes = {
  allowanceRests: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  selectedAllowanceRestId: PropTypes.number,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  sidebarShown: PropTypes.bool.isRequired,
};
