import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';
import {layout} from '../../shared/constants';

export default class OrgHierarchyLevelOptionsList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  rowClassName({index}) {
    if (index < 0) return '';

    const {orgHierarchyLevelOptions, selectedOrgHierarchyLevelOptionId} = this.props;
    if (orgHierarchyLevelOptions[index].get('id') === selectedOrgHierarchyLevelOptionId) return 'clickable selected';

    return index % 2 === 0 ? 'clickable even' : 'clickable odd';
  }

  noRowsRenderer() {
    return <div className="no-rows"><h3>No Hierarchy Level Options found</h3></div>;
  }

  getOrgHierarchyLevelOptionAtIndex({index}) {
    return this.props.orgHierarchyLevelOptions[index];
  }

  getScrollToIndex() {
    const {orgHierarchyLevelOptions, selectedOrgHierarchyLevelOptionId} = this.props;

    return selectedOrgHierarchyLevelOptionId
      ? orgHierarchyLevelOptions.findIndex(u => u.get('id') === selectedOrgHierarchyLevelOptionId)
      : null;
  }

  render() {
    const {orgHierarchyLevelOptions, sort, onSort, onRowClick, sidebarShown, isTopLevel} = this.props;
    const conditionalProps = {};
    const scrollToIndex = this.getScrollToIndex();

    if (scrollToIndex) conditionalProps.scrollToIndex = scrollToIndex;

    return (
      <AutoSizer>
        {({width, height}) => (
          <Table
            // This is here to make sure props change when data changes
            _dataSource={orgHierarchyLevelOptions}

            width={width + (sidebarShown ? layout.SIDEBAR_WIDTH : 0)}
            height={height - 50}
            headerHeight={50}
            rowHeight={30}

            rowCount={orgHierarchyLevelOptions.length}
            rowGetter={this.getOrgHierarchyLevelOptionAtIndex}
            rowClassName={this.rowClassName}

            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}

            noRowsRenderer={this.noRowsRenderer}

            onRowClick={onRowClick}

            {...conditionalProps}>

            <Column dataKey="value" width={200} flexGrow={1} label="Value" />
            {isTopLevel ? null : <Column dataKey="parentOrgHierarchyLevelOptionValue" width={200} flexGrow={1} label="Parent Value" />}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

OrgHierarchyLevelOptionsList.propTypes = {
  orgHierarchyLevelOptions: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  selectedOrgHierarchyLevelOptionId: PropTypes.number,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  sidebarShown: PropTypes.bool.isRequired,
  isTopLevel: PropTypes.bool.isRequired,
};
