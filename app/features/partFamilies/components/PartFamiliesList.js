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
import pluralize from 'pluralize';

export default class PartFamiliesList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  rowClassName({index}) {
    if (index < 0) return '';

    const {partFamilies, selectedPartFamilyId} = this.props;
    if (partFamilies[index].get('id') === selectedPartFamilyId) return 'clickable selected';

    return index % 2 === 0 ? 'clickable even' : 'clickable odd';
  }

  noRowsRenderer() {
    const {partFamilyName} = this.props;
    return <div className="no-rows"><h3>{`No ${pluralize(partFamilyName)} found`}</h3></div>;
  }

  getPartFamilyAtIndex({index}) {
    return this.props.partFamilies[index];
  }

  getScrollToIndex() {
    const {partFamilies, selectedPartFamilyId} = this.props;

    return selectedPartFamilyId ? partFamilies.findIndex(u => u.get('id') === selectedPartFamilyId) : null;
  }

  countRenderer({rowData}) {
    return numeral(rowData.get('standardsCount')).format('0,0');
  }

  render() {
    const {partFamilies, sort, onSort, onRowClick, sidebarShown} = this.props;
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

            rowCount={partFamilies.length}
            rowGetter={this.getPartFamilyAtIndex}
            rowClassName={this.rowClassName}

            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}

            noRowsRenderer={this.noRowsRenderer}

            onRowClick={onRowClick}

            {...conditionalProps}>

            <Column dataKey="name" width={500} flexGrow={1} label="Name" />
            <Column dataKey="standardsCount" width={150} flexGrow={0} headerClassName="column-header-standards-count" className="standards-count" label="# of Standards" cellRenderer={this.countRenderer} />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

PartFamiliesList.propTypes = {
  partFamilies: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  selectedPartFamilyId: PropTypes.number,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  sidebarShown: PropTypes.bool.isRequired,
  partFamilyName: PropTypes.string.isRequired,
};
