import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';
import {layout} from '../../shared/constants';

export default class UnitsOfMeasureList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  rowClassName({index}) {
    if (index < 0) return '';

    const {unitsOfMeasure, selectedUnitOfMeasureId} = this.props;
    if (unitsOfMeasure[index].get('id') === selectedUnitOfMeasureId) return 'clickable selected';

    return index % 2 === 0 ? 'clickable even' : 'clickable odd';
  }

  noRowsRenderer() {
    return <div className="no-rows"><h3>No Units of Measure found</h3></div>;
  }

  getUnitOfMeasureAtIndex({index}) {
    return this.props.unitsOfMeasure[index];
  }

  getScrollToIndex() {
    const {unitsOfMeasure, selectedUnitOfMeasureId} = this.props;

    return selectedUnitOfMeasureId ? unitsOfMeasure.findIndex(u => u.get('id') === selectedUnitOfMeasureId) : null;
  }

  render() {
    const {unitsOfMeasure, sort, onSort, onRowClick, sidebarShown} = this.props;
    const conditionalProps = {};
    const scrollToIndex = this.getScrollToIndex();

    if (scrollToIndex) conditionalProps.scrollToIndex = scrollToIndex;

    return (
      <AutoSizer>
        {({width, height}) => (
          <Table
            width={width + (sidebarShown ? layout.SIDEBAR_WIDTH : 0)}
            height={height - 50}
            headerHeight={50}
            rowHeight={30}

            rowCount={unitsOfMeasure.length}
            rowGetter={this.getUnitOfMeasureAtIndex}
            rowClassName={this.rowClassName}

            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}

            noRowsRenderer={this.noRowsRenderer}

            onRowClick={onRowClick}

            {...conditionalProps}>

            <Column dataKey="name" width={500} flexGrow={1} label="Name" />
            <Column dataKey="elementsCount" width={100} flexGrow={1} headerClassName="column-header-elements-count" className="elements-count" label="# of Elements" />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

UnitsOfMeasureList.propTypes = {
  unitsOfMeasure: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  selectedUnitOfMeasureId: PropTypes.number,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  sidebarShown: PropTypes.bool.isRequired,
};
